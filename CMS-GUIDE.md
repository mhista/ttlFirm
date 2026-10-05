# Editing the site in Sanity

Everything on the site is now editable in the Studio. Colours, fonts and
spacing stay in code on purpose — they're the brand, not content.

Run the Studio with `cd sanity && npx sanity dev`, or use the hosted Studio if
you've deployed it.

---

## First: import the starter content

The legal pages and the two campaign landing pages ship as import files so they
arrive in the Studio already written, rather than as empty documents.

```bash
node scripts/seed-content.mjs
cd sanity
npx sanity dataset import ../seed/legal-pages.ndjson production --replace
npx sanity dataset import ../seed/landing-pages.ndjson production --replace
```

The documents use fixed IDs, so re-running with `--replace` updates them
instead of creating duplicates. Until you import, the legal pages render from a
hard-coded copy of the same wording — the site is never blank, it just isn't
editable yet.

---

## Where everything lives

| What you want to change | Where |
|---|---|
| Headline, description, bullets in the hero | Homepage → Hero |
| The hero video and the "Watch our film" video | Homepage → Hero Video & Images |
| Whether desktop plays a video or shows photographs | Homepage → Hero Video & Images → Desktop Hero Background |
| The photographs behind the desktop hero | Homepage → Hero Video & Images → Desktop Photos |
| Hiding the film player beside the hero copy | Homepage → Hero Video & Images → Show the film player… |
| The four figures under the hero | Homepage → Stats Strip |
| Any section heading or button on the homepage | Homepage → Sections |
| Turn a homepage section off, or reorder them | Homepage → Sections → each section's toggle, and Section Order |
| Phone, email, address | Site Settings → Contact |
| Menu items and dropdowns | Site Settings → Navigation |
| Footer blurb, CTA bar, credit line | Site Settings → Footer |
| The attorney advertising and SMS small print | Site Settings → Footer → Legal Notices |
| The SMS consent checkbox wording | Site Settings → SMS & Widget |
| The "Text us!" widget copy, or switching it off | Site Settings → SMS & Widget → Text Us Widget |
| Social media links | Site Settings → Contact → Social Media Links |
| Privacy Policy, Terms, Disclaimer | ⚖️ Legal Pages |
| Campaign landing pages | 🎯 Landing Pages |
| Practice areas and sub-services | Services |
| Blog posts, authors, categories, tags | Blog |
| Client testimonials | Testimonials |

Leaving a field empty is safe — the site falls back to what's currently shipped
rather than rendering a blank space. That's deliberate: nothing on the page can
be accidentally deleted into nothing.

---

## The hero video

Upload under **Homepage → Hero Video & Images**.

Phones and desktop use different files, because a phone screen is portrait and a
desktop screen is not. The same footage cropped for one looks wrong on the other.

**Phones and tablets**

- **Background Loop — phones** — portrait 9:16, silent, 15–30 seconds
- **Video Poster — phones** — the still shown while it loads

**Desktop**

- **Desktop Hero Background** — play the wide video, or show photographs instead
- **Background Loop — desktop** — landscape 16:9, 1920×1080 or better, silent
- **Video Poster — desktop** — the wide still shown while it loads
- **Start at / Stop at (seconds)** — see below
- **Desktop Photos** — used when you pick photographs. One is a still hero;
  several cross-fade in a loop. **Seconds per photo** sets the pace
- **Show the film player beside the hero copy** — the framed portrait player on
  the right. Switch it off for a plain full-width hero

**Everywhere**

- **Full Film** — what opens when someone presses "Watch our film". Any length,
  keeps its sound

### You do not have to cut the video first

Upload the whole film if that is what you have, then set **Start at** and **Stop
at** to the good stretch. The site plays only that stretch, and cross-fades the
loop point instead of cutting to it, so it does not visibly restart. Fifteen
seconds is plenty.

### If you have no landscape footage

Switch **Desktop Hero Background** to photographs and add three or four good
wide stills. The hero still moves, and nobody has to shoot anything. Keep the
subject right of centre — the headline sits on the left.

### Specs to ask her for

16:9 landscape, 1920×1080 or better, MP4, no text or logo burned in, evenly lit,
slow steady shots, and framed so the left third stays clear. Send as a file via
Drive or WeTransfer, **not WhatsApp**, which recompresses and rotates.

---

## Landing pages

**🎯 Landing Pages** in the Studio. These are for paid ads, not the website.
They live at `/lp/<url>`, carry no menu and no footer links, and have one
action: the form.

Two are ready to go:

- `/lp/nj-car-accident-lawyer`
- `/lp/injured-at-work-nj`

To make another: duplicate one of them, change the URL, rewrite the hero to
match the ad, and switch **Published** on.

**Build a page by stacking sections.** Available blocks:

| Block | Use it for |
|---|---|
| Hero | Headline, bullets and the form. Every page needs one |
| Trust Bar | Four figures across a navy strip |
| Proof Points | The "why us" grid |
| How It Works | Three numbered steps |
| Testimonials | Pick specific client testimonials |
| FAQ | Accordion. Also generates FAQ schema for Google |
| Text Block | Free rich text |
| Closing CTA | Final push before the page ends |
| Form Section | A second form further down for long pages |

Two settings worth understanding:

- **Tracking Phone Number** — set a different number per campaign and you can
  tell which ad produced which call.
- **Hide From Google** — leave ON for ad pages. It stops them competing with the
  main site for the same search terms.

Use `#lead-form` as a button link to scroll to the form on the same page.

---

## The legal pages — read this before editing

These are compliance documents. The carrier registration for text messaging was
submitted against them.

**Do not change the URLs.** `privacy-policy`, `terms-and-conditions` and
`disclaimer` are the links the registration points at.

**Do not remove these, anywhere:**

- "Reply STOP to opt out" and "Reply HELP for help"
- "Message and data rates may apply" and "Message frequency varies"
- "No mobile opt-in or text message consent will be shared with third parties or affiliates"
- "Consent is not a condition of purchasing services, retaining the firm, or receiving legal services"
- "Carriers are not liable for delayed or undelivered messages"
- The statement that contacting the firm does not create an attorney-client relationship

The same applies to the consent checkbox in **Site Settings → SMS & Widget**. It
must stay **optional** and **unchecked by default** — either change fails the
carrier review.

That checkbox now has two pieces of wording:

- **Short Line (always visible)** — the sentence beside the checkbox. It has to
  carry the firm name, that consent is not a condition of service, that message
  and data rates may apply, that frequency varies, and STOP / HELP. Do not trim
  any of those out of it.
- **Full Consent Wording** — the complete approved paragraph, shown when someone
  opens "Full SMS terms" underneath. It is on the page either way; opening it
  only expands it.

Both are on screen at the moment of opt-in, which is what the rule requires. The
split exists so the form does not open with ten lines of small print above the
button.

Update **Last Updated** whenever you revise a document.

Each section has an **Anchor**, which is the `#link` for the contents rail on the
left. Leave existing anchors alone so links people have already shared keep
working.

---

## Section order on the homepage

**Homepage → Sections → Section Order.** Drag to reorder. Anything left out of
the list falls back to the default order. The hero is always first.

To hide a section, use its own **Show Section** toggle rather than removing it
from the order — that way the content is still there when you want it back.
