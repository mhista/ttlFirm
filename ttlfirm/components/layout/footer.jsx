"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot, FaArrowRightLong } from "react-icons/fa6";
import { buildSocialLinks } from "@components/common/mediaButtons";
import { useSiteSettings } from "@/lib/siteSettingsContext";
import { PRACTICE_AREAS, LEGAL_LINKS, FIRM, telHref, getOffices } from "@/lib/siteNav";

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
  const social = buildSocialLinks(siteSettings?.social);

  const phone = contact.phone || FIRM.phoneDisplay;
  const email = contact.email || FIRM.email;

  // Footer copy and legal notices are editable in Site Settings; the strings
  // below are the fallbacks when a field is left empty in the Studio.
  const f = siteSettings?.footer || {};
  const notices = siteSettings?.legalNotices || {};
  const ctaHeading = f.ctaHeading || "Injured in New Jersey? Let's talk today.";
  const ctaSubheading = f.ctaSubheading || "Free consultation. No fee unless we recover for you.";
  const ctaButtonText = f.ctaButtonText || "Request a Case Review";
  const tagline =
    f.tagline ||
    "A New Jersey firm representing injured people and injured workers. Every case is handled personally by an attorney who has sat on the insurance company's side of the table and knows how they value a claim.";
  const creditName = f.creditName || "Kymaa Digital Solutions";
  const creditUrl = f.creditUrl || "https://www.kymaa.tech";
  const legalLinks = f.legalLinks?.length ? f.legalLinks : LEGAL_LINKS;
  const attorneyAdvertising =
    notices.attorneyAdvertising ||
    "The information on this website is for general informational purposes only and is not legal advice. Viewing this site, submitting a form, or contacting the firm does not create an attorney-client relationship. Prior results do not guarantee a similar outcome.";
  const smsNotice =
    notices.smsNotice ||
    "Consent to receive text messages from The Turuchi Law Firm is optional and is not a condition of purchasing services, retaining the firm, or receiving legal services. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help. No mobile opt-in or text message consent will be shared with third parties or affiliates for marketing or promotional purposes.";

  // The firm has more than one address; getOffices() is the single place that
  // turns whatever the CMS holds into a list the footer, the contact page and
  // the structured data all render the same way.
  const offices = getOffices(contact);

  // NOTE ON ORDER AND CONTENTS — this list is an SEO lever, not just a menu.
  //
  // Google builds the sitelinks under a search result partly from how often
  // and how prominently a page is linked from the rest of the site. The old
  // version of this list carried Privacy Policy and Terms & Conditions, which
  // ALSO appear in the legal notice paragraph and again in the colophon: three
  // site-wide links each, more than any real page had. That is why the firm's
  // result was showing Legal Disclaimer and Terms & Conditions as sitelinks
  // instead of the pages that win work.
  //
  // So the legal pages are now linked twice per page instead of three times
  // (still crawlable, still prominent enough for the A2P registration, which
  // only requires the Privacy Policy be publicly reachable), and the two pages
  // the client wants surfaced — Personal Injury and Attorney Profile — lead
  // the list with their exact page titles as the anchor text.
  const companyLinks = [
    { href: "/practice/personal-injury-lawyer-in-new-jersey", label: "Personal Injury" },
    { href: "/profile", label: "Attorney Profile" },
    { href: "/practice", label: "Practice Areas" },
    { href: "/about", label: "About the Firm" },
    { href: "/contact", label: "Contact Us" },
    { href: "/reviews", label: "Client Reviews" },
    { href: "/blog", label: "Legal Insights" },
    { href: "/", label: "Home" },
  ];

  return (
    <footer className="bg-navy-950 text-navy-100">
      {/* ------------------------------------------------------------ CTA bar */}
      <div className="border-b border-white/10 bg-navy-900">
        <div className="container-x flex flex-col items-center gap-5 py-9 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-[1.75rem]">
              {ctaHeading}
            </h2>
            <p className="mt-1.5 text-sm text-navy-200">{ctaSubheading}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={telHref(phone)} className="btn-primary whitespace-nowrap">
              <FaPhone className="text-xs" aria-hidden="true" /> {phone}
            </a>
            <Link href="/contact" className="btn-outline whitespace-nowrap">
              {ctaButtonText}
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
            alt={FIRM.name}
            className="h-16 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">
            A New Jersey firm representing injured people and injured workers.
            Every case is handled personally by an attorney who has sat on the
            insurance company&rsquo;s side of the table and knows how they value a
            claim.
          </p>
          <ul className="mt-6 flex items-center gap-2">
            {social.map((link) => (
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
              {offices.map((office, i) => (
                <a
                  key={office.mapsUrl}
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-start gap-3 text-navy-200 transition-colors hover:text-accent-400 ${
                    i > 0 ? "mt-4" : ""
                  }`}
                >
                  <FaLocationDot
                    className="mt-1 shrink-0 text-xs text-accent-500"
                    aria-hidden="true"
                  />
                  <span>
                    {/* Only labelled once there is more than one — a lone
                        address does not need telling which office it is. */}
                    {offices.length > 1 && office.label && (
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-400">
                        {office.label}
                      </span>
                    )}
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    {office.note && (
                      <span className="mt-0.5 block text-[12px] italic text-navy-300">
                        {office.note}
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      {/* ------------------------------------------------------- Legal notice */}
      <div className="border-t border-white/10">
        <div className="container-x py-8">
          <p className="text-xs leading-relaxed text-navy-300/90">
            <strong className="font-semibold text-navy-100">Attorney advertising.</strong>{" "}
            {attorneyAdvertising} Read our{" "}
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
            <strong className="font-semibold text-navy-100">SMS notice.</strong> {smsNotice}
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------- Colophon */}
      <div className="border-t border-white/10 bg-navy-900">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-navy-200 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {FIRM.name}. All rights reserved.</p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
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
              href={creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-400 underline-offset-4 hover:underline"
            >
              {creditName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
