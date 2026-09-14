"use client";
import Link from "next/link";
import { FaCheck, FaArrowRightLong } from "react-icons/fa6";
import { FilmCard, PortraitPlayer } from "@components/common/filmPlayer";
import AttorneyBio from "@components/common/attorneyBio";
import { ATTORNEY_HEADING, ATTORNEY_ROLE } from "@/lib/attorneyBio.mjs";

const DEFAULT_BULLETS = [
  "One attorney from the first call to settlement",
  "Former insurance defense — we know their playbook",
  "Free case review, and no fee unless we recover",
];

/**
 * The firm's film, in a section of its own.
 *
 * It used to sit in the hero, in a framed player to the right of the headline.
 * The client's note was that on desktop it landed in an awkward spot, and she
 * was right: the hero now plays the landscape loop full bleed, so a portrait
 * player floating over it was a second video competing with the first, on the
 * one screen that has to do the most work.
 *
 * Here it has room. The player keeps its portrait frame — the footage is 9:16
 * and cropping it to a wide box would cut her in half — and the copy beside it
 * does the job the hero could not: say who is actually going to pick up the
 * case. "Watch our film" also stays in the hero action row, so someone who
 * wants it immediately still has it.
 *
 * Light band on purpose. The two sections that follow are both navy, and three
 * dark bands in a row flatten the page.
 */
const FilmSection = ({ content, film }) => {
  // Her photograph, when there is one, stands in for the film's poster frame —
  // a studio headshot introduces her better than a still off the video does.
  const portrait = content?.portrait?.asset?.url || "/assets/images/attorney-portrait.jpg";
  const portraitName = content?.portraitName || "Turuchi S. Iheanachor, Esq.";
  const portraitRole = content?.portraitRole || "Founder & Managing Attorney";
  const sectionLabel = content?.sectionLabel || "Meet your attorney";
  const heading = content?.heading || ATTORNEY_HEADING;
  const role = content?.roleLine || ATTORNEY_ROLE;
  // Her own bio. Sanity overrides it; the shipped copy is in lib/attorneyBio.js
  // so the homepage, the landing pages and the profile page cannot drift.
  const paragraphs = content?.paragraphs?.length ? content.paragraphs : null;
  const bullets = content?.bullets?.length ? content.bullets : DEFAULT_BULLETS;
  const ctaText = content?.ctaText || "Request a Free Case Review";
  const ctaLink = content?.ctaLink || "/contact";

  return (
    <div className="container-x section-y">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* --------------------------------------------------------- player */}
        <div className="lg:col-span-5" data-aos="fade-right">
          {portrait ? (
            <PortraitPlayer
              film={film}
              src={portrait}
              name={portraitName}
              role={portraitRole}
              alt={portraitName}
            />
          ) : (
            <FilmCard film={film} />
          )}
        </div>

        {/* ----------------------------------------------------------- copy */}
        <div className="lg:col-span-7" data-aos="fade-left">
          <div className="flex items-center gap-3">
            <span className="rule" aria-hidden="true" />
            <span className="eyebrow">{sectionLabel}</span>
          </div>

          <h2 className="h-section mt-5">{heading}</h2>
          {role && (
            <p className="mt-2 font-sans text-[13px] font-bold uppercase tracking-[0.16em] text-accent-600">
              {role}
            </p>
          )}

          <div className="mt-6 max-w-2xl">
            <AttorneyBio paragraphs={paragraphs} collapseAfter={2} />
          </div>

          <ul className="mt-8 flex flex-col gap-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500">
                  <FaCheck className="text-[9px] text-navy-950" aria-hidden="true" />
                </span>
                <span className="text-[15px] font-medium text-navy-900">{bullet}</span>
              </li>
            ))}
          </ul>

          <Link href={ctaLink} className="btn-navy mt-9">
            {ctaText}
            <FaArrowRightLong className="text-xs" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilmSection;
