/**
 * Reads `.env.local` into process.env before a script runs.
 *
 * Next.js loads `.env.local` for you; a plain `node scripts/…` run does not,
 * which is why these scripts kept asking for a token that was already sitting
 * in the file. This closes that gap: put SANITY_WRITE_TOKEN (and the ACS
 * variables) in `.env.local` once and every script here finds them.
 *
 * Deliberately small. It is not dotenv and does not try to be — no variable
 * expansion, no multiline values, no `export` prefixes. It handles the shape
 * `.env.local` actually has in this project:
 *
 *     KEY=value
 *     KEY="value with spaces"      # quotes stripped
 *     # comments and blank lines ignored
 *
 * A variable already set in the real environment always wins, so
 * `$env:SANITY_WRITE_TOKEN="sk..."` in one terminal still overrides the file —
 * useful when you want to run against a different dataset for one command.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Files are read in order; the first one to define a key wins. */
const FILES = [".env.local", ".env"];

export function loadEnv() {
  const loaded = [];

  for (const name of FILES) {
    const path = resolve(root, name);
    if (!existsSync(path)) continue;

    let text;
    try {
      text = readFileSync(path, "utf8");
    } catch {
      continue; // unreadable is the same as absent — never fail a script over it
    }

    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;

      const key = trimmed.slice(0, eq).trim();
      if (process.env[key] !== undefined) continue; // the real environment wins

      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      process.env[key] = value;
      loaded.push(`${name}:${key}`);
    }
  }

  return loaded;
}

export default loadEnv;
