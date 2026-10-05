# Getting more Google reviews

> "Also guys I need more Google reviews. Is there a way to get more reviews?"

Short answer: yes, and it is almost entirely about **asking at the right
moment with a link that takes one tap**. Nothing on the website can generate a
review — Google only counts reviews left on the Business Profile — so this is a
process for the firm, and the site's job is to make the link easy to reach.

There is one hard rule first, because it is the one that gets firms in
trouble.

---

## What New Jersey lawyers may not do

- **No payment, gift cards, discounts or fee reductions for a review.** RPC 7.2
  prohibits giving anything of value for a recommendation, and Google's own
  policy bans incentivised reviews outright — they delete them and can suspend
  the profile.
- **No reviews written by anyone but the client**, including staff, family or
  an agency. Google detects this and it is also a 7.1 misrepresentation issue.
- **No "only ask the happy ones"** (review gating — screening clients and
  sending only the satisfied ones to Google). Google explicitly prohibits it.
  Ask everyone.
- **Don't confirm anyone is a client in your reply.** A public reply that
  reveals a representation is a confidentiality problem under RPC 1.6, even
  when the reviewer revealed it themselves. Safe replies are below.

Everything that follows stays inside those lines.

---

## 1. The profile already exists — correcting an earlier note

An earlier version of this file said the firm had no Google Business Profile
and that claiming one was step zero. That was wrong, and it mattered, so it is
corrected here rather than quietly edited away.

The profile is live and verified: **The Turuchi Law Firm, LLC**, 5.0 stars from
17 reviews, hours set to Open 24 hours, with replies posted to nearly every
review. The name already matches what she asked the search result to say.

What "my address is not on Google" actually means, then, is that the profile is
set up without a public street address — which is a normal and deliberate
choice for a firm that does not want walk-ins, and it does not stop anyone
leaving a review. Nothing needs claiming. Skip to the next step.

## 2. Get the review link

Once verified: Business Profile → **Ask for reviews** → copy the short link.
It looks like `https://g.page/r/XXXXXXXX/review` and opens the review box
directly, already signed in on a phone, with the star selector showing.

Send that link. Do **not** send "look us up on Google" — every extra step
loses roughly half the people.

Give it to me when she has it and I will add it to the site: a "Leave a
review" link in the footer, on the thank-you page after a form submission, and
as a one-tap button she can text.

---

## 3. When to ask

Timing beats persistence. The moment matters more than the wording.

| Moment | Why it works |
|---|---|
| The day the settlement cheque clears | Peak gratitude, and it is the outcome they will describe |
| Right after a call where they say thank you | They have just told her; ask her to write it down |
| When a case closes well, even a small one | Volume comes from the ordinary cases, not the big ones |
| After she gets someone's medical bills reduced | Clients feel this one strongly |

Ask **once**, then once more a week later if nothing came. Never a third time.

---

## 4. What to send

By text, right after the call — this is the version that actually gets used,
because it takes the client fifteen seconds:

> Hi [name], it was a pleasure working with you. If you have a minute, a short
> Google review helps other injured people in New Jersey find the firm. It
> takes about 30 seconds: [link]
> — Turuchi

By email, when a matter closes:

> **Subject:** One small favour
>
> Hi [name],
>
> Thank you for trusting the firm with your case. Most people who find us are
> looking for someone they can trust with something stressful, and a few
> sentences from someone who has been through it is the most useful thing they
> can read.
>
> If you would be willing, here is the link — it takes under a minute:
> [link]
>
> No obligation at all, and thank you either way.
>
> Turuchi S. Iheanachor, Esq.
> The Turuchi Law Firm, LLC

A tip that measurably improves the reviews she gets: ask for **one specific
thing**. "If you write anything, mentioning what the process was like would
help more than anything else." Reviews that describe the experience convert
far better than "great lawyer, 5 stars."

---

## 5. Make it a habit, not a campaign

The firms with 200 reviews are not running campaigns. They send the link every
single time a case closes. Two practical ways to make that automatic:

- Save the text message above as a **phone shortcut / text replacement** so it
  is two taps.
- Add "send review link" to the case-closing checklist, next to sending the
  closing letter — so it happens without anyone remembering to do it.

Twelve closed cases a month at a 25% response rate is 36 reviews a year, which
is more than most firms in Essex County have.

---

## 6. Replying — carefully

Replying to every review raises the profile's ranking, and Google says so
explicitly. The catch is confidentiality: **do not confirm the person was a
client, and never discuss the matter.**

Safe reply to a good review:

> Thank you for the kind words — they mean a great deal.

Safe reply to a bad review (this is the one to get right, because the instinct
to defend is strong and is exactly what causes the bar complaint):

> Thank you for the feedback. Our professional obligations limit what we can
> say publicly, but we take every concern seriously and would welcome the
> chance to discuss it directly — please call the office at 732-210-6410.

Never: "you were never our client", "your case had no merit", any fact about
the matter. Several attorneys have been disciplined for exactly that.

If a review is fake or from someone with no connection to the firm, report it
through the profile (Google's bar is high, but it does sometimes work) — and
still leave the neutral reply above, because prospective clients read the
reply more closely than the review.

---

## 7. What the website already does

All three of these are built and live — see `REVIEWS.md` for the detail:

- [x] `/reviews` — all 17 reviews with the firm's replies, plus a
      **Leave a Google review** button shown to everyone
- [x] The same reviews feed the homepage testimonials carousel
- [x] `AggregateRating` structured data, computed from the reviews actually on
      the page — this is what can put gold stars in the search result
- [x] A form for leaving a review on the site, which arrives unapproved and
      is emailed to the office

Two things still need her:

- **The write-a-review link.** Business Profile → Ask for reviews → copy it
  into Studio → Site Settings → Contact → Reviews. Until then the buttons fall
  back to a Google search, which costs a tap.
- **The API approval**, if the reviews should sync themselves rather than being
  pasted in. `REVIEWS.md` walks through it.
