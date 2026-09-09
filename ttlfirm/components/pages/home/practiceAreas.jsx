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
const PracticeArea = ({ practiceAreas = [], heading, description, eyebrow }) => {
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
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="rule" aria-hidden="true" />
          <span className="eyebrow">{eyebrow || "What We Do"}</span>
          <span className="rule" aria-hidden="true" />
        </div>
        <h2 className="h-section mt-5">{heading || "Our Practice Areas"}</h2>
        <p className="lede mt-5">
          {description ||
            "Focused representation in the two areas where an experienced advocate changes the outcome most — serious injury claims and workplace injury benefits."}
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-7 md:mt-14 md:grid-cols-2 lg:gap-8">
        {cards.map((card) => (
          <ModernPracticeCard
            key={card.key}
            image1={card.image}
            title={card.title}
            slug={card.slug}
            subAreas={card.subAreas}
            subtitle={card.subtitle}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-ink-muted">
          Not sure which applies to your situation? Tell us what happened.
        </p>
        <Link href="/contact" className="btn-navy">
          Schedule a Free Consultation
        </Link>
      </div>
    </div>
  );
};

export default PracticeArea;
