// Single source of truth for navigation, practice areas and legal links.
// The firm now practises in TWO areas only — personal injury and workers'
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

// Slugs the firm no longer practises. Sanity may still hold these documents
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

/** Turns whatever the CMS holds into a `tel:` safe string. */
export const telHref = (phone) =>
  `tel:${String(phone || FIRM.phoneHref).replace(/[^\d+]/g, "")}`;
