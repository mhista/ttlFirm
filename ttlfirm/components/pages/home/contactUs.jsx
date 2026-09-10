"use client";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import Form from "@components/common/form";
import { buildSocialLinks } from "@components/common/mediaButtons";
import { useSiteSettings } from "@/lib/siteSettingsContext";
import { FIRM, telHref } from "@/lib/siteNav";

/**
 * Contact block: firm details on the left, lead form on the right.
 * The form carries the optional SMS consent checkbox required by the A2P
 * registration.
 */
const ContactUs = ({ contact, content }) => {
  const siteSettings = useSiteSettings();
  const social = buildSocialLinks(siteSettings?.social);
  const phone = contact?.phone || FIRM.phoneDisplay;
  const email = contact?.email || FIRM.email;

  const addressText = contact?.address?.street
    ? [
        contact.address.street,
        contact.address.city,
        [contact.address.state, contact.address.zipCode].filter(Boolean).join(" "),
      ]
        .filter(Boolean)
        .join(", ")
    : `${FIRM.addressLine1}, ${FIRM.addressLine2}`;

  const mapsUrl = contact?.address?.street
    ? `https://maps.google.com/?q=${encodeURIComponent(addressText)}`
    : FIRM.mapsUrl;

  const heading = content?.heading || "Tell us what happened";
  const eyebrow = content?.sectionLabel || "Get in touch";
  const hoursLabel =
    content?.hoursLabel ||
    siteSettings?.businessHours?.weekdaysDisplay ||
    "Monday – Friday, 9:00 AM – 5:00 PM";
  const formHeading = content?.formHeading || "Request a free case review";
  const formSubheading =
    content?.formSubheading || "We typically respond the same business day.";
  const description =
    content?.description ||
    "Send a few details and we'll review your situation, answer your questions, and explain the options open to you — free, and with no obligation to hire us.";

  const details = [
    { icon: FaPhone, label: "Phone", value: phone, href: telHref(phone) },
    { icon: FaEnvelope, label: "Email", value: email, href: `mailto:${email}` },
    { icon: FaLocationDot, label: "Office", value: addressText, href: mapsUrl, external: true },
    { icon: FaClock, label: "Hours", value: hoursLabel },
  ];

  return (
    <div className="container-x section-y">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: details */}
        <div data-aos="fade-right">
          <div className="flex items-center gap-3">
            <span className="rule" aria-hidden="true" />
            <span className="eyebrow">{eyebrow}</span>
          </div>

          <h2 className="h-section mt-5">{heading}</h2>
          <p className="lede mt-5 max-w-xl">{description}</p>

          <ul className="mt-9 space-y-5">
            {details.map(({ icon: Icon, label, value, href, external }) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-50">
                    <Icon className="text-sm text-navy-700" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      {label}
                    </span>
                    <span className="mt-0.5 block break-words text-[15px] font-medium text-navy-900">
                      {value}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-start gap-4 transition-opacity hover:opacity-70"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-start gap-4">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="mt-9 flex items-center gap-2.5">
            {social.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-surface-line text-navy-700 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div
          className="rounded-xl border border-surface-line bg-white p-6 shadow-card md:p-8"
          data-aos="fade-left"
        >
          <Form heading={formHeading} subheading={formSubheading} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
