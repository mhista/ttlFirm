import Link from "next/link";
import Nav from "@/components/layout/nav";
import StickyNav from "@/components/layout/stickyNav";
import { FaChevronRight } from "react-icons/fa6";

/**
 * Compact page banner for every route that isn't the homepage.
 * Same navigation chrome as the hero, a navy scrim over a still image, an
 * optional breadcrumb, and an optional list of sub-areas.
 */
const PageHeader = ({
  text,
  text2,
  image = "/assets/images/bgg.jpg",
  subAreas = [],
  eyebrow,
  description,
  breadcrumbs = [],
}) => {
  return (
    <div className="relative isolate w-full overflow-hidden bg-navy-950">
      {/* Background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <img src={image} alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-navy-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-navy-900/50" />
      </div>

      <Nav />
      <StickyNav />

      <div className="container-x pb-12 pt-32 sm:pb-14 sm:pt-40 lg:pb-16 lg:pt-48">
        {eyebrow && (
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent-500" aria-hidden="true" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-accent-400">
              {eyebrow}
            </span>
          </div>
        )}

        <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {text}
          {text2 && <span className="text-accent-400"> {text2}</span>}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-navy-100 md:text-base">
            {description}
          </p>
        )}

        {subAreas.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
            {subAreas
              .filter((item) => typeof item === "string")
              .map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy-100">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
          </ul>
        )}

        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mt-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-navy-200">
              <li>
                <Link href="/" className="transition-colors hover:text-accent-400">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href || crumb.label} className="flex items-center gap-1.5">
                  <FaChevronRight className="text-[8px] text-navy-300" aria-hidden="true" />
                  {crumb.href && i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="transition-colors hover:text-accent-400">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
