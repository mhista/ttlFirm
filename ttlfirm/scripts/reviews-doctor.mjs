#!/usr/bin/env node
/**
 * What is actually in Sanity, review-wise.
 *
 *   node scripts/reviews-doctor.mjs
 *
 * Read-only. It never writes and never deletes.
 *
 * This exists because "the older reviews disappeared" deserved an answer from
 * the data rather than from a theory. It lists EVERY testimonial document —
 * queried with no filter at all, so nothing can hide from it — and says for
 * each one why the site is or is not showing it.
 *
 * The bug it caught: `status == "active"` drops every testimonial that has no
 * `status` field. A schema's `initialValue` only applies to documents created
 * after that field existed, so anything older is invisible to the filter while
 * sitting perfectly intact in the dataset. It looks exactly like deletion and
 * is nothing of the sort — which is the whole reason to check rather than
 * guess.
 */
import { loadEnv } from "./load-env.mjs";

loadEnv();

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5lgtr8bc";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API = "v2024-01-01";

const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  bad: (s) => `\x1b[31m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`,
};

async function query(groq) {
  const url =
    `https://${PROJECT_ID}.api.sanity.io/${API}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(groq)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${await res.text()}`);
  const { result } = await res.json();
  return result;
}

// Mirrors VISIBLE_REVIEW in lib/sanity.queries.js. Keep the two in step.
const unset = (v) => v === undefined || v === null;
const shown = (doc) =>
  (doc.status === "active" || unset(doc.status)) && (doc.approved === true || unset(doc.approved));

function reason(doc) {
  if (doc.status === "hidden") return "status is \"hidden\" — someone switched it off";
  if (!unset(doc.status) && doc.status !== "active") return `status is "${doc.status}", not "active"`;
  if (doc.approved === false) return "approved is off — awaiting a read-through";
  return null;
}

async function main() {
  console.log(c.b(`\nReviews in Sanity — project ${PROJECT_ID}, dataset ${DATASET}\n`));

  let docs;
  try {
    // No filter at all. Anything of this type shows up here.
    docs = await query(
      `*[_type == "testimonial"] | order(coalesce(dateSubmitted, "") desc) {
        _id, name, rating, status, approved, source, dateSubmitted, relativeDate,
        "chars": length(coalesce(testimonial, "")), truncated,
        "hasReply": defined(ownerReply)
      }`
    );
  } catch (error) {
    console.log(c.bad(`Could not reach Sanity: ${error.message}\n`));
    process.exit(1);
  }

  if (!docs?.length) {
    console.log(c.warn("There are no testimonial documents in this dataset at all.\n"));
    process.exit(0);
  }

  const visible = docs.filter(shown);
  const hidden = docs.filter((d) => !shown(d));

  const bySource = docs.reduce((acc, d) => {
    const key = d.source || "(no source set — added before the field existed)";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  console.log(`${c.b("Total")}      ${docs.length} testimonial document(s)`);
  console.log(`${c.b("On the site")} ${visible.length}`);
  if (hidden.length) console.log(`${c.b("Hidden")}     ${hidden.length}`);
  console.log("");

  console.log(c.b("By source"));
  for (const [source, count] of Object.entries(bySource)) {
    console.log(`  ${String(count).padStart(3)}  ${source}`);
  }

  console.log(`\n${c.b("Every document")}`);
  for (const doc of docs) {
    const why = reason(doc);
    const mark = why ? c.warn("hidden") : c.ok("shown ");
    const stars = "★".repeat(doc.rating || 0).padEnd(5);
    const src = (doc.source || "—").padEnd(8);
    console.log(
      `  ${mark}  ${stars}  ${src}  ${String(doc.name || "(unnamed)").slice(0, 28).padEnd(28)}` +
        c.dim(`${doc.chars} chars${doc.truncated ? ", partial" : ""}${doc.hasReply ? ", replied" : ""}`)
    );
    if (why) console.log(c.dim(`              ↳ ${why}`));
  }

  /* ---------------------------------------------- the filter bug, checked */
  const noStatus = docs.filter((d) => unset(d.status));
  const noApproved = docs.filter((d) => unset(d.approved));

  if (noStatus.length || noApproved.length) {
    console.log(`\n${c.b("Older documents")}`);
    if (noStatus.length)
      console.log(`  ${noStatus.length} have no \`status\` field`);
    if (noApproved.length)
      console.log(`  ${noApproved.length} have no \`approved\` field`);
    console.log(
      c.dim(
        "  Both are normal for anything added before those fields existed, and both\n" +
          "  are shown on the site. They are also how reviews go missing: a filter\n" +
          "  written `status == \"active\"` excludes a document that has no status at\n" +
          "  all. The site's queries accept the value OR the field being absent, so\n" +
          "  only an explicit 'hidden' or 'not approved' takes a review down."
      )
    );
  }

  const awaiting = docs.filter((d) => d.approved === false);
  if (awaiting.length) {
    console.log(
      `\n${c.warn(`${awaiting.length} review(s) submitted through the website are waiting for approval.`)}`
    );
    awaiting.forEach((d) => console.log(`  · ${d.name} — ${"★".repeat(d.rating || 0)}`));
    console.log(
      c.dim("  Studio → Reviews & Testimonials → switch on 'Approved for the website'\n  and set Status to Active.")
    );
  }

  console.log("");
}

main().catch((error) => {
  console.error(c.bad(`\nFailed: ${error.message}\n`));
  process.exit(1);
});
