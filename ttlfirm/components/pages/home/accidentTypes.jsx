"use client";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  FaCarBurst,
  FaPersonFalling,
  FaHelmetSafety,
  FaBriefcaseMedical,
  FaScaleBalanced,
  FaHouseChimneyCrack,
} from "react-icons/fa6";

const iconMap = {
  FaCarBurst,
  FaPersonFalling,
  FaHelmetSafety,
  FaBriefcaseMedical,
  FaScaleBalanced,
  FaHouseChimneyCrack,
};

/**
 * The kinds of accident the firm actually takes.
 *
 * The two big practice-area cards gave personal injury and workers'
 * compensation equal billing, which the client's note was right about: injury
 * work is most of the practice and "personal injury" on its own tells a
 * visitor nothing about whether their crash counts. Every firm she pointed at
 * — RAM Law, Cohen & Cohen — spells the list out, and for good reason: someone
 * hit by a bus searches for "bus accident", not for "personal injury".
 *
 * It earns its keep for search too. Each of these is a phrase people type, and
 * naming them on a page Google already ranks costs nothing.
 *
 * The lists are hers, verbatim, and fully editable in the Studio.
 */
const DEFAULT_GROUPS = [
  {
    icon: "FaCarBurst",
    title: "Motor Vehicle Accidents",
    href: "/practice/personal-injury-lawyer-in-new-jersey",
    items: [
      "Car accidents",
      "Truck accidents, including 18-wheelers and tractor-trailers",
      "Motorcycle accidents",
      "Uber, Lyft and rideshare accidents",
      "Bus accidents — NJ Transit, school bus, commercial",
      "Taxi accidents",
      "Pedestrian accidents",
      "Bicycle accidents",
      "Hit-and-run accidents",
      "Drunk and impaired driver accidents",
      "Uninsured and underinsured motorist claims",
      "Distracted driving accidents",
      "Wrong-way and head-on collisions",
      "Rear-end collisions",
      "Rollover accidents",
    ],
  },
  {
    icon: "FaPersonFalling",
    title: "Premises Liability",
    href: "/practice/personal-injury-lawyer-in-new-jersey",
    items: [
      "Slip and fall accidents",
      "Trip and fall accidents",
      "Snow and ice accidents",
      "Negligent security, including assaults on premises",
      "Swimming pool accidents",
      "Elevator and escalator accidents",
      "Balcony and staircase collapses",
      "Amusement park and ride accidents",
      "Store and supermarket accidents",
    ],
  },
  {
    icon: "FaHelmetSafety",
    title: "Workers' Compensation",
    href: "/practice/new-jersey-workers-compensation-attorney",
    items: [
      "Construction site injuries",
      "Warehouse and factory injuries",
      "Repetitive strain and overuse injuries",
      "Falls from height",
      "Machinery and equipment injuries",
      "Occupational illness and exposure",
      "Denied or delayed claims",
    ],
  },
];

const AccidentTypes = ({ content }) => {
  const sectionLabel = content?.sectionLabel || "What we handle";
  const heading = content?.heading || "The accidents we take on";
  const description =
    content?.description ||
    "If what happened to you is on this list, there is a claim worth talking about. If it isn't, call anyway — the review is free either way.";
  const groups = content?.groups?.length ? content.groups : DEFAULT_GROUPS;
  const ctaText = content?.ctaText || "See all practice areas";
  const ctaLink = content?.ctaLink || "/practice";

  return (
    <div className="container-x section-y">
      <div className="mx-auto max-w-3xl text-center" data-aos="fade-down">
        <div className="flex items-center justify-center gap-3">
          <span className="rule" aria-hidden="true" />
          <span className="eyebrow">{sectionLabel}</span>
          <span className="rule" aria-hidden="true" />
        </div>
        <h2 className="h-section mt-5">{heading}</h2>
        {description && <p className="lede mt-5">{description}</p>}
      </div>

      <div className="mt-12 grid gap-6 md:mt-14 lg:grid-cols-3">
        {groups.map((group, i) => {
          const Icon = iconMap[group.icon] || FaScaleBalanced;
          return (
            <div
              key={group.title || i}
              className="flex h-full flex-col rounded-xl border border-surface-line bg-white p-6 shadow-card lg:p-7"
              data-aos="fade-up"
              data-aos-delay={(i % 3) * 100}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-500/12">
                <Icon className="text-lg text-accent-600" aria-hidden="true" />
              </span>

              <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">
                {group.title}
              </h3>

              <ul className="mt-4 flex-1 space-y-2">
                {group.items?.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 text-[14px] leading-relaxed text-ink-muted"
                  >
                    <span
                      className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-accent-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {group.href && (
                <Link
                  href={group.href}
                  className="mt-6 inline-flex items-center gap-2 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-navy-800 transition-colors hover:text-accent-600"
                >
                  More on {group.title}
                  <FaArrowRightLong className="text-[10px]" aria-hidden="true" />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {ctaText && (
        <div className="mt-12 text-center" data-aos="fade-up">
          <Link href={ctaLink} className="btn-navy">
            {ctaText}
            <FaArrowRightLong className="text-xs" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccidentTypes;
