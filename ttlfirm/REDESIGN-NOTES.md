# Turuchi Law Firm — 2026 Redesign & SMS Compliance

Handover notes for Innocent. Everything below is already in the codebase.

---

## 1. What changed at a glance

| Area | Before | After |
|---|---|---|
| Primary colour | `amber-600` orange | Navy (`navy-900 #0A2340`) |
| Accent | Orange everywhere | Amber `#D98324`, highlights only |
| Fonts | Lora + Jost | **Playfair Display + Inter** |
| Hero | Static image, 4 hard-coded heights | Autoplay video + poster fallback |
| Practice areas | 4 (incl. immigration, municipal) | **2** — personal injury, workers' comp |
| Legal pages | none | Privacy Policy, Terms & Conditions, Disclaimer |
| SMS consent | none | Optional unchecked checkbox on every form |
| Text widget | none | Bottom-right "Text us!" (ramlawnj.com style) |

---

## 2. Design system

**`tailwind.config.js`** now holds the whole palette. Nothing should hard-code a hex again.

- `navy-50 … navy-950` — primary. `navy-900` is the brand navy, `navy-950` the deepest (footer, scrims).
- `accent-300 … accent-700` — the firm's amber, kept as a **highlight only**. Never a page background.
  - `accent-500 #D98324` on navy or white
  - `accent-400 #E9A94A` for text on dark (passes AA on `navy-900`)
- `ink`, `ink-muted`, `ink-soft` — body text. `surface`, `surface-alt`, `surface-line` — backgrounds and borders.

**The rule that keeps it from reading orange:** one amber action per view. Everything else is
`.btn-navy` or `.btn-outline`. If a second amber button appears in a section, it's a bug.

**`styles/global.css`** holds the component classes: `.btn-primary`, `.btn-navy`, `.btn-outline`,
`.btn-outline-dark`, `.eyebrow`, `.h-section`, `.lede`, `.card`, `.card-glass`, `.field`,
`.legal-doc`, `.container-x`, `.section-y`. Old `.btn` / `.btn2` still exist as aliases onto the
new system so nothing broke mid-migration.

`font-lora` and `font-jost` are aliased to the new families in the Tailwind config, so any class
that got missed still renders in Playfair/Inter rather than falling back to a browser default.

---

## 3. Fonts

Loaded via `@import` at the top of `styles/global.css`.

I deliberately did **not** use `next/font/google`. It fetches at build time, and on a CI network
that blocks Google Fonts that becomes a hard build failure. If you're deploying somewhere with
reliable access (Vercel does), switching to `next/font` is a small upgrade and will shave a
render-blocking request — but it is not required.

**Do not add a raw `<head>` element to `app/layout.jsx`.** In the App Router it suppresses Next's
own metadata and viewport injection. I hit exactly this: the viewport meta silently vanished and
every page rendered at ~1560px on phones. There's a comment in the file warning about it.

---

## 4. Hero video

- `public/assets/video/hero-placeholder.mp4` — 18s, 1600×900, 1.3 MB, silent, looping. Generated
  from `public/assets/images/bg.jpg` with a slow ken-burns push-in.
- `public/assets/video/hero-poster.jpg` — first frame, shown until the video can play.

**When she supplies her own footage**, drop it in as `hero-placeholder.mp4` (or change the
`videoSrc` prop on `<Header>` in `app/page.jsx`) and export a matching poster frame. Target:
1600×900 or 1920×1080, H.264, **no audio**, under ~4 MB, 15–25 seconds, and shot so the
left third stays visually quiet — that's where the headline sits.

`components/common/heroMedia.jsx` skips the video entirely when the visitor has
`prefers-reduced-motion`, `saveData`, or a 2G connection, and falls back to the poster if autoplay
is refused. That matters: a personal-injury site gets heavy mobile traffic on cellular.

---

## 5. Immigration & municipal court — removal

Removed from code: footer links, nav, blog sidebar, page metadata and keywords, schema.org
service catalogs, sitemap, `app/manifest.js`, and all body copy. The dead
`models/practice_areas.js`, `components/layout/stick2.jsx` and
`components/common/practiceContainer.jsx` (which still held the old immigration copy and were
referenced by nothing) were moved to `_retired/`.

**Belt and braces:** `lib/siteNav.js` exports `filterRetiredAreas()` and `RETIRED_PRACTICE_SLUGS`.
Every list of practice areas runs through the filter, and
`/practice/immigration-lawyer-in-new-jersey` and `/practice/municipal-court-lawyer-in-new-jersey`
now return 404 even if the Sanity documents are still published.

### ⚠️ Still to do in Sanity Studio (not code)

Unpublish or delete these documents — I did not touch live CMS data:

1. `practiceArea` → **Immigration** and its sub-services
2. `practiceArea` → **Municipal Court Matters** and its sub-services
3. Site Settings / Homepage → any SEO copy still naming those areas
4. `testimonial` → the `caseType` options list still offers "Immigration" and "Municipal Court"
   (`sanity/schemaTypes/testimonial.js`) — harmless, but worth tidying
5. Redirect the old URLs to `/practice` in your host's redirect config, so existing Google
   results don't land on a 404

---

## 6. Compliance — Privacy Policy & Terms

Three new routes, all crawlable and in the sitemap, all linked from the footer on **every page**
(a standing RingCentral/TCR requirement):

- `/privacy-policy`
- `/terms-and-conditions`
- `/disclaimer`

### Against the Retainer Engine checklist

**Privacy Policy — all 10 items present.** Text is taken from the client's own document
essentially verbatim, so it stays attorney-approved.

| Item | Section |
|---|---|
| Information collected (incl. mobile numbers) | 1 |
| How information is used | 2 |
| SMS communications & message types | 3 |
| Sharing — "no mobile opt-in… shared with third parties" | 4 |
| Service providers | 4 |
| SMS consent voluntary | 3 |
| Privacy / security | 6 |
| Opt-out STOP / HELP | 8 |
| Policy updates | 12 |
| Contact information | 13 |

**Terms & Conditions — all 12 items present.** Her document only contained SMS Terms of Service,
so Part II is her text; **Part I (Website Terms of Use) is new and I drafted it.**

| Item | Section | Source |
|---|---|---|
| Website terms | 1, 4 | **new — needs her review** |
| No attorney-client relationship | 3 | **new — needs her review** |
| SMS program | 11 | her document |
| Message frequency varies | 12 | her document |
| Message & data rates may apply | 12 | her document |
| STOP / HELP | 12, 14 | her document |
| Carrier disclaimer | 16 | her document |
| Voluntary consent | 12, 13 | her document |
| Age requirement (18+) | 17 | her document |
| Link to Privacy Policy | 18 + inline | **new** |
| Changes to terms | 19 | her document |
| Contact information | 20 | **new** |

> **⚠️ Flag for the client.** I am not a lawyer. Part I of the Terms (acceptance, no legal
> advice, no attorney-client relationship, permitted use, IP, third-party links, attorney
> advertising, disclaimers, limitation of liability, New Jersey governing law) was **not** in the
> document she sent — I drafted it to satisfy the checklist. She must read and approve it before
> the A2P application goes in. The same goes for `/disclaimer`.
>
> Effective and last-updated dates are constants at the top of each page file
> (`EFFECTIVE_DATE`, `LAST_UPDATED`) — update them when she revises anything.

---

## 7. SMS consent capture

`components/common/smsConsent.jsx` is the single source of the consent UI. It appears on the
contact form and inside the Text Us widget, directly beneath the phone field.

**Do not change these three things — any of them fails carrier review:**

1. The checkbox is **optional** (no `required`)
2. It is **unchecked by default**
3. The consent text keeps the disclosures and the Privacy Policy link

`app/api/email/route.js` now records the consent as evidence in the notification email: the exact
consent language, a UTC timestamp, which form it came from, the IP address and the user agent.
The subject line is prefixed `[SMS OPT-IN]` when consent was given, and the body says
"do not text this number" when it wasn't. **Tell her to keep those emails** — that mailbox is the
consent record if a carrier ever audits.

While fixing the route I also removed a background "silent retry" that could never work: it ran in
a `setTimeout` after the response had already been returned (never guaranteed to execute on a
serverless runtime) and referenced an out-of-scope variable, so it threw every time.

---

## 8. Text Us widget

`components/common/textUsWidget.jsx` — teaser bubble → slide-out panel with name, mobile,
message and the consent checkbox, modelled on ramlawnj.com. Hidden on the three legal pages so it
never covers policy text a carrier reviewer is reading. Dismissal is remembered per session.

**It currently posts to `/api/email`**, so no enquiry is lost while A2P is pending. Once
RingCentral is approved, change the single `fetch` target in `submit()` — nothing else needs to
move.

---

## 9. Bugs fixed along the way

These were live on the site, not things I introduced:

- **Sticky nav floated over the middle of the page.** The old scroll handler toggled on a
  `scrollY < lastScrollY` comparison that fought itself during momentum scrolling. Rewritten
  around a simple threshold. This is what she was seeing in the screenshot.
- **Footer was `h-[1000px]` with absolutely positioned children** and overflowed on most phones.
  Rebuilt as a responsive grid that sizes itself.
- **`.main { width: 100vw }`** caused horizontal scroll whenever a scrollbar was present.
- **Homepage stat counters** were pinned with magic values (`top-[1230px] sm:top-[650px]…`) and
  drifted out of place at nearly every breakpoint. They're part of the hero component now.
- **`Section4` was `bg-amber-600 opacity-55`** — opacity on a parent washes out every child and
  can't be undone by them.
- **Blog sidebar linked to `/practice/1`…`/practice/4`** — numeric IDs from before the slug
  migration, so all four were 404s.
- **Sitemap listed the same four numeric practice URLs.**
- **Contact form** claimed a 10-minute cooldown while enforcing an hour, and every input carried
  `id="name"`, so labels pointed at the wrong field.
- **Profile/about portraits** were stretched by four conflicting hard-coded heights.
- Multiple `<h1>` per page on profile, about and practice detail (now exactly one each).
- MUI was pulled into the client bundle for three widgets on the contact form; removed.

Accessibility passes added: skip link, visible focus rings, real `<button>` elements, `aria-label`
on icon-only controls, body scroll lock and Escape-to-close on the mobile drawer, 48px minimum on
buttons, `prefers-reduced-motion` support.

---

## 10. Verified

`npm run build` — clean, 17 routes. Rendered and inspected at 1440px, 768px and 390px:
no horizontal overflow on any page, exactly one `<h1>` per page, no console errors, mobile drawer
and Text Us widget both working.

Verification ran against a stubbed Sanity client, because this sandbox can't reach
`apicdn.sanity.io`. **Run `npm run build` once on your machine with the real CMS connected**
before deploying — I couldn't exercise the live-content code paths.

Also worth doing on your side:

- `public/assets/images/work.jpg` is 500×334 and `inju.jpg` is 766×400. They're used as practice-card
  fallbacks at ~700px wide and look soft. Real Sanity images will override them, but replacing
  the files is 5 minutes.
- Google Search Console verification code in `app/layout.jsx` is still the placeholder
  `'your-google-verification-code'`.
- `next.config.mjs` uses the deprecated `images.domains`; `images.remotePatterns` is the
  replacement.

---

## 11. Rollback

`ttlfirm-pre-redesign-backup-20260909.tar.gz` sits one level above the project, containing every
source directory as it was before I started. The repo also had uncommitted changes on `master`
when I began — I left git alone entirely, so `git diff` shows my work alongside whatever was
already in progress.
