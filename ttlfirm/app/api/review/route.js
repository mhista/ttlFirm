import { createClient } from "@sanity/client";
import { EmailClient } from "@azure/communication-email";

/**
 * A review left on the website.
 *
 * Two things happen with one, and they are deliberately independent so that a
 * failure in either does not lose the review:
 *
 *  1. It is written into Sanity as an UNAPPROVED testimonial. Nothing a
 *     stranger types appears on an attorney's website without a person
 *     reading it first — that is both basic sense and, given that New Jersey
 *     treats client testimonials as attorney advertising under RPC 7.1, the
 *     firm's own responsibility. It shows up in the Studio under Reviews &
 *     Testimonials with "Approved for the website" switched off.
 *  2. The firm is emailed, so someone actually knows it arrived rather than
 *     discovering it in the Studio a month later.
 *
 * If the write token is missing the email still goes out, and the email
 * carries the full text — so the review is never simply dropped.
 *
 * WHAT THIS ROUTE DOES NOT DO: it does not post anything to Google. Nobody
 * can leave a Google review on someone else's behalf, and a site that
 * collected a rating here and then only showed the Google link to the happy
 * ones would be review gating, which Google prohibits outright. The page
 * shows the Google link to everyone, before they type anything.
 */

const WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN;
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5lgtr8bc";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const connectionString = process.env.ACS_CONNECTION_STRING;
const senderAddress = process.env.SENDER_EMAIL_ADDRESS;
const recipient = process.env.LEAD_RECIPIENT_EMAIL || "info@turuchilawfirm.com";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const POST = async (req) => {
  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  const {
    name = "",
    email = "",
    rating,
    review = "",
    caseType = "general",
    // Honeypot. A real person never fills this in; bots fill everything.
    website = "",
  } = payload || {};

  if (website) {
    // Silently accept and discard, so the bot does not learn to retry.
    return Response.json({ success: true, message: "Thank you." });
  }

  const cleanName = String(name).trim();
  const cleanReview = String(review).trim();
  const stars = Number(rating);

  if (!cleanName || cleanName.length > 120) {
    return Response.json(
      { success: false, message: "Please tell us your name." },
      { status: 400 }
    );
  }
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return Response.json(
      { success: false, message: "Please choose a rating from 1 to 5 stars." },
      { status: 400 }
    );
  }
  if (cleanReview.length > 5000) {
    return Response.json(
      { success: false, message: "That review is longer than we can accept." },
      { status: 400 }
    );
  }

  const submittedAt = new Date().toISOString();
  let storedId = null;
  let storeError = null;

  /* --------------------------------------------------- 1. store it */
  if (WRITE_TOKEN) {
    try {
      const sanity = createClient({
        projectId: PROJECT_ID,
        dataset: DATASET,
        apiVersion: "2024-01-01",
        token: WRITE_TOKEN,
        useCdn: false,
      });

      const doc = await sanity.create({
        _type: "testimonial",
        name: cleanName,
        role: "Client",
        testimonial: cleanReview,
        rating: stars,
        caseType,
        source: "website",
        // The two that keep it off the site until a human says otherwise.
        approved: false,
        status: "hidden",
        featured: false,
        order: 999,
        dateSubmitted: submittedAt.slice(0, 10),
      });
      storedId = doc._id;
    } catch (error) {
      storeError = error?.message || String(error);
      console.error("Could not save the review to Sanity:", storeError);
    }
  } else {
    storeError = "SANITY_WRITE_TOKEN is not set on this host";
    console.warn("Review received but not stored:", storeError);
  }

  /* --------------------------------------------------- 2. tell the firm */
  let emailed = false;

  if (connectionString && senderAddress) {
    try {
      const emailClient = new EmailClient(connectionString);
      const rows = [
        ["Name", cleanName],
        ["Email", email || "(not given)"],
        ["Rating", `${stars} / 5`],
        ["Case type", caseType],
        ["Received", submittedAt],
        [
          "Saved to Sanity",
          storedId ? `yes — ${storedId}` : `NO — ${storeError}. The text is below.`,
        ],
      ];

      await emailClient.beginSend({
        senderAddress,
        recipients: { to: [{ address: recipient }] },
        ...(email.includes("@") ? { replyTo: [{ address: email }] } : {}),
        content: {
          subject: `New ${stars}-star review from ${cleanName} — awaiting approval`,
          plainText:
            rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
            `\n\nReview:\n${cleanReview || "(no text — rating only)"}\n\n` +
            "This is NOT live on the website. Open Sanity Studio → Reviews & Testimonials, " +
            "read it, then switch on 'Approved for the website' and set Status to Active.",
          html:
            `<h2 style="font-family:system-ui">New ${stars}-star review — awaiting approval</h2>` +
            "<table style='font-family:system-ui;border-collapse:collapse'>" +
            rows
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:4px 12px 4px 0;color:#666">${escapeHtml(k)}</td>` +
                  `<td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
              )
              .join("") +
            "</table>" +
            `<p style="font-family:system-ui;white-space:pre-wrap;border-left:3px solid #D97706;padding-left:12px">${escapeHtml(
              cleanReview || "(no text — rating only)"
            )}</p>` +
            "<p style='font-family:system-ui;color:#666'>This is <strong>not</strong> live on the " +
            "website. Open Sanity Studio → Reviews &amp; Testimonials, read it, then switch on " +
            "&ldquo;Approved for the website&rdquo; and set Status to Active.</p>",
        },
      });
      emailed = true;
    } catch (error) {
      console.error("Could not email the review notification:", error?.message);
      // Not fatal on its own — if it was stored, it is safe.
    }
  }

  // The review has to have landed SOMEWHERE. Stored in Sanity is enough; so is
  // emailed. Neither means it is gone, and the one thing not to do then is
  // show a thank-you for something nobody will ever read — the person would
  // walk away believing they had left a review.
  if (!storedId && !emailed) {
    console.error(
      "A review was received and went nowhere.",
      `Sanity: ${storeError}.`,
      `Email: ${connectionString && senderAddress ? "send failed" : "not configured"}.`,
      "Review text follows so it is at least in the server log:",
      JSON.stringify({ name: cleanName, email, rating: stars, review: cleanReview })
    );

    return Response.json(
      {
        success: false,
        message:
          "Sorry — we could not save your review just now. Please call the office on 732-210-6410 and we will take it down ourselves.",
      },
      { status: 500 }
    );
  }

  return Response.json({
    success: true,
    message:
      "Thank you — your review has been sent to the firm and will appear once it has been read.",
  });
};
