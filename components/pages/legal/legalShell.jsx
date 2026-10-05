"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { FIRM, telHref } from "@/lib/siteNav";
import { useSiteSettings } from "@/lib/siteSettingsContext";

/**
 * Shared shell for /privacy-policy, /terms-and-conditions and /disclaimer.
 * Provides the sticky contents rail, scroll-spy, and the contact card that
 * every one of these documents has to end with.
 */
const LegalShell = ({
  sections = [],
  effectiveDate,
  lastUpdated,
  children,
  related = [],
  showContactCard = true,
  contactCardHeading = "Questions about this policy?",
}) => {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const siteSettings = useSiteSettings();

  const contact = siteSettings?.contact || {};
  const phone = contact.phone || FIRM.phoneDisplay;
  const email = contact.email || FIRM.email;
  const addressLines = contact.address?.street
    ? [
        contact.address.street,
        [contact.address.city, [contact.address.state, contact.address.zipCode].filter(Boolean).join(" ")]
          .filter(Boolean)
          .join(", "),
      ].filter(Boolean)
    : [FIRM.addressLine1, FIRM.addressLine2];

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
      {/* ------------------------------------------------------------- Rail */}
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-xl border border-surface-line bg-surface-alt p-5">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy-800">
              On this page
            </p>
            <nav className="mt-4">
              <ul className="space-y-1 border-l border-surface-line">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={[
                        "-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-colors",
                        activeId === s.id
                          ? "border-accent-500 font-semibold text-navy-900"
                          : "border-transparent text-ink-muted hover:border-navy-300 hover:text-navy-800",
                      ].join(" ")}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {related.length > 0 && (
            <div className="mt-4 rounded-xl border border-surface-line p-5">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy-800">
                Related
              </p>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="text-[13px] link-accent">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showContactCard && (
          <div className="mt-4 rounded-xl bg-navy-900 p-5 text-white">
            <p className="font-display text-lg font-bold">{contactCardHeading}</p>
            <ul className="mt-4 space-y-3 text-[13px]">
              <li>
                <a
                  href={telHref(phone)}
                  className="flex items-start gap-2.5 text-navy-100 transition-colors hover:text-accent-400"
                >
                  <FaPhone className="mt-0.5 text-[11px] text-accent-400" aria-hidden="true" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-2.5 break-all text-navy-100 transition-colors hover:text-accent-400"
                >
                  <FaEnvelope className="mt-0.5 text-[11px] text-accent-400" aria-hidden="true" />
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-navy-100">
                <FaLocationDot className="mt-0.5 text-[11px] text-accent-400" aria-hidden="true" />
                <span>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
          )}
        </div>
      </aside>

      {/* ------------------------------------------------------------- Body */}
      <div className="lg:col-span-8 xl:col-span-9">
        <div className="mb-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-surface-line pb-6 text-[13px] text-ink-soft">
          {effectiveDate && (
            <p>
              <span className="font-semibold text-navy-800">Effective date:</span> {effectiveDate}
            </p>
          )}
          {lastUpdated && (
            <p>
              <span className="font-semibold text-navy-800">Last updated:</span> {lastUpdated}
            </p>
          )}
        </div>

        <div className="legal-doc">{children}</div>
      </div>
    </div>
  );
};

export default LegalShell;
