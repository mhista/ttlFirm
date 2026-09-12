"use client";

import Link from "next/link";
import { FaCheck, FaPhone, FaArrowRightLong } from "react-icons/fa6";
import { FIRM, telHref } from "@/lib/siteNav";
import CountUp from "@components/common/countUp";
import { WatchFilmButton } from "@components/common/filmPlayer";

const DEFAULT_BULLETS = [
  "Free consultation, no obligation",
  "No fee unless we recover for you",
  "Former insurance defense attorney",
];

/**
 * Home hero. One column of copy over full-bleed background media.
 *
 * The framed film player used to sit to the right of this copy. The client's
 * note was that on desktop it landed in an awkward spot, and she was right —
 * with the landscape loop playing full bleed behind the headline, a portrait
 * player of the same person on top of it was two videos competing on the one
 * screen that has to do the most work. The film now has a section of its own
 * further down the page (filmSection.jsx). "Watch our film" stays in the
 * action row here, so it is still one press away from the fold.
 */
const HomeHero = ({ content, stats, statsSection, film }) => {
  const eyebrow = content?.eyebrow || "New Jersey";
  // The firm's own wording, trimmed. A hero over moving footage has to be read
  // in two seconds from a phone, so the heading loses "Trusted New Jersey Law
  // firm" (the eyebrow above it already says New Jersey) and the description
  // keeps her three words — compassion, diligence, integrity — and drops the
  // practice areas the firm no longer runs.
  const heading = content?.heading || "Delivering our absolute best for your legal outcome.";
  const description =
    content?.description ||
    "A dedicated New Jersey firm, built on compassion, diligence and integrity — relentlessly pursuing fair compensation for people harmed by someone else's negligence.";
  const ctaText = content?.ctaText || "Get Your Free Case Review";
  const ctaLink = content?.ctaLink || "/contact";
  const attorneyLinkText = content?.attorneyLinkText || "Turuchi S. Iheanachor, Esq.";

  const bullets =
    content?.bullets && content.bullets.length > 0 ? content.bullets : DEFAULT_BULLETS;

  const phone = content?.phone || FIRM.phoneDisplay;

  const watchFilmLabel = content?.watchFilmLabel || "Watch our film";

  // The stats strip is fully editable. When the Studio's list is empty we fall
  // back to the firm-wide figures from Site Settings.
  const statItems =
    statsSection?.stats?.length > 0
      ? statsSection.stats.filter((s) => s?.value || s?.label).slice(0, 4)
      : [
          { value: `${stats?.casesHandled ?? 700}+`, label: "Cases handled" },
          // Her words. Not a number, so the counter passes it straight through.
          { value: stats?.recoveredLabel || "Millions", label: "Recovered for clients" },
          { value: `${stats?.countiesServed ?? 7}`, label: "NJ counties served" },
          { value: "$0", label: "Upfront cost to you" },
        ];
  const showStats = statsSection?.enabled !== false && statItems.length > 0;
  const resultsDisclaimer =
    statsSection?.disclaimer ||
    "Prior results do not guarantee a similar outcome. Every case turns on its own facts.";

  return (
    <div className="relative z-10 flex w-full flex-1 flex-col justify-end pt-24 sm:pt-28 lg:pt-32">
      <div className="container-x flex flex-1 items-center">
        <div className="grid w-full items-center gap-10 py-8 lg:grid-cols-12 lg:gap-12 lg:py-12">
          {/* ------------------------------------------------------- copy */}
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="flex items-center gap-3 animate-fade-up">
              <span className="h-px w-8 bg-accent-500" aria-hidden="true" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-accent-400 sm:text-sm">
                {eyebrow}
              </span>
            </div>

            <h1
              className="mt-4 max-w-[20ch] font-display text-[2rem] font-bold leading-[1.06] text-white drop-shadow-[0_2px_18px_rgba(6,21,37,0.55)] sm:text-[2.6rem] lg:text-[3.1rem] xl:text-[3.4rem] animate-fade-up"
              style={{ animationDelay: "60ms" }}
            >
              {heading}
            </h1>

            <p
              className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-navy-50 drop-shadow-[0_1px_12px_rgba(6,21,37,0.6)] sm:text-base lg:text-[17px] animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              {description}
            </p>

            <ul
              className="mt-6 flex flex-col gap-3 animate-fade-up sm:mt-7"
              style={{ animationDelay: "180ms" }}
            >
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500">
                    <FaCheck className="text-[9px] text-navy-950" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-white sm:text-[15px]">{bullet}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-8 flex flex-col gap-3 animate-fade-up sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: "240ms" }}
            >
              <Link href={ctaLink} className="btn-primary w-full sm:w-auto">
                {ctaText}
                <FaArrowRightLong className="text-xs" aria-hidden="true" />
              </Link>
              <a href={telHref(phone)} className="btn-outline w-full sm:w-auto">
                <FaPhone className="text-xs" aria-hidden="true" />
                {phone}
              </a>
            </div>

            {/* Play the film separately — visible at every breakpoint. */}
            <div
              className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              <WatchFilmButton label={watchFilmLabel} film={film} />
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 border-b border-white/25 pb-1 font-display text-base italic text-white/90 transition-colors hover:border-accent-400 hover:text-accent-400 sm:text-lg"
              >
                {attorneyLinkText}
                <FaArrowRightLong className="text-[10px]" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ------------------------------------------- framed film player */}
        </div>
      </div>

      {/* -------------------------------------------------------- stats strip */}
      {showStats && (
        <div className="relative z-10 mt-6 border-t border-white/10 bg-navy-950/75 backdrop-blur-md">
          <div className="container-x grid grid-cols-2 md:grid-cols-4">
            {statItems.map((stat, i) => (
              <Stat
                key={`${stat.label}-${i}`}
                value={stat.value}
                label={stat.label}
                className={[
                  // 2x2 on phones, one row from md up — borders follow suit.
                  i % 2 === 0 ? "border-r border-white/10" : "",
                  i < statItems.length - 2 ? "border-b border-white/10 md:border-b-0" : "",
                  i === 1 ? "md:border-r md:border-white/10" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            ))}
          </div>

          {/* A figure about past recoveries is a results claim, and New Jersey
              requires it to be qualified where it is made — not only in the
              footer. Editable, but do not remove it. */}
          {resultsDisclaimer && (
            <p className="container-x pb-4 text-center text-[10px] leading-relaxed text-navy-300/80">
              {resultsDisclaimer}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

/* The figures count up when the strip scrolls into view — see countUp.jsx.
   Anything non-numeric in the value ("$0", "24/7") passes straight through. */
const Stat = ({ value, label, className = "" }) => (
  <div className={`px-3 py-5 text-center md:py-6 ${className}`}>
    <CountUp
      value={value}
      className="block font-display text-2xl font-bold text-accent-400 sm:text-3xl md:text-4xl"
    />
    <div className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-navy-200 sm:text-[11px]">
      {label}
    </div>
  </div>
);

export default HomeHero;
