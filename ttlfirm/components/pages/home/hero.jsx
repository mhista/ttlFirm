"use client";

import Link from "next/link";
import { FaCheck, FaPhone, FaArrowRightLong } from "react-icons/fa6";
import { FIRM, telHref } from "@/lib/siteNav";

const DEFAULT_BULLETS = [
  "Free consultation, no obligation",
  "No fee unless we recover for you",
  "Former insurance defense attorney",
];

/**
 * Home hero.
 *
 * Left-aligned over the video, in the shape used by the reference sites:
 * state eyebrow, large serif headline, checkmarked proof points, then a
 * two-button action row where only ONE button carries the accent colour.
 */
const HomeHero = ({ content, stats }) => {
  const eyebrow = content?.eyebrow || "New Jersey";
  const heading = content?.heading || "Personal Injury & Workers' Compensation Lawyers";
  const description =
    content?.description ||
    "When an accident or a workplace injury turns your life upside down, the insurance company already has lawyers working on its side. We make sure you have one working on yours — pursuing full compensation for your medical care, lost wages and recovery.";
  const ctaText = content?.ctaText || "Get Your Free Case Review";
  const ctaLink = content?.ctaLink || "/contact";
  const attorneyLinkText = content?.attorneyLinkText || "Turuchi S. Iheanachor, Esq.";

  const bullets =
    content?.bullets && content.bullets.length > 0 ? content.bullets : DEFAULT_BULLETS;

  const phone = content?.phone || FIRM.phoneDisplay;

  const casesHandled = stats?.casesHandled ?? 500;
  const yearsExperience = stats?.yearsExperience ?? 8;
  const countiesServed = stats?.countiesServed ?? 7;

  return (
    <div className="relative z-10 flex w-full flex-1 flex-col justify-end pb-0 pt-32 sm:pt-40 lg:pt-44">
      <div className="container-x flex flex-1 items-center">
        <div className="w-full max-w-2xl py-10 lg:max-w-3xl lg:py-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 animate-fade-up">
            <span className="h-px w-8 bg-accent-500" aria-hidden="true" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-accent-400 sm:text-sm">
              {eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mt-5 font-display text-[2rem] font-bold leading-[1.08] text-white sm:text-5xl lg:text-[3.85rem] animate-fade-up"
            style={{ animationDelay: "60ms" }}
          >
            {heading}
          </h1>

          {/* Description */}
          <p
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-navy-100 sm:text-base lg:text-lg animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {description}
          </p>

          {/* Proof points */}
          <ul
            className="mt-7 flex flex-col gap-3 animate-fade-up sm:mt-8"
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

          {/* Actions */}
          <div
            className="mt-9 flex flex-col gap-3 animate-fade-up sm:flex-row sm:items-center sm:gap-4"
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

          {/* Attorney byline */}
          <Link
            href="/profile"
            className="mt-8 inline-flex items-center gap-2 border-b border-white/25 pb-1 font-display text-base italic text-white/90 transition-colors hover:border-accent-400 hover:text-accent-400 sm:text-lg animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            {attorneyLinkText}
            <FaArrowRightLong className="text-[10px]" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------- Stats strip
          Replaces the absolutely-positioned counter block that used to be
          pinned with a stack of magic `top-[1230px]` values and drifted out
          of place at almost every breakpoint. */}
      <div className="relative z-10 mt-8 border-t border-white/10 bg-navy-950/70 backdrop-blur-md">
        <div className="container-x grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          <Stat value={`${casesHandled}+`} label="Legal cases handled" />
          <Stat value={`${yearsExperience}`} label="Years of experience" />
          <Stat value={`${countiesServed}`} label="NJ counties served" />
          <Stat
            value="$0"
            label="Upfront cost to you"
            className="col-span-2 border-t border-white/10 md:col-span-1 md:border-t-0"
          />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ value, label, className = "" }) => (
  <div className={`px-4 py-5 text-center md:py-6 ${className}`}>
    <div className="font-display text-2xl font-bold text-accent-400 sm:text-3xl md:text-4xl">
      {value}
    </div>
    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-200 sm:text-[11px]">
      {label}
    </div>
  </div>
);

export default HomeHero;
