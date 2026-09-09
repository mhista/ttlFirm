import { FaInstagram, FaTiktok, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

// Icons inherit `currentColor` so the same list can sit on navy, on white or
// inside a button without a second copy of the file existing (there used to
// be two: mediaButtons.js and mediaButttons2.js).
export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61571838366851&mibextid=ZbWKwL",
    icon: <FaFacebookF aria-hidden="true" />,
  },
  {
    label: "Instagram",
    href: "https://Instagram.com/theturuchilawfirm",
    icon: <FaInstagram aria-hidden="true" />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@theturuchilawfirm?_t=ZT-8tDXvEL25Bj&_r=1",
    icon: <FaTiktok aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/turuchi-iheanachor-esq-a01046156",
    icon: <FaLinkedinIn aria-hidden="true" />,
  },
];

export default socialLinks;
