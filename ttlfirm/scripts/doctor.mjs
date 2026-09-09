#!/usr/bin/env node
/**
 * Checks what is actually in Sanity against what the code expects, and tells
 * you exactly what to run to fix any gap.
 *
 *   node scripts/doctor.mjs
 *
 * Read-only — it never writes to the dataset.
 */

import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

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
  const url = `https://${PROJECT_ID}.api.sanity.io/${API}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.result;
}

const readSeed = (file) => {
  const path = resolve(root, "seed", file);
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8").trim().split("\n").map((l) => JSON.parse(l));
};

const fixes = [];

console.log(c.b(`\nSanity doctor — project ${PROJECT_ID}, dataset ${DATASET}\n`));

/* ------------------------------------------------------------------ 1. code */
console.log(c.b("1. Local code"));
const schemaIndex = resolve(root, "sanity/schemaTypes/index.js");
const landingSchema = resolve(root, "sanity/schemaTypes/landingPage.js");
const studioConfig = resolve(root, "sanity/sanity.config.js");

const has = (path, needle) => existsSync(path) && readFileSync(path, "utf8").includes(needle);

const codeChecks = [
  ["landingPage registered in schemaTypes/index.js", has(schemaIndex, "landingPage")],
  ["legalPage registered in schemaTypes/index.js", has(schemaIndex, "legalPage")],
  ["Video section exists in landingPage schema", has(landingSchema, "lpVideo")],
  ["Studio menu shows Landing Pages", has(studioConfig, "Landing Pages")],
  ["Studio menu shows Legal Pages", has(studioConfig, "Legal Pages")],
];
for (const [label, pass] of codeChecks) {
  console.log(`   ${pass ? c.ok("PASS") : c.bad("FAIL")}  ${label}`);
  if (!pass) fixes.push(`Code is out of date — re-sync the project files. Missing: ${label}`);
}

/* --------------------------------------------------------- 2. prebuilt studio */
if (existsSync(resolve(root, "sanity/dist/index.html"))) {
  console.log(
    `   ${c.warn("NOTE")}  A prebuilt Studio exists at sanity/dist — if you are opening that, ` +
      `or a deployed *.sanity.studio URL, it is running an OLD schema.`
  );
  fixes.push(
    "If the Studio you open is a deployed URL (*.sanity.studio) or sanity/dist, run `cd sanity && npx sanity deploy` to push the new schema. For local work use `cd sanity && npx sanity dev`."
  );
}

/* ----------------------------------------------------------------- 3. dataset */
console.log(c.b("\n2. What is actually in Sanity"));

let landing = [];
let legal = [];
try {
  landing = (await query(
    '*[_type=="landingPage"]{_id,"slug":slug.current,published,"types":sections[]._type}'
  )) || [];
  legal = (await query('*[_type=="legalPage"]{_id,"slug":slug.current,"n":count(sections)}')) || [];
} catch (err) {
  console.log(`   ${c.bad("FAIL")}  Could not reach Sanity: ${err.message}`);
  console.log(c.dim("   Check your internet connection, or that the dataset is public."));
  process.exit(1);
}

if (!landing.length) {
  console.log(`   ${c.bad("FAIL")}  No landingPage documents found.`);
  fixes.push(
    "Import the landing pages:\n     cd sanity\n     npx sanity dataset import ../seed/landing-pages.ndjson production --replace"
  );
} else {
  for (const d of landing) {
    const types = d.types || [];
    const live = d.published === true;
    const video = types.includes("lpVideo");
    console.log(
      `   ${live ? c.ok("LIVE") : c.warn("DRFT")}  /lp/${d.slug}  ${c.dim(`(${types.length} sections)`)}`
    );
    console.log(
      `           video section: ${video ? c.ok("present") : c.bad("MISSING")}   ${c.dim(types.join(" → "))}`
    );
    if (!live) fixes.push(`"${d.slug}" is not published — open it in the Studio and switch Published on.`);
    if (!video)
      fixes.push(
        "The documents in Sanity predate the video section. Re-import to update them:\n     node scripts/seed-content.mjs\n     cd sanity\n     npx sanity dataset import ../seed/landing-pages.ndjson production --replace"
      );
  }
}

if (!legal.length) {
  console.log(`   ${c.warn("NOTE")}  No legalPage documents — the legal pages are rendering from the`);
  console.log(c.dim("           built-in fallback text, so they work but are not editable yet."));
  fixes.push(
    "To make the legal pages editable in the Studio:\n     cd sanity\n     npx sanity dataset import ../seed/legal-pages.ndjson production --replace"
  );
} else {
  for (const d of legal) {
    console.log(`   ${c.ok("OK")}    /${d.slug}  ${c.dim(`(${d.n} sections)`)}`);
  }
}

/* --------------------------------------------------------------- 4. seed drift */
const seed = readSeed("landing-pages.ndjson");
if (seed) {
  console.log(c.b("\n3. Local seed file"));
  for (const d of seed) {
    const types = (d.sections || []).map((s) => s._type);
    console.log(`   /lp/${d.slug.current}  ${c.dim(types.join(" → "))}`);
  }
}

/* ---------------------------------------------------------------- 5. verdict */
console.log(c.b("\n" + "─".repeat(64)));
if (!fixes.length) {
  console.log(c.ok("Everything checks out. If a page still looks wrong, restart `npm run dev`."));
} else {
  console.log(c.b("What to do:\n"));
  [...new Set(fixes)].forEach((f, i) => console.log(`  ${i + 1}. ${f}\n`));
}
console.log();
