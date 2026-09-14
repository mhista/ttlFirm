# Pushing the September review to Sanity

Everything below is **content**, which lives in Sanity, not in the code. Changing
the defaults in the repo does nothing to a site whose documents already hold the
old values — that's why the live site still says "500+", still shows the old
hero paragraph, and still has one address.

Run these from the project root (`ttlfirm/`). Three steps, about five minutes.

---

## 1. A write token, once

The script needs permission to change documents.

1. Go to **sanity.io/manage** → the `5lgtr8bc` project → **API** → **Tokens**
2. **Add API token** → name it anything → permission **Editor** → Save
3. Copy the token (it's shown once)

Then, in the same terminal you're about to run the command in:

```bat
:: Windows (Command Prompt)
set SANITY_WRITE_TOKEN=sk...
```

```powershell
# Windows (PowerShell)
$env:SANITY_WRITE_TOKEN="sk..."
```

```bash
# macOS / Linux
export SANITY_WRITE_TOKEN=sk...
```

The token stays in that terminal window only. Don't commit it.

---

## 2. Site Settings and the homepage hero

```bash
node scripts/apply-client-updates.mjs
```

That's a **preview** — it prints every field it would change, what's there now,
what it would become, and which of her notes it came from. Nothing is written.

When it looks right:

```bash
node scripts/apply-client-updates.mjs --apply
```

It patches named fields only, so anything she has edited in the Studio in the
meantime survives. Running it twice is harmless — the second run reports
everything as already done.

What it sets:

| Field | To | From her review |
|---|---|---|
| Where Enquiries Are Sent | info@turuchilawfirm.com | "route the text as an email to info@" |
| Main Address → Note | By appointment only | "in front of this Jersey City address" |
| Other Offices | 30 Knightsbridge Road, Suite 525, Piscataway, NJ 08854 | "please include my other address" |
| Hours | Open 24 hours, 7 days a week | "my hours are 24/7" |
| Cases Handled | 700 | "I've handled way more than that now" |
| Amount Recovered | Millions | "remove the 8 years, write Millions Recovered" |
| WhatsApp Number | 848-228-6402 | "we have a WhatsApp number" |
| Hero heading + description | The shortened version | the hero copy she was shown |

---

## 3. The landing pages

Their copy is in Sanity too, and it still carries "call centre", "insurance
defence" and "spent years". Regenerate the import file and replace the two
documents:

```bash
node scripts/seed-content.mjs
cd sanity
npx sanity dataset import ../seed/landing-pages.ndjson production --replace
```

`--replace` updates the existing documents rather than creating duplicates —
they use fixed IDs.

While you're there, the legal pages get the same treatment (the disclaimer page
had "practise" on it twice):

```bash
npx sanity dataset import ../seed/legal-pages.ndjson production --replace
```

---

## 4. If the Studio is deployed

New fields were added — Other Offices, the WhatsApp number, the lead email, the
accident-type lists, the attorney photo, the film section. A locally-run Studio
(`npx sanity dev`) picks those up on its own. A **hosted** Studio at
`*.sanity.studio` is running an older schema until you push it:

```bash
cd sanity
npx sanity deploy
```

If you skip this and someone opens the hosted Studio, the new fields simply
won't be there.

---

## Still needs doing by hand

- **The Google reviews** — waiting on her.

---

## If email isn't arriving

The site does **not** use SMTP. It uses Azure Communication Services Email,
which is an HTTPS API — there is no port, no SMTP username, and nothing a mail
client would recognise, so SMTP settings are the wrong place to look.

```bash
node scripts/email-doctor.mjs                      # check the configuration
node scripts/email-doctor.mjs --send you@email.com # send a real test
```

The second one prints Azure's own error, which is what actually identifies the
cause. In order of how often it turns out to be each:

1. The environment variables are set locally but not on the host — `.env.local`
   is never deployed, and the host needs its own copy plus a redeploy.
2. The sender domain is Verified in the Email Communication Service but never
   **connected** to the Communication Service. They are two Azure resources and
   the link is a separate step.
3. `SENDER_EMAIL_ADDRESS` isn't the exact MailFrom address Azure shows.
4. It sent, and went to Junk — Azure-managed `*.azurecomm.net` domains have no
   sending reputation.

## Checking it worked

```bash
node scripts/doctor.mjs
```

Reads the live dataset and reports what's actually there. Read-only.
