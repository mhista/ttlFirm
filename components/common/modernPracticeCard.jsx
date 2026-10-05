"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";

/**
 * Practice-area card.
 * Reworked for a two-column layout — the firm now has two practice areas, so
 * a four-across grid of near-empty cards no longer makes sense.
 */
const ModernPracticeCard = ({ image1, title, subtitle, slug, subAreas = [], delay = 0 }) => {
  return (
    <article
      className="group card flex flex-col overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden sm:h-[260px]">
        <Image
          src={image1}
          width={720}
          height={420}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-transparent"
          aria-hidden="true"
        />
        <h3 className="absolute inset-x-0 bottom-0 p-6 font-display text-2xl font-bold text-white md:text-[1.75rem]">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        {subtitle && (
          <p className="text-sm leading-relaxed text-ink-muted">{subtitle}</p>
        )}

        {subAreas.length > 0 && (
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {subAreas.slice(0, 6).map((area) => (
              <li key={area} className="flex items-start gap-2.5 text-sm text-ink">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500/15">
                  <FaCheck className="text-[8px] text-accent-600" aria-hidden="true" />
                </span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        )}

        {subAreas.length > 6 && (
          <p className="mt-3 text-xs italic text-ink-soft">
            + {subAreas.length - 6} more services
          </p>
        )}

        <Link
          href={`/practice/${slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-7 font-sans text-sm font-semibold uppercase tracking-wider text-navy-700 transition-colors hover:text-accent-600"
        >
          Explore this practice
          <FaArrowRightLong
            className="text-xs transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
};

export default ModernPracticeCard;
