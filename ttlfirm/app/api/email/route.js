import { EmailClient, KnownEmailSendStatus } from "@azure/communication-email";
import { client } from "@/lib/sanity.client";

const connectionString = process.env.ACS_CONNECTION_STRING;
const senderAddress = process.env.SENDER_EMAIL_ADDRESS;
const fallbackRecipient = process.env.LEAD_RECIPIENT_EMAIL || "info@turuchilawfirm.com";

/**
 * Where enquiries land.
 *
 * Every contact form AND every message from the "Text us!" widget comes
 * through this route, so this one address is the answer to "where does the
 * text go" — it goes to an inbox, as an email.
 *
 * The firm can change it themselves in Site Settings → Contact without a
 * deploy. If Sanity is unreachable the server's own setting is used rather
 * than the send being abandoned: losing a lead is far worse than sending it to
 * yesterday's address.
 */
async function resolveRecipient() {
  try {
    const to = await client.fetch(`*[_type == "siteSettings"][0].contact.leadEmail`);
    if (typeof to === "string" && to.includes("@")) return to.trim();
  } catch (error) {
    console.error("Could not read the lead recipient from Sanity:", error?.message);
  }
  return fallbackRecipient;
}

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
    name,
    email = "",
    message,
    phone,
    smsConsent = false,
    source = "Website form",
    consentTimestamp = new Date().toISOString(),
    // Intake fields — only the landing page forms send these, so every one of
    // them is optional and simply omitted from the email when absent.
    caseType = "",
    incidentDate = "",
    treatedByDoctor = "",
    preferredLanguage = "",
  } = payload || {};

  // Rows that appear in the notification only when they were actually filled
  // in. A form that grows should never mean an email full of empty labels.
  const intakeRows = [
    ["Case type", caseType],
    ["Date of incident", incidentDate],
    ["Seen a doctor", treatedByDoctor],
    ["Preferred language", preferredLanguage],
  ].filter(([, value]) => value);

  // Email is optional for the Text Us widget, which only collects a mobile
  // number — so it is not part of the required set.
  if (!name || !message || !phone) {
    return Response.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const userIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  /**
   * Consent record. The A2P registration requires the firm to be able to
   * evidence, per number, that opt-in was given: what was agreed, when, from
   * where, and through which form. Keep these lines in the notification email
   * so there is a durable record in the firm's mailbox.
   */
  const consentBlock = smsConsent
    ? [
        "SMS CONSENT: GRANTED",
        `Consent text: "I consent to receive conversational, transactional, informational and promotional SMS messages from The Turuchi Law Firm at the number provided. Consent is not a condition of purchasing services, retaining the firm, or receiving legal services. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help."`,
        `Timestamp (UTC): ${consentTimestamp}`,
        `Captured via: ${source}`,
        `IP address: ${userIP}`,
        `User agent: ${userAgent}`,
      ].join("\n")
    : "SMS CONSENT: NOT GRANTED — do not text this number. Contact by phone or email only.";

  const plainText = [
    `Source: ${source}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : "Email: (not provided)",
    ...intakeRows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
    "",
    "----------------------------------------",
    consentBlock,
  ].join("\n");

  const html = `
  <div style="max-width:640px;margin:0 auto;font-family:Helvetica,Arial,sans-serif;background:#ffffff;border:1px solid #E3E8EF;border-radius:10px;overflow:hidden;">
    <div style="background:#0A2340;color:#ffffff;padding:20px 24px;">
      <p style="margin:0;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#E9A94A;">${escapeHtml(source)}</p>
      <h2 style="margin:6px 0 0;font-size:20px;font-weight:700;">New enquiry from the website</h2>
    </div>

    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;color:#0F172A;">
        <tr><td style="padding:6px 0;width:110px;color:#4A5568;">Name</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#4A5568;">Phone</td><td style="padding:6px 0;font-weight:600;"><a href="tel:${escapeHtml(phone)}" style="color:#1C5389;">${escapeHtml(phone)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#4A5568;">Email</td><td style="padding:6px 0;font-weight:600;">${email ? `<a href="mailto:${escapeHtml(email)}" style="color:#1C5389;">${escapeHtml(email)}</a>` : "&mdash;"}</td></tr>
        ${intakeRows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 0;color:#4A5568;">${escapeHtml(label)}</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </table>

      <div style="margin-top:18px;background:#F5F7FA;border-left:3px solid #D98324;border-radius:6px;padding:16px;">
        <p style="margin:0;font-size:15px;line-height:1.6;color:#0F172A;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>

      <div style="margin-top:18px;padding:14px 16px;border-radius:6px;background:${smsConsent ? "#ECF7EE" : "#FDF3F3"};border:1px solid ${smsConsent ? "#BFE3C6" : "#F0CFCF"};">
        <p style="margin:0;font-size:13px;font-weight:700;color:${smsConsent ? "#1E6B33" : "#9A2222"};">
          ${smsConsent ? "SMS consent granted" : "SMS consent NOT granted — do not text this number"}
        </p>
        ${
          smsConsent
            ? `<p style="margin:8px 0 0;font-size:12px;line-height:1.6;color:#4A5568;">
                 Timestamp (UTC): ${escapeHtml(consentTimestamp)}<br/>
                 Captured via: ${escapeHtml(source)}<br/>
                 IP address: ${escapeHtml(userIP)}<br/>
                 User agent: ${escapeHtml(userAgent)}
               </p>
               <p style="margin:8px 0 0;font-size:11px;line-height:1.6;color:#6B7280;">
                 Retain this email as the consent record for A2P 10DLC compliance.
               </p>`
            : ""
        }
      </div>

      ${
        email
          ? `<div style="text-align:center;margin-top:22px;">
               <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#D98324;color:#061525;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:6px;font-size:14px;">Reply now</a>
             </div>`
          : ""
      }
    </div>
  </div>`;

  if (!connectionString || !senderAddress) {
    console.error("Email is not configured: ACS_CONNECTION_STRING / SENDER_EMAIL_ADDRESS missing.");
    return Response.json(
      { success: false, message: "Email service is not configured" },
      { status: 500 }
    );
  }

  const emailMessage = {
    senderAddress,
    recipients: { to: [{ address: await resolveRecipient() }] },
    replyTo: email ? [{ address: email, displayName: name }] : undefined,
    content: {
      subject: `New ${smsConsent ? "[SMS OPT-IN] " : ""}enquiry — ${name}`,
      plainText,
      html,
    },
  };

  try {
    // Named to avoid shadowing the Sanity client imported at the top.
    const emailClient = new EmailClient(connectionString);
    const poller = await emailClient.beginSend(emailMessage);
    const result = await poller.pollUntilDone();

    if (result.status === KnownEmailSendStatus.Succeeded) {
      return Response.json({ success: true, message: "Message sent" }, { status: 200 });
    }
    throw new Error(`Send finished with status ${result.status}`);
  } catch (error) {
    // The previous version tried to "retry in the background" inside a
    // setTimeout after the response had already been returned — on a
    // serverless runtime that callback is never guaranteed to run, and it
    // referenced a variable that was out of scope, so it always threw.
    //
    // Log enough to diagnose from the host's log viewer without opening the
    // code: a bare "Failed to send" tells whoever is on call nothing, and the
    // three things that actually go wrong (a rotated key, an unlinked sender
    // domain, a rejected reply-to) each have a distinct signature here.
    console.error("Lead email failed to send.", {
      code: error?.code || error?.statusCode || "none",
      message: error?.message,
      senderAddress,
      hadReplyTo: Boolean(email),
      details: error?.details,
    });
    console.error(
      "Run `node scripts/email-doctor.mjs --send you@example.com` to reproduce this " +
        "with Azure's own error message."
    );
    return Response.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
};
