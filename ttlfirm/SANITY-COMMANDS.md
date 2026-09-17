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
| Site Title | The Turuchi Law Firm, LLC | "the arrows should both say 'The Turuchi Law Firm, LLC'" |
| Main Address | 3 Gateway Center, 12th Floor, Suite 1201, Newark, NJ 07102 | "completely remove the Jersey city address… this is the new physical address" |
| Main Address → Note | *(cleared)* | "By appointment only" was Jersey City's note |
| Other Offices | 30 Knightsbridge Road, Suite 525, Piscataway, NJ 08854 | "please include my other address" |
| Hours | Open 24 hours, 7 days a week | "my hours are 24/7" |
| Cases Handled | 700 | "I've handled way more than that now" |
| Amount Recovered | Millions | "remove the 8 years, write Millions Recovered" |
| WhatsApp Number | 848-228-6402 | "we have a WhatsApp number" |
| Built By → Link | instagram.com/kymaatech | "use the instagram account till the website is fully built" |
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

- **The Google Business Profile.** The Newark address is on the site, but the
  firm's *profile* is hers to claim and verify — and until it exists there is
  nowhere for anyone to leave a review. See `GOOGLE-REVIEWS.md`, which covers
  the claiming step, the review link, when to ask, what to send, and how to
  reply without a confidentiality problem.
- **The office photos are shipped with the site** (`office-gateway-street.jpg`
  and `office-gateway-tower.jpg`, both upscaled from the ones she sent). They
  appear in the new "Our office" band on the Contact page. To swap them later:
  Studio → Contact Page → Office Photos. Nothing about them touches Google —
  they are photographs on the page, which is what she asked for.
- **The sitelinks.** She wants Personal Injury and Attorney Profile showing
  under the firm's search result instead of Legal Disclaimer and Terms &
  Conditions. Google chooses those itself; there is no setting. What has been
  done is everything that legitimately influences it — see the next section —
  and it takes a few weeks of recrawling to show. Submitting the sitemap in
  Search Console speeds it up.

---

## About the search result

Two of her notes were about how the firm looks in Google rather than on the
site, so it is worth being clear about what is and is not controllable.

**The name.** "The Turuchi Law Firm, LLC" is now the `<title>` suffix on every
page, the `og:site_name`, the `WebSite` and `LegalService` schema name, and the
Site Title in Sanity. Google cross-checks those before it settles on a name, so
they all had to agree — they now do. The remaining piece is outside the site:
the **Google Business Profile** name must match exactly too, or Google keeps
preferring the profile's version.

**The sitelinks.** Those six links under the result are picked by Google. The
honest levers, all now pulled:

- the footer's Explore column leads with Personal Injury and Attorney Profile,
  using those exact words as the anchor text
- Privacy Policy and Terms are no longer in that column — they were linked
  three times on every page (column, legal notice, colophon), more than any
  real page, which is the likeliest reason Google picked them
- `/profile` is now priority 0.9 in the sitemap, the legal pages 0.1–0.2
- the `/profile` and practice-area titles now *lead* with the page name, since
  sitelink labels come from the title and the anchor text pointing at it
- a `SiteNavigationElement` block on the homepage names the six pages the firm
  would like surfaced, in order

None of that is a guarantee — anyone who promises one is selling something —
but it stops the site arguing for the legal pages, which it previously was.

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
