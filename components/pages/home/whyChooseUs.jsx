"use client";
import Link from "next/link";
import {
  FaCheckCircle,
  FaBalanceScale,
  FaHandshake,
  FaComments,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import CountUp from "@components/common/countUp";
import { FilmTile } from "@components/common/filmPlayer";

// Icon mapping — the CMS stores the icon NAME, so this list is the contract.
const iconMap = {
  FaBalanceScale,
  FaComments,
  FaMapMarkerAlt,
  FaHandshake,
  FaCheckCircle,
  FaUserTie,
};

const FeatureCard = ({ icon: iconName, title, description, delay }) => {
  const Icon = iconMap[iconName] || FaCheckCircle;

  return (
    <div
      className="card-glass group flex h-full flex-col p-6 lg:p-7"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-accent-500/30 bg-accent-500/12 transition-colors duration-300 group-hover:bg-accent-500">
        <Icon
          className="text-lg text-accent-400 transition-colors duration-300 group-hover:text-navy-950"
          aria-hidden="true"
        />
      </span>

      <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-white">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-navy-100">{description}</p>
    </div>
  );
};

const StatCard = ({ number, label, delay }) => (
  <div className="card-glass p-6 text-center" data-aos="zoom-in" data-aos-delay={delay}>
    <CountUp
      value={number}
      className="block font-display text-4xl font-bold text-accent-400 md:text-5xl"
    />
    <div className="mt-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-navy-200">
      {label}
    </div>
  </div>
);

/**
 * "Why Trust Us" — the section the client asked to keep.
 * Structure, CMS fields and default copy are unchanged; only the palette and
 * typography were brought onto the new navy system.
 */
// The data-aos attributes in this file are driven by components/common/motion.jsx.
// The AOS library used to be initialised here, but its stylesheet was never
// imported, so nothing on this section ever actually moved.
const WhyChooseUs = ({ content, stats, film }) => {
  const defaultFeatures = [
    {
      icon: "FaBalanceScale",
      title: "Personalized Legal Strategy",
      description:
        "Every case is handled with a customized legal strategy shaped by the client's unique circumstances, objectives, and concerns. We take time to understand the facts, assess available legal options, and develop an approach designed to protect our clients' interests.",
    },
    {
      icon: "FaComments",
      title: "Clear, Honest Communication",
      description:
        "We believe effective representation begins with clear and honest communication. Clients receive straightforward explanations of their legal options, realistic expectations, and timely updates throughout their case.",
    },
    {
      icon: "FaMapMarkerAlt",
      title: "Experience with New Jersey Courts",
      description:
        "Our firm has practical experience representing clients in state, municipal, and federal courts throughout New Jersey. This local knowledge allows us to navigate court procedures efficiently while advocating effectively.",
    },
    {
      icon: "FaHandshake",
      title: "Compassionate Representation",
      description:
        "We recognize that legal issues often involve stress and uncertainty. We approach every matter with empathy, professionalism, and respect, ensuring our clients feel supported while we work diligently to protect their rights.",
    },
    {
      icon: "FaCheckCircle",
      title: "Free Initial Consultation",
      description:
        "We offer a free initial consultation so prospective clients can speak directly with a knowledgeable New Jersey attorney about their legal concerns. This provides an opportunity to understand available options before committing.",
    },
    {
      icon: "FaUserTie",
      title: "Insight from the Other Side",
      description:
        "With prior experience as an insurance defense attorney, Turuchi knows how carriers evaluate, value and defend claims — and uses that insight to push for what a case is genuinely worth.",
    },
  ];

  const sectionLabel = content?.sectionLabel || "Why Trust Us";
  const heading = content?.heading || "Why Clients Choose Our Legal Team";
  const description =
    content?.description ||
    "We believe in the power of personalized attention and transparent communication. Individuals and families seeking a reliable New Jersey attorney choose our firm because we combine legal knowledge with genuine care and local experience.";
  const features =
    content?.features && content.features.length > 0 ? content.features : defaultFeatures;
  const ctaText = content?.ctaText || "Meet Attorney Turuchi Iheanachor";
  const ctaLink = content?.ctaLink || "/profile";

  const casesHandled = stats?.casesHandled ?? 700;
  const recoveredLabel = stats?.recoveredLabel || "Millions";
  const resultsDisclaimer =
    content?.disclaimer ||
    "Prior results do not guarantee a similar outcome. Every case turns on its own facts.";

  // The grid is three across at `lg`. Whenever the feature count doesn't
  // divide by three there is a hole in the last row, and the film tile goes in
  // it. With a count that already fills the row it would open a new hole, so
  // it stays out. The Studio decides how many features there are, so this has
  // to be worked out rather than hard-coded.
  const showFilmTile = features.length % 3 !== 0;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background decoration — navy-led, with only a whisper of accent. */}
      <div
        className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-16 h-96 w-96 rounded-full bg-navy-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x section-y relative">
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

        {/* Stats */}
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-2 gap-4 md:gap-6">
          <StatCard number={`${casesHandled}+`} label="Cases Handled" delay="100" />
          <StatCard number={recoveredLabel} label="Recovered for Clients" delay="200" />
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[10px] leading-relaxed text-navy-300/80">
          {resultsDisclaimer}
        </p>

        {/* Features, plus the film tile when there's a hole to fill. */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title || index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={(index % 3) * 100}
            />
          ))}
          {showFilmTile && <FilmTile film={film} delay={(features.length % 3) * 100} />}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center" data-aos="fade-up">
          <Link href={ctaLink} className="btn-primary">
            {ctaText}
            <FaArrowRightLong className="text-xs" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
