// ===========================================
// app/practice/[practiceId]/page.jsx - FINAL VERSION
// Uses TailoredCTA component (WhyChooseUs design)
// ===========================================
import { client } from "@/lib/sanity.client";
import { practiceAreaBySlugQuery, practiceAreasQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/blog/PortableTextComponents";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section1 from "@/components/common/section1";
import PageHeader from "@components/pages/header";
import Accordion from "@/components/uiComponents/accordion";
import { FaArrowRightLong } from "react-icons/fa6";
import { generateLocalBusinessSchema } from "@/lib/seo";
import Script from "next/script";
import TailoredCTA from "@/components/common/TailoredCTA"; // NEW
import { filterRetiredAreas, RETIRED_PRACTICE_SLUGS } from "@/lib/siteNav";

export const revalidate = 60;

// Generate static paths using SLUGS
// A CMS outage at deploy time should not fail the build. Every route here
// has `revalidate` and leaves `dynamicParams` at its default, so an empty list
// means the pages render on first request and are cached from then on —
// slower for one visitor, rather than a site that will not deploy at all.
export async function generateStaticParams() {
  try {
    const practiceAreas = filterRetiredAreas((await client.fetch(practiceAreasQuery)) || []);
    return practiceAreas.map((area) => ({ practiceId: area.slug.current }));
  } catch (error) {
    console.error("Could not list practice areas for the build:", error.message);
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { practiceId } = await params;
  const practiceArea = await client.fetch(practiceAreaBySlugQuery, {
    slug: practiceId,
  });

  if (!practiceArea) {
    return { title: "Practice Area Not Found" };
  }

  return {
    // The page name leads, for the same sitelink reason as /profile — and the
    // firm name is left off because the root layout's title template appends
    // it already.
    title:
      practiceArea.seo?.metaTitle || `${practiceArea.name} | New Jersey Attorney`,
    description:
      practiceArea.seo?.metaDescription ||
      practiceArea.excerpt ||
      `Expert ${practiceArea.name} legal services in New Jersey`,
    keywords: practiceArea.seo?.keywords?.join(", "),
    openGraph: {
      title: practiceArea.seo?.metaTitle || practiceArea.name,
      description: practiceArea.seo?.metaDescription || practiceArea.excerpt,
      url: `https://turuchilawfirm.com/practice/${practiceId}`,
      images: practiceArea.seo?.ogImage
        ? [urlFor(practiceArea.seo.ogImage).width(1200).height(630).url()]
        : practiceArea.image
        ? [urlFor(practiceArea.image).width(1200).height(630).url()]
        : [],
    },
  };
}

export default async function PracticeAreaPage({ params }) {
  const { practiceId } = await params;
  const practiceArea = await client.fetch(practiceAreaBySlugQuery, {
    slug: practiceId,
  });

  // Retired practice areas (immigration, municipal court) must 404 even if
  // the Sanity document is still published.
  if (!practiceArea || RETIRED_PRACTICE_SLUGS.includes(practiceId)) {
    notFound();
  }

  // Generate schema for SEO
  const schemaData = {
    name: practiceArea.name,
    title: practiceArea.name,
    slug: practiceArea.slug,
    excerpt: practiceArea.excerpt,
    image: practiceArea.image,
    seo: practiceArea.seo,
  };
  
  const schema = generateLocalBusinessSchema(
    schemaData,
    practiceArea.counties?.[0]
  );

  // Convert FAQs to accordion format
  const accordionData =
    practiceArea.faqs?.map((faq) => ({
      title: faq.question,
      content: (
        <PortableText value={faq.answer} components={PortableTextComponents} />
      ),
    })) || [];

  return (
    <>
      {/* SEO Schema */}
      <Script
        id="practice-area-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="w-full flex flex-col">
        <PageHeader
          eyebrow="Practice Area"
          text={practiceArea.name}
          description={practiceArea.excerpt}
          image={
            practiceArea.image
              ? urlFor(practiceArea.image).width(1920).height(700).url()
              : "/assets/images/inju.jpg"
          }
          subAreas={practiceArea.counties?.map((c) => c.name) ?? []}
          breadcrumbs={[
            { href: "/practice", label: "Practice Areas" },
            { label: practiceArea.name },
          ]}
        />

        {/* Content */}
        <Section1>
          <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-12">
            {/* Main Content */}
            <div className="flex flex-col gap-10 lg:order-1 lg:col-span-8">
              {/* Overview */}
              {practiceArea.overview && (
                <div className="max-w-prose2 text-[15px] leading-relaxed text-ink-muted md:text-base [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy-900 [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-sans [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-navy-800 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5">
                  <PortableText
                    value={practiceArea.overview}
                    components={PortableTextComponents}
                  />
                </div>
              )}

              {/* Process Steps */}
              {practiceArea.process && practiceArea.process.length > 0 && (
                <div>
                  <h2 className="mb-6 font-display text-2xl font-bold text-navy-900 md:text-3xl">Our Process</h2>
                  <div className="space-y-6">
                    {practiceArea.process.map((step, index) => (
                      <div
                        key={index}
                        className="flex gap-5 rounded-xl border border-surface-line bg-white p-6 shadow-card"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-bold text-accent-400">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="mb-2 font-display text-lg font-semibold text-navy-900">
                            {step.title}
                          </h3>
                          <p className="text-[15px] leading-relaxed text-ink-muted">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* County-Specific Content */}
              {practiceArea.countyContent &&
                practiceArea.countyContent.length > 0 && (
                  <div className="mt-8">
                    <h2 className="mb-6 font-display text-2xl font-bold text-navy-900 md:text-3xl">County-Specific Information</h2>
                    <div className="space-y-6">
                      {practiceArea.countyContent.map((item, index) => (
                        <div
                          key={index}
                          className="border-l-[3px] border-accent-500 pl-6"
                        >
                          <h3 className="mb-4 font-display text-xl font-semibold text-navy-900">
                            {item.county.name}
                          </h3>
                          {item.localStats && (
                            <div className="mb-4 rounded-lg bg-navy-50 p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-navy-800">
                                Local Statistics:
                              </p>
                              <p className="mt-1.5 text-[15px] text-ink-muted">{item.localStats}</p>
                            </div>
                          )}
                          <div className="prose max-w-none">
                            <PortableText
                              value={item.content}
                              components={PortableTextComponents}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* FAQs */}
              {accordionData.length > 0 && (
                <Accordion
                  title="Frequently Asked Questions"
                  accordionData={accordionData}
                  usePadding={false}
                />
              )}

              {/* Related Practice Areas */}
              {practiceArea.relatedAreas &&
                practiceArea.relatedAreas.length > 0 && (
                  <div className="mt-12">
                    <h2 className="mb-6 font-display text-2xl font-bold text-navy-900 md:text-3xl">Related Practice Areas</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {practiceArea.relatedAreas.map((area) => (
                        <Link
                          key={area._id}
                          href={`/practice/${area.slug.current}`}
                          className="card group p-6"
                        >
                          <h3 className="mb-2 font-display text-lg font-semibold text-navy-900 transition-colors group-hover:text-accent-600">
                            {area.name}
                          </h3>
                          <p className="text-sm text-ink-muted line-clamp-2">
                            {area.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="rounded-xl border border-surface-line bg-white p-6 lg:sticky lg:top-28">
                <h2 className="font-display text-xl font-bold text-navy-900">Practice Areas</h2>
                <PracticeAreaSidebar currentSlug={practiceId} />
              </div>
            </aside>
          </div>
        </Section1>

        {/* Tailored CTA Section - NEW COMPONENT */}
        <TailoredCTA ctaData={practiceArea.ctaSection} />
      </div>
    </>
  );
}

// Sidebar Component
async function PracticeAreaSidebar({ currentSlug }) {
  const practiceAreas = filterRetiredAreas(await client.fetch(practiceAreasQuery));

  return (
    <div className="mt-5 space-y-4">
      {practiceAreas.map((area) => (
        <div className="w-full flex flex-col gap-4" key={area._id}>
          <hr className="h-px w-full border-0 bg-surface-line" />
          <Link
            href={`/practice/${area.slug.current}`}
            className={`flex flex-row items-center gap-3 text-[15px] font-medium transition-colors ${
              area.slug.current === currentSlug
                ? "text-accent-600"
                : "text-ink hover:text-accent-600"
            }`}
          >
            <FaArrowRightLong className="text-[10px] text-accent-500" aria-hidden="true" />
            <span>{area.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}