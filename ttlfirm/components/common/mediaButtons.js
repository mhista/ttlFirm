import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

// Icons inherit `currentColor` so the same list can sit on navy, on white or
// inside a button without a second copy of the file existing.
export const socialLinks = [
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61571838366851&mibextid=ZbWKwL",
    icon: <FaFacebookF aria-hidden="true" />,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://Instagram.com/theturuchilawfirm",
    icon: <FaInstagram aria-hidden="true" />,
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@theturuchilawfirm?_t=ZT-8tDXvEL25Bj&_r=1",
    icon: <FaTiktok aria-hidden="true" />,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/turuchi-iheanachor-esq-a01046156",
    icon: <FaLinkedinIn aria-hidden="true" />,
  },
];

const ICONS = {
  facebook: <FaFacebookF aria-hidden="true" />,
  instagram: <FaInstagram aria-hidden="true" />,
  tiktok: <FaTiktok aria-hidden="true" />,
  linkedin: <FaLinkedinIn aria-hidden="true" />,
  twitter: <FaXTwitter aria-hidden="true" />,
  youtube: <FaYoutube aria-hidden="true" />,
};

const LABELS = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  twitter: "X",
  youtube: "YouTube",
};

/**
 * Turns the `social` object from Site Settings into a renderable list.
 * Only platforms with a URL appear, so removing a URL in the Studio removes
 * the icon from the site. Falls back to the hard-coded list above when the
 * CMS has nothing, so the footer is never left with an empty row.
 */
export function buildSocialLinks(social) {
  if (!social) return socialLinks;

  const built = Object.keys(ICONS)
    .filter((key) => typeof social[key] === "string" && social[key].trim())
    .map((key) => ({
      key,
      label: LABELS[key],
      href: social[key].trim(),
      icon: ICONS[key],
    }));

  return built.length ? built : socialLinks;
}

export default socialLinks;
