import ModernPracticeCard from "@components/common/modernPracticeCard";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import { PRACTICE_AREAS, filterRetiredAreas } from "@/lib/siteNav";

/**
 * Practice-area grid.
 * Falls back to the two hard-coded areas when the CMS returns nothing, and
 * filters out retired areas (immigration, municipal court) in case those
 * documents are still published in Sanity.
 */
const PracticeArea = ({ practiceAreas = [], content, heading, description, eyebrow }) => {
  // `content` is the CMS object; the loose props are kept for the pages that
  // still pass individual strings.
  const label = content?.sectionLabel ?? eyebrow;
  const title = content?.heading ?? heading;
  const blurb = content?.description ?? description;
  const footnote =
    content?.footnote ?? "Not sure which applies to your situation? Tell us what happened.";
  const ctaText = content?.ctaText || "Schedule a Free Consultation";
  const ctaLink = content?.ctaLink || "/contact";

  const areas = filterRetiredAreas(practiceAreas);

  const cards =
    areas.length > 0
      ? areas.map((area, index) => ({
          key: area._id || area.slug?.current || index,
          image: area.image
            ? urlFor(area.image).width(720).height(460).url()
            : PRACTICE_AREAS[index]?.image ?? "/assets/images/inju.jpg",
          title: area.name,
          slug: area.slug?.current ?? area.slug,
          subAreas: area.subServices?.map((s) => s.title) ?? [],
          subtitle: area.excerpt ?? "",
        }))
      : PRACTICE_AREAS.map((area) => ({
          key: area.slug,
          image: area.image,
          title: area.label,
          slug: area.slug,
          subAreas: [],
          subtitle: area.blurb,
        }));

  return (
    <div className="container-x section-y">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center" data-aos="fade-down">
        <div className="flex items-center justify-center gap-3">
          <span className="rule" aria-hidden="true" />
          <span className="eyebrow">{label || "What We Do"}</span>
          <span className="rule" aria-hidden="true" />
        </div>
        <h2 className="h-section mt-5">{title || "Our Practice Areas"}</h2>
        <p className="lede mt-5">
          {blurb ||
            "Focused representation in the two areas where an experienced advocate changes the outcome most — serious injury claims and workplace injury benefits."}
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-7 md:mt-14 md:grid-cols-2 lg:gap-8">
        {cards.map((card, i) => (
          <ModernPracticeCard
            key={card.key}
            delay={(i % 2) * 100}
            image1={card.image}
            title={card.title}
            slug={card.slug}
            subAreas={card.subAreas}
            subtitle={card.subtitle}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col items-center gap-4 text-center" data-aos="fade-up">
        {footnote && <p className="text-sm text-ink-muted">{footnote}</p>}
        <Link href={ctaLink} className="btn-navy">
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default PracticeArea;
