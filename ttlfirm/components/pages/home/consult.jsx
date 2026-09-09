"use client";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaCalendarCheck, FaArrowRightLong } from "react-icons/fa6";
import { FIRM, telHref } from "@/lib/siteNav";

const formatPhone = (phone) => {
  const digits = String(phone || "").replace(/\D/g, "").slice(-10);
  return digits.length === 10
    ? digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
    : phone || FIRM.phoneDisplay;
};

/**
 * Conversion band. Sits inside Section4 (navy gradient), so it carries no
 * background of its own.
 */
const Consultation = ({ content, contact, stats }) => {
  const sectionLabel = content?.sectionLabel || "Free Case Evaluation";
  const heading = content?.heading || "Talk to a New Jersey Attorney Today";
  const description =
    content?.description ||
    "We will review your situation, answer your questions, and lay out your legal options — with no obligation and no cost to find out where you stand.";
  const ctaPrimaryText = content?.ctaPrimaryText || "Start My Free Case Review";
  const ctaSecondaryText = content?.ctaSecondaryText || "Call";

  const phone = contact?.phone || FIRM.phoneDisplay;
  const email = contact?.email || FIRM.email;
  const displayPhone = formatPhone(phone);

  const cards = [
    {
      icon: FaPhone,
      title: "Call Us",
      body: displayPhone,
      href: telHref(phone),
      note: "Speak to someone directly",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      body: email,
      href: `mailto:${email}`,
      note: "We reply the same business day",
    },
    {
      icon: FaCalendarCheck,
      title: "Book a Consultation",
      body: "Free & confidential",
      href: "/contact",
      note: "Tell us what happened",
    },
  ];

  return (
    <div className="container-x section-y">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center" data-aos="fade-down">
        <div className="flex items-center justify-center gap-3">
          <span className="rule" aria-hidden="true" />
          <span className="eyebrow-on-dark">{sectionLabel}</span>
          <span className="rule" aria-hidden="true" />
        </div>
        <h2 className="h-section-on-dark mt-5">{heading}</h2>
        <p className="lede-on-dark mt-5">{description}</p>
      </div>

      {/* Contact cards */}
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map(({ icon: Icon, title, body, href, note }) => {
          const isInternal = href.startsWith("/");
          const Wrapper = isInternal ? Link : "a";
          return (
            <Wrapper
              key={title}
              href={href}
              className="card-glass group flex flex-col items-center p-7 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/15 transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-500">
                <Icon
                  className="text-xl text-accent-400 transition-colors duration-300 group-hover:text-navy-950"
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
              <span className="mt-1.5 break-all text-sm font-medium text-accent-400">{body}</span>
              <span className="mt-1 text-xs text-navy-200">{note}</span>
            </Wrapper>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row" data-aos="fade-up">
        <Link href="/contact" className="btn-primary w-full sm:w-auto">
          {ctaPrimaryText}
          <FaArrowRightLong className="text-xs" aria-hidden="true" />
        </Link>
        <a href={telHref(phone)} className="btn-outline w-full sm:w-auto">
          <FaPhone className="text-xs" aria-hidden="true" />
          {ctaSecondaryText} {displayPhone}
        </a>
      </div>

      <p className="mt-6 text-center text-xs text-navy-200">
        Contacting the firm does not create an attorney-client relationship.
      </p>
    </div>
  );
};

export default Consultation;
