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

There are now TWO masters of the same shoot, because a phone and a desktop want opposite crops:

| | |
|---|---|
| `hero-loop.mp4` | **Portrait 576 × 1024**, silent, 28s, 2.4 MB. Phones and tablets. |
| `hero-loop-wide.mp4` | **Landscape 704 × 464**, silent, 12.6s, 1.4 MB. Desktop. |
| `hero-poster.jpg` / `hero-poster-wide.jpg` | First frame of each, shown until the video can play |
| `hero-backdrop-wide.jpg` | Wide still of the attorney — the desktop background when the video is switched off |
| `turuchi-law-firm-film.mp4` | The full 62s film with audio, 8.5 MB. Plays in the modal |
| `film-poster.jpg` | Poster for the modal |

All encodes bake the rotation into the pixels (`rotate=0` metadata) rather than relying on the
rotation flag, because some browsers and CDNs ignore it and would play the film sideways. Both of
her exports arrived over WhatsApp with `rotation=-90` set.

### The landscape cut

The wide file she sent is 704 × 464 — under 720p, and WhatsApp squeezed it to 885 kbps. It is
usable full-bleed under a scrim, and it is what is shipped, but **the original export is almost
certainly 1080p and would be a visible improvement**. Ask for it as a file, not through WhatsApp.

The loop is three calm, wide takes dissolved together — 15–19.5s, 24–29.8s and 54–58.5s of the
source — and then the tail is dissolved back over the head so the loop point is invisible. The
aerial shot at 20–23s has the firm's logo burned into it and the close-ups at 30–34s are very
dark; neither belongs behind a headline.

### How it's used

- **Below `lg`** — the portrait loop is the full-bleed background. A phone viewport is itself
  portrait, so 9:16 fills it with almost no crop.
- **At `lg` and up** — the landscape loop is the full-bleed background, at full opacity with no
  blur, under `.hero-scrim-film`. That scrim is deliberately light — two stacked gradients that
  keep the left third dark enough for a white headline while the right side opens up and lets the
  footage through. A hero video you cannot see is not a hero video.
- **Either way** — the `WatchFilmButton` in the hero action row opens the full film with sound and
  native controls in a modal (`components/common/filmPlayer.jsx`).

The framed vertical player (`FilmCard`) stays on the right of the desktop hero whichever
background is running. The loop behind it is silent and has no controls, so the card is where a
visitor who wants the actual film — with sound — goes.

There is a second entry point further down: `FilmTile` in `filmPlayer.jsx` drops into the "Why
Trust Us" grid. That grid is three across and the Studio decides how many features there are, so
whenever the count doesn't divide by three there was a hole in the last row; the tile fills it, in
the same glass frame as its neighbours. With a count that already fills the row it stays out
rather than opening a new hole. It is an image and a button, not a player — a second autoplaying
video that far down the page would cost phone bandwidth for something few people reach.

### Looping an arbitrary upload

The file shipped with the site was cut to loop seamlessly. Anything uploaded through the Studio
will not have been — it will be the whole film, cutting hard back to frame one every pass, very
likely with a title card or a dark stretch in it. `ambientVideo.jsx` handles that in the browser,
so nobody has to re-encode anything:

- **Two video elements share the source.** As the visible one nears the end of the clip, the other
  is seeked back to the start, started, and cross-faded in over 0.9s. The jump-cut becomes a
  dissolve. The second element only decodes during the handover.
- **Start at / Stop at (seconds)** play only a chosen stretch. Fifteen good seconds of a
  two-minute film can be used without touching the file.

Both are automatic for an uploaded video and off for the shipped one, which does not need them.

### Switching desktop to photographs

**Homepage → Hero Video & Images → Desktop Hero Background** chooses between the wide loop and
photographs. Phones always play the portrait loop, whichever is chosen.

**Desktop Photos** is a list. One photo is a still hero; several cross-fade on a timer
(`imageLoop.jsx`, **Seconds per photo**, default 6). Every image is in the DOM from the start and
switched by opacity — swapping a `src` makes the browser fetch mid-fade and the first cycle
flashes white on a slow connection. Only the first is eager; the timer stops while the tab is
hidden; `prefers-reduced-motion` gets the first photo and no timer.

This is the escape hatch for whenever the wide footage on hand is the wrong shape or too soft for
full bleed: three or four good stills still give a hero with movement in it. Three frames from the
same shoot ship as the default, so switching it on looks finished before anyone uploads anything.

### The framed player

**Homepage → Hero Video & Images → Show the film player beside the hero copy** switches the
portrait card on the right of the desktop hero on and off. "Watch our film" stays in the action
row under the copy either way, so the film is never more than one press away.

The card is **paused by default** — it is an `<img>` of the poster with a play control over it, so
the film is never downloaded by someone who does not ask for it. Pressing it opens the modal with
sound, and **the background loop stops while the film is playing**: two clips of the same person
moving at once, one of them with sound, is confusing, and it is wasted decoding besides.
`FilmProvider` publishes `isOpen` for this, and `HeroMedia` passes it to `AmbientVideo` as
`paused`.

### If she supplies better landscape footage

Upload it to **Homepage → Hero Video & Images → Background Loop — desktop**. Specs to give her:

- Landscape 16:9, **1920 × 1080 minimum**, MP4 / H.264, 24 or 30 fps
- 15–30 seconds for the loop; send the long cut separately for the modal
- No text or logo burned in — the site puts its own headline over it
- Slow, steady shots; bright and evenly lit
- **Keep the left third of the frame clear** — headline and buttons live there
- Send as a file via Drive / WeTransfer, **not over WhatsApp**, which recompresses and rotates

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

### Why it is an accordion

The full approved paragraph plus the helper text ran to about ten lines on a phone, which pushed
the submit button off the bottom of the screen and made the form read as paperwork. The block is
now split:

- A **short line beside the checkbox**, always visible, carrying every element a reviewer looks
  for: the firm name, that consent is not a condition of service, that message and data rates may
  apply, that frequency varies, and STOP / HELP. The Privacy Policy and Terms links sit on the
  line under it, also always visible.
- The **full approved wording plus the third-party statement** behind a "Full SMS terms"
  disclosure. It is rendered at all times and only collapsed by height, so it is in the page
  source and in the accessibility tree whether or not anyone opens it. It carries `inert` while
  collapsed so its links are not focus traps.

Every disclosure is therefore present at the point of opt-in, which is what the rule requires —
nothing is loaded on demand or hidden behind a page change. Both strings are editable in
**Site Settings → SMS & Widget** (*Short Line* and *Full Consent Wording*).

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

## 8b. Motion

The pages sat completely still, and it was not deliberate. Markup all over the project still
carried `data-aos="fade-up"` attributes, and `whyChooseUs.jsx` and `TailoredCTA.jsx` were both
calling `AOS.init()` — but nobody had ever imported `aos/dist/aos.css`, and AOS's transforms live
in that stylesheet. Every one of those attributes was inert.

Rather than wire the library back up (it ships its own CSS, re-measures on every resize and
animates by mutating inline styles, all of which fights the App Router), motion is now two small
files sharing one set of CSS rules:

| | |
|---|---|
| `components/common/reveal.jsx` | `<Reveal>` / `useInView()` — for React components |
| `components/common/motion.jsx` | one document-wide observer that drives `data-aos` attributes, so the existing markup animates unchanged |
| `components/common/countUp.jsx` | the counting statistics |

`aos` is off the dependency list.

**The rules.** 14px of travel over 0.6s, once, on the way down only. Anything larger on a law firm
site reads as a template rather than as craft, and anything that re-animates on the way back up
reads as a bug. Supported: `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom-in`,
plus `data-aos-delay` for staggering a row.

**Nothing is ever hidden without JavaScript.** All the hiding rules are scoped to `.js-motion`, a
class an inline script in `app/layout.jsx` sets before the body is parsed. No JS — a crawler, a
blocked bundle, an old browser — means the class is absent and the page simply does not animate.
`prefers-reduced-motion` shows the finished state immediately. There is also a 1.2s failsafe in
`motion.jsx` that reveals anything still hidden but on screen. Content that sells legal services
must never depend on an animation completing.

**Counting statistics.** The homepage hero strip, the "Why Trust Us" stat cards and the landing
page trust bar count up when they scroll into view. `countUp.jsx` takes the finished string the CMS
holds — `500+`, `$0`, `24/7` — and animates only the first run of digits, so an editor never has to
think about prefixes and suffixes. It renders the *final* figure on the server and drops to zero in
a layout effect, before paint: if the bundle never runs, the visitor sees `500+`, not `0+`.

The old `countdown.jsx` counted with `setInterval` from 1 at a fixed 10ms step, which meant 500
cases took five seconds and the number was still climbing long after most people had scrolled past.
It is kept as a thin wrapper on the new component so nothing that imports it breaks.

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
