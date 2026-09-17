import { client } from "@/lib/sanity.client";
import { aboutPageQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/blog/PortableTextComponents";
import Accordion from "@components/uiComponents/accordion";
import Section1 from "@components/common/section1";
import Section4 from "@components/common/section4";
import ImageSection from "@components/pages/profile/imageSection";
import Consultation from "@components/pages/home/consult";
import PageHeader from "@components/pages/header";
import Script from "next/script";

export const revalidate = 60;

// Fetch page data
async function getPageData() {
  try {
    const aboutPage = await client.fetch(aboutPageQuery);
    return aboutPage || {};
  } catch (error) {
    console.error("Error fetching about page:", error);
    return {};
  }
}

// Generate metadata from CMS
export async function generateMetadata() {
  const data = await getPageData();
  const seo = data?.seo || {};
  
  return {
    title: seo.metaTitle || "About the Firm | Experienced New Jersey Attorneys",
    description: seo.metaDescription || "Learn about our commitment to justice, compassion, and exceptional legal representation. Serving New Jersey with focused representation in personal injury and workers' compensation.",
    keywords: seo.keywords || [
      "about Turuchi Law Firm",
      "New Jersey law firm",
      "experienced attorneys NJ",
      "legal services New Jersey",
      "compassionate lawyers"
    ],
    openGraph: {
      title: seo.metaTitle || "About Us | The Turuchi Law Firm, LLC",
      description: seo.metaDescription || "Unwavering commitment to justice. Expert legal representation across New Jersey.",
      url: "https://turuchilawfirm.com/about",
      images: seo.ogImage ? [
        {
          url: urlFor(seo.ogImage).width(1200).height(630).url(),
          width: 1200,
          height: 630
        }
      ] : []
    },
    alternates: {
      canonical: "https://turuchilawfirm.com/about"
    }
  };
}

// Generate schema
function generateLawFirmSchema(data) {
  const whoWeAre = data?.whoWeAre || {};
  
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "The Turuchi Law Firm, LLC",
    "description": whoWeAre?.content?.[0]?.children?.[0]?.text || "Focused representation in personal injury and workers' compensation matters.",
    "url": "https://turuchilawfirm.com/about",
    "telephone": "+17322106410",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3 Gateway Center, 12th Floor",
      "addressLocality": "Newark",
      "addressRegion": "NJ",
      "postalCode": "07102"
    }
  };
}

const AboutUs = async () => {
  const data = await getPageData();
  
  // Get page sections
  const pageHeader = data?.pageHeader || {};
  const whoWeAre = data?.whoWeAre || {};
  const missionAndValues = data?.missionAndValues || {};
  const faqs = data?.faqs || {};
  const ctaSection = data?.ctaSection || {};
  
  // Transform FAQs for Accordion component
  const accordionData = faqs?.questions?.map(faq => ({
    title: faq.question,
    content: faq.answer
  })) || [];
  
  const lawFirmSchema = generateLawFirmSchema(data);

  return (
    <>
      <Script
        id="lawfirm-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lawFirmSchema) }}
      />

      <PageHeader
        eyebrow="About the Firm"
        text={pageHeader?.heading || "About"}
        text2={pageHeader?.headingHighlight || "Us"}
        description={
          pageHeader?.description ||
          "Who we are, how we work, and what you can expect when you bring us a case."
        }
        image={
          pageHeader?.backgroundImage
            ? urlFor(pageHeader.backgroundImage).url()
            : "/assets/images/bgg.jpg"
        }
        breadcrumbs={[{ label: "About" }]}
      />

      <Section1>
        <div className="container-x section-y">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {whoWeAre?.mainImage && (
              <div className="lg:col-span-5" data-aos="fade-right">
                <div className="lg:sticky lg:top-28">
                  <ImageSection
                    image={urlFor(whoWeAre.mainImage).width(900).url()}
                    alt={whoWeAre.mainImage.alt}
                  />
                </div>
              </div>
            )}

            <div className={whoWeAre?.mainImage ? "lg:col-span-7" : "lg:col-span-12"}>
              <div className="space-y-12">
                {whoWeAre?.content && (
                  <section>
                    <div className="flex items-center gap-3">
                      <span className="rule" aria-hidden="true" />
                      <span className="eyebrow">Our Story</span>
                    </div>
                    <h2 className="h-section mt-4">{whoWeAre?.heading || "Who We Are"}</h2>
                    <div className="mt-5 max-w-prose2 text-[15px] leading-relaxed text-ink-muted md:text-base [&_p]:mb-4">
                      <PortableText
                        value={whoWeAre.content}
                        components={PortableTextComponents}
                      />
                    </div>
                  </section>
                )}

                {missionAndValues?.enabled && (
                  <section className="border-t border-surface-line pt-10">
                    <h2 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
                      {missionAndValues?.heading || "Our Mission & Values"}
                    </h2>

                    {missionAndValues?.mission && (
                      <div className="mt-5 rounded-lg border-l-[3px] border-accent-500 bg-navy-50 px-5 py-4">
                        <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-navy-800">
                          Our Mission
                        </p>
                        <p className="mt-2 text-[15px] leading-relaxed text-navy-900">
                          {missionAndValues.mission}
                        </p>
                      </div>
                    )}

                    {missionAndValues?.values?.length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-sans text-sm font-bold uppercase tracking-wide text-navy-800">
                          Our Core Values
                        </h3>
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                          {missionAndValues.values.map((value, index) => (
                            <div
                              key={index}
                              className="rounded-xl border border-surface-line p-5"
                            >
                              <h4 className="font-display text-lg font-semibold text-navy-900">
                                {value.title}
                              </h4>
                              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                                {value.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {accordionData.length > 0 && (
                  <div className="border-t border-surface-line pt-10">
                    <Accordion
                      title={faqs?.heading || "Frequently Asked Questions"}
                      accordionData={accordionData}
                      usePadding={false}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section1>

      {ctaSection?.enabled !== false && (
        <Section4>
          <Consultation content={ctaSection} />
        </Section4>
      )}
    </>
  );
};

export default AboutUs;