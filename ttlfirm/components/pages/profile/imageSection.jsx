import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { socialLinks } from "@components/common/mediaButtons";  // static list is fine here
import { telHref } from "@/lib/siteNav";

/**
 * Portrait + contact card used on the attorney profile and about pages.
 * The old version pinned four different hard-coded pixel heights
 * (`h-[500px] sm:h-[660px] md:w-[290px] lg:w-[700px] h-[730px]`) which
 * stretched the portrait badly at md and again at lg. It now uses a fixed
 * aspect ratio and fills its column.
 */
const ImageSection = ({ image, name, title: jobTitle, email, phone, alt }) => (
  <div>
    <div className="overflow-hidden rounded-xl bg-navy-50">
      <img
        src={image}
        alt={alt || name || "Attorney"}
        className="aspect-[4/5] w-full object-cover object-top"
        loading="lazy"
      />
    </div>

    {(name || jobTitle || email || phone) && (
      <div className="mt-6">
        {name && (
          <p className="font-display text-2xl font-bold text-navy-900">{name}</p>
        )}
        {jobTitle && (
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-accent-600">
            {jobTitle}
          </p>
        )}

        {(email || phone) && (
          <ul className="mt-5 space-y-3 border-t border-surface-line pt-5 text-sm">
            {phone && (
              <li>
                <a
                  href={telHref(phone)}
                  className="flex items-center gap-3 text-ink-muted transition-colors hover:text-accent-600"
                >
                  <FaPhone className="text-xs text-accent-500" aria-hidden="true" />
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 break-all text-ink-muted transition-colors hover:text-accent-600"
                >
                  <FaEnvelope className="text-xs text-accent-500" aria-hidden="true" />
                  {email}
                </a>
              </li>
            )}
          </ul>
        )}

        <ul className="mt-5 flex items-center gap-2">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-line text-sm text-navy-700 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
              >
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default ImageSection;
