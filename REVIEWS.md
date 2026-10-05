# Reviews on the website

Three questions came up together, and they have three different answers.

1. **Can her Google reviews show on the site?** Yes. All 17 are already on it.
2. **Can clients leave a review on the site?** Yes — `/reviews` does that now.
3. **Can the site stay in sync with Google automatically?** Yes, but it needs
   an approval from Google first. Everything on this side is built and waiting.

---

## First, a correction

An earlier note in `GOOGLE-REVIEWS.md` said the firm had no Google Business
Profile and that claiming one was step zero. **That was wrong** — the search
results show a verified profile under the exact name *The Turuchi Law Firm,
LLC*, with 5.0 stars from 17 reviews, hours set to Open 24 hours, and replies
posted to nearly every review. It has been live for a while.

That changes things for the better:

- The name on the profile already matches what she asked for, so the knowledge
  panel is correct. Nothing to do there.
- The 60-days-verified requirement for the API is already satisfied.
- Getting more reviews is a process problem, not a setup problem — the "when
  to ask" and "what to send" parts of `GOOGLE-REVIEWS.md` still stand.

---

## What is live now

### `/reviews`

- All 17 reviews, newest first, not filtered by rating
- The firm's replies shown beneath each one
- 5.0 average and the review count, computed from what is actually on the page
- A **Leave a Google review** button, shown to everyone
- A form for leaving a review directly on the site
- `AggregateRating` structured data — this is what can put gold stars in the
  search result

Reviews also feed the existing testimonials carousel on the homepage.

### Where the text came from

The reviews were transcribed from the Business Profile in September 2026.
Google's collapsed view cuts long reviews off at "… More", so **10 of the 17
are stored as partial text**. Those cards say so and link to the full review
rather than presenting a fragment as the whole thing. Two reviewers left a
rating with no words; they are stored that way.

Nobody should ever edit the wording of a review in the Studio. Beyond being
dishonest, rewriting a client testimonial is an RPC 7.1 problem for an
attorney. The sync below replaces every partial with the full text
automatically once it is switched on.

### The form

`/reviews` has a form that writes into Sanity **unapproved** and emails the
office. Nothing appears on the site until someone opens the Studio, reads it,
and switches on *Approved for the website*.

One thing built in on purpose: the Google button is shown to **everyone**,
before they pick a rating. Screening people by rating and only sending the
happy ones to Google is called review gating, Google prohibits it, and it is
the single most common way a firm gets its reviews wiped.

---

## Two settings to fill in

Studio → **Site Settings → Contact → Reviews**:

| Field | Where to get it |
|---|---|
| Write-a-review link | Business Profile → **Ask for reviews**. Looks like `https://g.page/r/XXXXXXXX/review` and opens the review box in one tap. |
| Link to the Google profile | The Maps listing URL. |

Until the first is set, the buttons fall back to a Google search for the firm —
it works, it just costs the client an extra tap, and every extra tap loses
people.

---

## The automatic sync

`scripts/sync-google-reviews.mjs` pulls every review and reply straight from
her Business Profile into Sanity. It is written, tested against its failure
paths, and does nothing until credentials exist.

### Why it is not running yet

Two Google APIs return reviews and only one is usable:

| | Places API | Business Profile API |
|---|---|---|
| Reviews returned | **5, maximum** | all of them |
| Storing them | **forbidden** by the terms | fine, it is your own data |
| Owner replies | no | yes |
| Approval needed | no | **yes** |

The Places API is a dead end — it cannot fill this page and cannot write to a
CMS. So it is the Business Profile API, and that one is not enabled by
default. New Cloud projects start at zero quota until Google approves an
access-request form, which takes **a few days to a few weeks**.

### Getting approved

1. Create a project at `console.cloud.google.com`
2. Enable **My Business Account Management API** and **My Business Business
   Information API**
3. Fill in Google's Business Profile APIs access request form, signed in as the
   account that owns the profile. It asks what you are building — "displaying
   our own reviews on our own website" is exactly the use case they approve.
4. Wait for the approval email. Quota stays at zero until it arrives.
5. Create an OAuth client (Web application), consent as the profile owner once,
   and keep the refresh token.

### Then

Add to `.env.local` (gitignored):

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_LOCATION_NAME=accounts/123456/locations/789012
```

`GOOGLE_LOCATION_NAME` comes from the account-management API's
`accounts.locations.list`.

```bash
node scripts/sync-google-reviews.mjs           # preview
node scripts/sync-google-reviews.mjs --apply   # write
```

It matches on Google's review id, so re-running updates rather than
duplicates, and it adopts the hand-seeded reviews on its first pass instead of
creating a second copy of each. **It never deletes.** A review that vanishes
from Google is reported and left alone for a person to decide about.

Once it works, put it on a schedule — a daily run is plenty.

### If waiting for approval is not acceptable

Third-party services read reviews without the approval step: Featurable (free,
has a JSON API), Trustindex, EmbedSocial, Elfsight. Point one at the profile
and it returns the reviews as JSON, which this site can render in its own
design rather than in their widget. It is a dependency and a monthly bill for
most of them, and the Business Profile API is free and permanent — but it is
there if two weeks is too long.

---

## One legal note

New Jersey treats client testimonials as attorney advertising under RPC 7.1,
and reviews describing outcomes are results claims. Every place reviews render
carries the prior-results disclaimer already, and `/reviews` shows it beneath
the grid.

Two things worth not doing:

- **No incentives, ever.** Not a discount, not a gift card, not a fee
  reduction. RPC 7.2 prohibits giving anything of value for a recommendation
  and Google deletes incentivised reviews and can suspend the profile.
- **Don't confirm a representation in a public reply.** Her existing replies
  are warm and general, which is right. `GOOGLE-REVIEWS.md` has safe wording
  for a bad review, which is where the instinct to defend causes trouble.
