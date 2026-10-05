#!/usr/bin/env node
/**
 * Pulls the firm's Google reviews into Sanity.
 *
 *   node scripts/sync-google-reviews.mjs           # show what would change
 *   node scripts/sync-google-reviews.mjs --apply   # write it
 *
 * WHY THIS USES THE BUSINESS PROFILE API AND NOT THE PLACES API
 *
 * There are two Google APIs that return reviews and only one of them is any
 * use here:
 *
 *   Places API  — returns at most FIVE reviews, and its terms forbid caching
 *                 or storing review content. So it cannot fill a reviews page
 *                 and it cannot write to a CMS. Ruled out on both counts.
 *
 *   Business Profile API (mybusiness.googleapis.com/v4) — returns every review
 *                 the profile has, with the owner's replies, and is meant for
 *                 exactly this. It needs the profile owner's own OAuth
 *                 credentials, which is the point: it is her data.
 *
 * WHAT HAS TO EXIST BEFORE THIS RUNS
 *
 * The Business Profile APIs are not on by default. A Google Cloud project has
 * to be approved through Google's access-request form, which takes days to a
 * few weeks. REVIEWS.md walks through it. Until that approval lands this
 * script will report that the API is not enabled, and the site keeps serving
 * the reviews already seeded into Sanity — which is why that seed exists.
 *
 * Environment it needs (put them in .env.local):
 *
 *   GOOGLE_CLIENT_ID          from the Cloud project's OAuth client
 *   GOOGLE_CLIENT_SECRET      the same
 *   GOOGLE_REFRESH_TOKEN      obtained once, consenting as the account that
 *                             owns the Business Profile
 *   GOOGLE_LOCATION_NAME      e.g. accounts/123456/locations/789012
 *   SANITY_WRITE_TOKEN        an Editor token
 *
 * HOW IT MERGES
 *
 * Google's review id is stored on each document as `googleReviewId`, and that
 * is what a re-sync matches on — so a review that gets edited on Google is
 * updated in place rather than duplicated. Reviews seeded by hand are matched
 * by reviewer name the first time, so the seeded copies are adopted rather
 * than doubled.
 *
 * It never deletes. If a review disappears from Google — the reviewer removed
 * it, or Google did — this reports it and leaves the document alone for a
 * person to decide about. Silently deleting a client's words is not a thing a
 * script should do on its own.
 */
import { createClient } from "@sanity/client";
import { loadEnv } from "./load-env.mjs";

loadEnv();

const APPLY = process.argv.includes("--apply");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const LOCATION = process.env.GOOGLE_LOCATION_NAME;

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5lgtr8bc";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const SANITY_TOKEN = process.env.SANITY_WRITE_TOKEN;

const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  bad: (s) => `\x1b[31m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`,
};

const STAR_WORDS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

/** Google returns an absolute timestamp; the card wants Google's own wording. */
function relativeDate(iso) {
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "";
  const days = Math.floor((Date.now() - then.getTime()) / 86400000);

  if (days < 1) return "today";
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (days < 31) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }
  if (days < 365) {
    const months = Math.max(1, Math.round(days / 30));
    return months === 1 ? "a month ago" : `${months} months ago`;
  }
  const years = Math.floor(days / 365);
  return years === 1 ? "a year ago" : `${years} years ago`;
}

const slug = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "review";

/* ------------------------------------------------------------ google auth */
async function accessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `OAuth refresh failed (${res.status}): ${json.error_description || json.error || "unknown"}`
    );
  }
  return json.access_token;
}

/* --------------------------------------------------------- fetch reviews */
async function fetchReviews(token) {
  const all = [];
  let pageToken;

  do {
    const url = new URL(`https://mybusiness.googleapis.com/v4/${LOCATION}/reviews`);
    url.searchParams.set("pageSize", "50");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const message = json?.error?.message || `HTTP ${res.status}`;
      if (res.status === 403) {
        throw new Error(
          `${message}\n\n` +
            "A 403 here almost always means the Business Profile API is not yet\n" +
            "approved for this Cloud project — new projects start on zero quota\n" +
            "until Google approves the access-request form. See REVIEWS.md."
        );
      }
      throw new Error(message);
    }

    all.push(...(json.reviews || []));
    pageToken = json.nextPageToken;
  } while (pageToken);

  return all;
}

/* ---------------------------------------------------------------- mapping */
function toDocument(review, order) {
  const name = review.reviewer?.displayName?.trim() || "A Google user";
  const rating = STAR_WORDS[review.starRating] ?? 0;
  const created = review.createTime || review.updateTime;

  return {
    _id: `testimonial-google-${slug(name)}`,
    _type: "testimonial",
    name,
    role: "Google review",
    testimonial: (review.comment || "").trim(),
    rating,
    caseType: "general",
    order,
    status: "active",
    approved: true,
    featured: false,
    source: "google",
    googleReviewId: review.reviewId || review.name,
    sourceUrl: review.name
      ? `https://search.google.com/local/reviews?placeid=${process.env.GOOGLE_PLACE_ID || ""}`
      : undefined,
    relativeDate: relativeDate(created),
    dateSubmitted: created ? created.slice(0, 10) : undefined,
    // A synced review is the complete text, by definition.
    truncated: false,
    ...(review.reviewReply?.comment
      ? { ownerReply: review.reviewReply.comment.trim() }
      : {}),
  };
}

/* ------------------------------------------------------------------- main */
async function main() {
  console.log(c.b("\nGoogle reviews → Sanity"));
  console.log(APPLY ? c.warn("Mode: APPLY — this will write.\n") : c.dim("Mode: preview only. Add --apply to write.\n"));

  const missing = [
    !CLIENT_ID && "GOOGLE_CLIENT_ID",
    !CLIENT_SECRET && "GOOGLE_CLIENT_SECRET",
    !REFRESH_TOKEN && "GOOGLE_REFRESH_TOKEN",
    !LOCATION && "GOOGLE_LOCATION_NAME",
    !SANITY_TOKEN && "SANITY_WRITE_TOKEN",
  ].filter(Boolean);

  if (missing.length) {
    console.log(c.bad("Not configured yet. Missing:"));
    missing.forEach((key) => console.log(`  · ${key}`));
    console.log(
      "\n" +
        c.dim(
          "This is expected until the Business Profile API access request is\n" +
            "approved. Until then the site serves the reviews already in Sanity,\n" +
            "which is not a broken state — just a manual one.\n\n" +
            "REVIEWS.md has the whole setup, start to finish.\n"
        )
    );
    process.exit(1);
  }

  let reviews;
  try {
    console.log(c.dim("Refreshing the access token…"));
    const token = await accessToken();
    console.log(c.dim(`Reading ${LOCATION}…`));
    reviews = await fetchReviews(token);
  } catch (error) {
    console.log(`\n${c.bad("Could not read the reviews.")}\n${error.message}\n`);
    process.exit(1);
  }

  console.log(c.ok(`\nGoogle returned ${reviews.length} review(s).\n`));

  const sanity = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-01-01",
    token: SANITY_TOKEN,
    useCdn: false,
  });

  const existing = await sanity.fetch(
    `*[_type == "testimonial" && source == "google"]{ _id, name, googleReviewId, testimonial }`
  );
  const byGoogleId = new Map(existing.filter((d) => d.googleReviewId).map((d) => [d.googleReviewId, d]));
  const byName = new Map(existing.map((d) => [d.name, d]));

  const docs = reviews.map(toDocument);
  const seenIds = new Set(docs.map((d) => d.googleReviewId));

  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const doc of docs) {
    // Prefer the Google id; fall back to the name so hand-seeded reviews are
    // adopted on the first sync rather than duplicated.
    const prior = byGoogleId.get(doc.googleReviewId) || byName.get(doc.name);
    const target = prior ? { ...doc, _id: prior._id } : doc;

    if (!prior) {
      console.log(`  ${c.ok("new")}       ${doc.name} — ${"★".repeat(doc.rating)}`);
      created++;
    } else if (prior.testimonial !== doc.testimonial) {
      const was = prior.testimonial?.length || 0;
      console.log(
        `  ${c.warn("updated")}   ${doc.name} ${c.dim(`(${was} → ${doc.testimonial.length} chars)`)}`
      );
      updated++;
    } else {
      unchanged++;
      continue;
    }

    if (APPLY) {
      await sanity.createOrReplace(target);
    }
  }

  const gone = existing.filter((d) => d.googleReviewId && !seenIds.has(d.googleReviewId));
  if (gone.length) {
    console.log(`\n${c.warn("No longer on Google:")}`);
    gone.forEach((d) => console.log(`  · ${d.name} ${c.dim(d._id)}`));
    console.log(
      c.dim(
        "  Left in place on purpose. Either the reviewer removed it or Google did —\n" +
          "  decide in the Studio rather than having a script delete someone's words.\n"
      )
    );
  }

  console.log(
    `\n${c.b("Summary")}  ${created} new, ${updated} updated, ${unchanged} unchanged` +
      (gone.length ? `, ${gone.length} missing from Google` : "")
  );
  console.log(APPLY ? c.ok("Written.\n") : c.dim("Nothing written. Re-run with --apply.\n"));
}

main().catch((error) => {
  console.error(c.bad(`\nFailed: ${error.message}\n`));
  process.exit(1);
});
