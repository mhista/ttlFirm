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
  { href: "/blog", label: "Blog" },
];

export const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export const FIRM = {
  name: "The Turuchi Law Firm",
  shortName: "Turuchi Law Firm",
  phoneDisplay: "732-210-6410",
  phoneHref: "+17322106410",
  email: "info@turuchilawfirm.com",
  addressLine1: "111 Town Square Pl, Ste 1238 #492165",
  addressLine2: "Jersey City, NJ 07310",
  mapsUrl:
    "https://maps.google.com/?q=111+Town+Square+Pl+Jersey+City+NJ+07310",
};

/**
 * The offices, as shipped. Anything in Site Settings → Contact replaces this
 * entirely — it is only here so a fresh install is never address-less.
 */
export const FIRM_OFFICES = [
  {
    label: "Jersey City",
    note: "By appointment only",
    street: "111 Town Square Pl, Ste 1238 #492165",
    city: "Jersey City",
    state: "NJ",
    zipCode: "07310",
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
