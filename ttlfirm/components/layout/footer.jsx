"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot, FaArrowRightLong } from "react-icons/fa6";
import { socialLinks } from "@components/common/mediaButtons";
import { useSiteSettings } from "@/lib/siteSettingsContext";
import { PRACTICE_AREAS, LEGAL_LINKS, FIRM, telHref } from "@/lib/siteNav";

/**
 * Footer.
 *
 * Rebuilt from a fixed-height (`h-[1000px]`) block with absolutely positioned
 * children — which overflowed on any phone whose content didn't happen to fit
 * — into a plain responsive grid that sizes itself.
 *
 * Carries the Privacy Policy and Terms links on every page, which is a
 * standing requirement of the RingCentral / TCR A2P registration.
 */
const Footer = () => {
  const year = new Date().getFullYear();
  const siteSettings = useSiteSettings();
  const contact = siteSettings?.contact || {};

  const phone = contact.phone || FIRM.phoneDisplay;
  const email = contact.email || FIRM.email;

  const addressLines = contact.address?.street
    ? [
        contact.address.street,
        [
          contact.address.city,
          [contact.address.state, contact.address.zipCode].filter(Boolean).join(" "),
        ]
          .filter(Boolean)
          .join(", "),
      ].filter(Boolean)
    : [FIRM.addressLine1, FIRM.addressLine2];

  const mapsUrl = contact.address?.street
    ? `https://maps.google.com/?q=${encodeURIComponent(
        [
          contact.address.street,
          contact.address.city,
          contact.address.state,
          contact.address.zipCode,
        ]
          .filter(Boolean)
          .join(" ")
      )}`
    : FIRM.mapsUrl;

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/practice", label: "Practice Areas" },
    { href: "/profile", label: "Attorney Profile" },
    { href: "/about", label: "About the Firm" },
    { href: "/blog", label: "Legal Insights" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-navy-950 text-navy-100">
      {/* ------------------------------------------------------------ CTA bar */}
      <div className="border-b border-white/10 bg-navy-900">
        <div className="container-x flex flex-col items-center gap-5 py-9 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-[1.75rem]">
              Injured in New Jersey? Let&rsquo;s talk today.
            </h2>
            <p className="mt-1.5 text-sm text-navy-200">
              Free consultation. No fee unless we recover for you.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={telHref(phone)} className="btn-primary whitespace-nowrap">
              <FaPhone className="text-xs" aria-hidden="true" /> {phone}
            </a>
            <Link href="/contact" className="btn-outline whitespace-nowrap">
              Request a Case Review
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------- Main grid */}
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Image
            src="/assets/images/logo.png"
            width={160}
            height={80}
            alt="The Turuchi Law Firm"
            className="h-16 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">
            A New Jersey firm representing injured people and injured workers.
            Every case is handled personally by an attorney who has sat on the
            insurance company&rsquo;s side of the table and knows how they value a
            claim.
          </p>
          <ul className="mt-6 flex items-center gap-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-sm text-navy-200 transition-colors hover:border-accent-400 hover:bg-white/5 hover:text-accent-400"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Practice areas */}
        <nav aria-labelledby="footer-practice" className="lg:col-span-3">
          <h3 id="footer-practice" className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white">
            Practice Areas
          </h3>
          <span className="mt-3 block h-px w-9 bg-accent-500" aria-hidden="true" />
          <ul className="mt-5 space-y-3.5">
            {PRACTICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/practice/${area.slug}`}
                  className="group inline-flex items-center gap-2 text-sm text-navy-200 transition-colors hover:text-accent-400"
                >
                  <FaArrowRightLong
                    className="text-[10px] text-accent-500 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  {area.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation */}
        <nav aria-labelledby="footer-nav" className="lg:col-span-2">
          <h3 id="footer-nav" className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white">
            Explore
          </h3>
          <span className="mt-3 block h-px w-9 bg-accent-500" aria-hidden="true" />
          <ul className="mt-5 space-y-3.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-navy-200 transition-colors hover:text-accent-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white">
            Contact
          </h3>
          <span className="mt-3 block h-px w-9 bg-accent-500" aria-hidden="true" />
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={telHref(phone)}
                className="flex items-start gap-3 text-navy-200 transition-colors hover:text-accent-400"
              >
                <FaPhone className="mt-1 shrink-0 text-xs text-accent-500" aria-hidden="true" />
                <span>{phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="flex items-start gap-3 break-all text-navy-200 transition-colors hover:text-accent-400"
              >
                <FaEnvelope className="mt-1 shrink-0 text-xs text-accent-500" aria-hidden="true" />
                <span>{email}</span>
              </a>
            </li>
            <li>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-navy-200 transition-colors hover:text-accent-400"
              >
                <FaLocationDot className="mt-1 shrink-0 text-xs text-accent-500" aria-hidden="true" />
                <span>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------------- Legal notice */}
      <div className="border-t border-white/10">
        <div className="container-x py-8">
          <p className="text-xs leading-relaxed text-navy-300/90">
            <strong className="font-semibold text-navy-100">Attorney advertising.</strong>{" "}
            The information on this website is for general informational purposes only and is not
            legal advice. Viewing this site, submitting a form, or contacting the firm does not
            create an attorney-client relationship. Prior results do not guarantee a similar
            outcome. Read our{" "}
            <Link href="/privacy-policy" className="text-accent-400 underline-offset-4 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-and-conditions" className="text-accent-400 underline-offset-4 hover:underline">
              Terms &amp; Conditions
            </Link>
            .
          </p>
          <p className="mt-3 text-xs leading-relaxed text-navy-300/90">
            <strong className="font-semibold text-navy-100">SMS notice.</strong> Consent to receive
            text messages from The Turuchi Law Firm is optional and is not a condition of purchasing
            services, retaining the firm, or receiving legal services. Message and data rates may
            apply and message frequency varies. Reply STOP to opt out or HELP for help. No mobile
            opt-in or text message consent will be shared with third parties or affiliates for
            marketing or promotional purposes.
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------- Colophon */}
      <div className="border-t border-white/10 bg-navy-900">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-navy-200 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} The Turuchi Law Firm. All rights reserved.</p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <p>
            Built and managed by{" "}
            <a
              href="https://www.kymaa.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-400 underline-offset-4 hover:underline"
            >
              Kymaa Digital Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
