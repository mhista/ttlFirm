#!/usr/bin/env node
/**
 * Applies the client's September review to the LIVE Sanity documents.
 *
 * Everything in here is content, which means it lives in Sanity and not in the
 * code — changing the defaults in the repo does nothing to a site whose
 * documents already hold the old values. Rather than a dozen manual edits in
 * the Studio, this patches exactly the fields she asked about and leaves every
 * other field alone.
 *
 *   node scripts/apply-client-updates.mjs            # show what would change
 *   node scripts/apply-client-updates.mjs --apply    # write it
 *
 * Needs a write token:
 *   Windows   set SANITY_WRITE_TOKEN=sk...
 *   mac/Linux export SANITY_WRITE_TOKEN=sk...
 *
 * Create one at sanity.io/manage → your project → API → Tokens → Editor.
 *
 * It patches named fields, never whole documents, so anything she has edited
 * herself in between survives. Re-running it is harmless.
 */
import { createClient } from "@sanity/client";

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5lgtr8bc";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_WRITE_TOKEN;
const APPLY = process.argv.includes("--apply");

const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  bad: (s) => `\x1b[31m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`,
};

/* ------------------------------------------------------------ the changes
   Each entry is one field. `value` is what it becomes; `why` is what she
   asked for, so the next person reading this knows it was not invented. */
const SITE_SETTINGS = [
  {
    path: "contact.leadEmail",
    value: "info@turuchilawfirm.com",
    why: '"Is it possible for the text to be routed as an email that comes into info@turuchilawfirm.com?"',
  },
  {
    path: "contact.whatsapp",
    value: "848-228-6402",
    why: '"We have a WhatsApp number… I need you to add WhatsApp somewhere here"',
  },
  {
    path: "contact.address.note",
    value: "By appointment only",
    why: '"In front of this Jersey City address, put By Appointment Only"',
  },
  {
    path: "contact.additionalOffices",
    value: [
      {
        _key: "piscataway",
        _type: "object",
        label: "Piscataway",
        street: "30 Knightsbridge Road, Suite 525",
        city: "Piscataway",
        state: "NJ",
        zipCode: "08854",
        country: "US",
      },
    ],
    why: '"Please include my other address: 30 Knightsbridge Road, Suite 525, Piscataway, NJ 08854"',
  },
  {
    path: "businessHours.weekdaysDisplay",
    value: "Open 24 hours, 7 days a week",
    why: '"my hours are 24/7. Please change this to 24/7"',
  },
  { path: "businessHours.weekdays", value: "Mo-Su 00:00-23:59", why: "the same, for Google" },
  { path: "businessHours.weekend", value: "Open", why: "the same" },
  {
    path: "stats.casesHandled",
    value: 700,
    why: '"500+ Cases Handled, I\'ve handled way more than that now… write 700+"',
  },
  {
    path: "stats.recoveredLabel",
    value: "Millions",
    why: '"remove the 8 years… just write Millions Recovered for Clients"',
  },
];

const HOME_PAGE = [
  {
    path: "hero.heading",
    value: "Delivering our absolute best for your legal outcome.",
    why: "her own headline, cut to eight words so it sets in three lines on a phone",
  },
  {
    path: "hero.description",
    value:
      "A dedicated New Jersey firm, built on compassion, diligence and integrity — relentlessly pursuing fair compensation for people harmed by someone else's negligence.",
    why: "her own words, trimmed from seventy, and no longer naming immigration or municipal court",
  },
];

const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

const show = (value) => {
  if (value == null) return c.dim("(empty)");
  if (Array.isArray(value)) return c.dim(`${value.length} item(s)`);
  const text = String(value);
  return text.length > 76 ? `${text.slice(0, 76)}…` : text;
};

async function main() {
  console.log(c.b(`\nClient review — project ${PROJECT_ID}, dataset ${DATASET}`));
  console.log(APPLY ? c.warn("Mode: APPLY — this will write.\n") : c.dim("Mode: preview only. Add --apply to write.\n"));

  if (!TOKEN) {
    console.log(c.bad("No SANITY_WRITE_TOKEN set."));
    console.log("Create an Editor token at sanity.io/manage → API → Tokens, then:");
    console.log(c.dim("  Windows    set SANITY_WRITE_TOKEN=sk..."));
    console.log(c.dim("  mac/Linux  export SANITY_WRITE_TOKEN=sk...\n"));
    process.exit(1);
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2024-01-01",
    token: TOKEN,
    useCdn: false,
  });

  const targets = [
    { label: "Site Settings", type: "siteSettings", changes: SITE_SETTINGS },
    { label: "Homepage", type: "homePage", changes: HOME_PAGE },
  ];

  let pending = 0;

  for (const target of targets) {
    const doc = await client.fetch(`*[_type == "${target.type}"][0]`);
    console.log(c.b(target.label));

    if (!doc) {
      console.log(`  ${c.bad("not found")} — no ${target.type} document in this dataset.\n`);
      continue;
    }

    const patch = {};
    for (const change of target.changes) {
      const current = get(doc, change.path);
      const same = JSON.stringify(current) === JSON.stringify(change.value);
      console.log(`  ${same ? c.ok("done") : c.warn("todo")}  ${change.path}`);
      if (!same) {
        console.log(`        ${c.dim("now: ")}${show(current)}`);
        console.log(`        ${c.dim("new: ")}${show(change.value)}`);
        console.log(`        ${c.dim(change.why)}`);
        patch[change.path] = change.value;
        pending += 1;
      }
    }

    if (APPLY && Object.keys(patch).length) {
      await client.patch(doc._id).set(patch).commit();
      console.log(`  ${c.ok("written")} — ${Object.keys(patch).length} field(s)\n`);
    } else {
      console.log("");
    }
  }

  if (!pending) {
    console.log(c.ok("Everything already matches. Nothing to do.\n"));
  } else if (!APPLY) {
    console.log(c.b(`${pending} field(s) would change. Re-run with --apply to write them.\n`));
  } else {
    console.log(c.b("Done. Check the site after the cache clears — up to a minute.\n"));
  }
}

main().catch((error) => {
  console.error(c.bad(`\nFailed: ${error.message}`));
  if (/Unauthorized|permission/i.test(error.message)) {
    console.error("The token needs Editor permission on this dataset.\n");
  }
  process.exit(1);
});
