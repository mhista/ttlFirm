"use client";
import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { socialLinks, buildSocialLinks } from "@components/common/mediaButtons";
import { useSiteSettings } from "@/lib/siteSettingsContext";
import { FIRM, telHref } from "@/lib/siteNav";

/**
 * Utility bar that sits above the main navigation.
 * Was solid amber; it is now the deepest navy in the palette so the accent
 * colour is spent on actions rather than on a decorative strip.
 * Hidden below `sm` — on a phone the same details live in the menu drawer
 * and the sticky call button.
 */
const Nav = () => {
  const siteSettings = useSiteSettings();
  const contact = siteSettings?.contact || {};
  const email = contact.email || FIRM.email;
  const phone = contact.phone || FIRM.phoneDisplay;
  const links = buildSocialLinks(siteSettings?.social);

  return (
    <nav aria-label="Secondary" className="absolute inset-x-0 top-0 z-50 w-full">
      <div className="hidden border-b border-white/10 bg-navy-950 sm:block">
        <div className="container-x flex h-11 items-center justify-between">
          {/* Social */}
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-[13px] text-navy-200 transition-colors hover:bg-white/10 hover:text-accent-400"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>

          {/* Contact */}
          <div className="flex items-center gap-6 text-[13px] text-navy-100">
            <a
              href={telHref(phone)}
              className="flex items-center gap-2 transition-colors hover:text-accent-400"
            >
              <FaPhone className="text-[11px] text-accent-400" aria-hidden="true" />
              <span>{phone}</span>
            </a>
            <span className="h-3.5 w-px bg-white/20" aria-hidden="true" />
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 transition-colors hover:text-accent-400"
            >
              <FaEnvelope className="text-[11px] text-accent-400" aria-hidden="true" />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
