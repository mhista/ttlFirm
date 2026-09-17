// Single source of truth for navigation, practice areas and legal links.
// The firm now practices in TWO areas only — personal injury and workers'
// compensation. Immigration and municipal court were retired in the 2026
// rebuild; do not reintroduce them here.

export const PRACTICE_AREAS = [
  {
    slug: "personal-injury-lawyer-in-new-jersey",
    label: "Personal Injury",
    navLabel: "Personal Injury",
    blurb: "Car and truck accidents, slip and fall, wrongful death and other serious injury claims.",
    image: "/assets/images/inju.jpg",
  },
  {
    slug: "new-jersey-workers-compensation-attorney",
    label: "Workers' Compensation",
    navLabel: "Workers' Compensation",
    blurb: "Benefits, medical treatment and wage replacement for workers hurt on the job in New Jersey.",
    image: "/assets/images/work.jpg",
  },
];

// Slugs the firm no longer practices. Sanity may still hold these documents
// until they are unpublished in the Studio, so every list of practice areas
// is filtered through `filterRetiredAreas` before it renders.
export const RETIRED_PRACTICE_SLUGS = [
  "immigration-lawyer-in-new-jersey",
  "municipal-court-lawyer-in-new-jersey",
];

const RETIRED_NAME_PATTERN = /immigration|municipal/i;

/**
 * Drops retired practice areas from any CMS-driven list, matching on slug
 * first and falling back to the display name.
 */
export function filterRetiredAreas(areas = []) {
  return (areas || []).filter((area) => {
    const slug = area?.slug?.current ?? area?.slug ?? "";
    const name = area?.name ?? area?.title ?? "";
    if (RETIRED_PRACTICE_SLUGS.includes(slug)) return false;
    if (RETIRED_NAME_PATTERN.test(slug) || RETIRED_NAME_PATTERN.test(name)) return false;
    return true;
  });
}

export const MAIN_NAV = [
  { href: "/", label: "Home" },
  {
    href: "/practice",
    label: "Practice Areas",
    children: PRACTICE_AREAS.map((area) => ({
      href: `/practice/${area.slug}`,
      label: area.navLabel,
      blurb: area.blurb,
    })),
  },
  { href: "/profile", label: "Attorney Profile" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
];

export const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export const FIRM = {
  // The registered name, and what search results, schema.org and the legal
  // pages have to say. `shortName` is for places where the full legal name
  // would wrap awkwardly — the logo lockup, a breadcrumb, an email subject.
  name: "The Turuchi Law Firm, LLC",
  shortName: "The Turuchi Law Firm",
  phoneDisplay: "732-210-6410",
  phoneHref: "+17322106410",
  whatsapp: "848-228-6402",
  email: "info@turuchilawfirm.com",
  addressLine1: "3 Gateway Center, 12th Floor",
  addressLine2: "Newark, NJ 07102",
  mapsUrl:
    "https://maps.google.com/?q=3+Gateway+Center+Newark+NJ+07102",
};

/**
 * The offices, as shipped. Anything in Site Settings → Contact replaces this
 * entirely — it is only here so a fresh install is never address-less.
 *
 * Newark is the firm's physical office as of September 2026 and replaced the
 * Jersey City address outright — do not reintroduce Jersey City anywhere.
 */
export const FIRM_OFFICES = [
  {
    label: "Newark",
    street: "3 Gateway Center, 12th Floor",
    city: "Newark",
    state: "NJ",
    zipCode: "07102",
    country: "US",
  },
  {
    label: "Piscataway",
    street: "30 Knightsbridge Road, Suite 525",
    city: "Piscataway",
    state: "NJ",
    zipCode: "08854",
    country: "US",
  },
];

const mapsLink = (o) =>
  `https://maps.google.com/?q=${encodeURIComponent(
    [o.street, o.city, o.state, o.zipCode].filter(Boolean).join(" ")
  )}`;

/**
 * One place that turns whatever the CMS holds into offices the UI can render.
 *
 * The firm has more than one address, and the footer, the contact page and the
 * schema.org markup all need the same list in the same order — so they all ask
 * this rather than each re-deriving it from `contact.address`. `lines` is what
 * you print; `postal` is what goes into structured data.
 *
 * The primary address stays first: it is the one on the letterhead, and search
 * engines treat the first PostalAddress as the main location.
 */
export const getOffices = (contact) => {
  const primary = contact?.address?.street ? { ...contact.address } : null;
  const extra = (contact?.additionalOffices || []).filter((o) => o?.street);

  const offices = primary || extra.length ? [primary, ...extra].filter(Boolean) : FIRM_OFFICES;

  return offices.map((o) => ({
    label: o.label || o.city || "",
    note: o.note || "",
    lines: [
      o.street,
      [o.city, [o.state, o.zipCode].filter(Boolean).join(" ")].filter(Boolean).join(", "),
    ].filter(Boolean),
    mapsUrl: mapsLink(o),
    postal: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.city,
      addressRegion: o.state,
      postalCode: o.zipCode,
      addressCountry: o.country || "US",
    },
  }));
};

/** Turns whatever the CMS holds into a `tel:` safe string. */
export const telHref = (phone) =>
  `tel:${String(phone || FIRM.phoneHref).replace(/[^\d+]/g, "")}`;

/**
 * Builds a wa.me link, and the country code is the whole point.
 *
 * THE BUG THIS FIXES: the link was built as
 * `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`, which turned
 * "848-228-6402" into "8482286402" — ten digits, no country code. wa.me
 * requires a number in FULL INTERNATIONAL format, so WhatsApp read the
 * leading "84" as the country code (Vietnam), got a number that does not
 * exist, and told everyone who tapped it that the number was not found. The
 * number was always fine; the URL was not.
 *
 * So the digits are normalised before they go in the URL:
 *
 *   "+1 848 228 6402"  → 18482286402   already international, keep it
 *   "1-848-228-6402"   → 18482286402   11 digits starting with 1, keep it
 *   "848-228-6402"     → 18482286402   10 digits → North American, add the 1
 *   "+44 20 7946 0000" → 442079460000  any other + number passes through
 *
 * A number stored with a leading "+" is trusted as already international and
 * is never given a second country code. Anything else that is not a plain
 * 10- or 11-digit NANP number passes through untouched, on the basis that
 * guessing at it would be worse than leaving it alone.
 */
export const whatsappHref = (whatsapp, { defaultCountryCode = "1" } = {}) => {
  const raw = String(whatsapp || FIRM.whatsapp || "").trim();
  if (!raw) return null;

  const explicitlyInternational = raw.startsWith("+");
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;

  let number = digits;
  if (!explicitlyInternational) {
    if (digits.length === 10) number = `${defaultCountryCode}${digits}`;
    // 11 digits already starting with the country code needs nothing doing.
  }

  return `https://wa.me/${number}`;
};
