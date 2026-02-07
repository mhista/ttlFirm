import { client } from "@/lib/sanity.client";
import { aboutPageQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/blog/PortableTextComponents";
import Accordion from "@components/uiComponents/accordion";
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
    title: seo.metaTitle || "About Turuchi Law Firm | Experienced New Jersey Attorneys",
    description: seo.metaDescription || "Learn about our commitment to justice, compassion, and exceptional legal representation. Serving NJ with expertise in Personal Injury, Immigration, Workers' Comp & more.",
    keywords: seo.keywords || [
      "about Turuchi Law Firm",
      "New Jersey law firm",
      "experienced attorneys NJ",
      "legal services New Jersey",
      "compassionate lawyers"
    ],
    openGraph: {
      title: seo.metaTitle || "About Us | Turuchi Law Firm",
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
    "name": "Turuchi Law Firm, LLC",
    "description": whoWeAre?.content?.[0]?.children?.[0]?.text || "Expert legal representation in Personal Injury, Immigration, Workers' Compensation, and Municipal Court matters.",
    "url": "https://turuchilawfirm.com/about",
    "telephone": "+17322106410",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "111 Town Square Pl",
      "addressLocality": "Jersey City",
      "addressRegion": "NJ",
      "postalCode": "07310"
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

      <div className="z-[60] bg-white">
        <PageHeader 
          text={pageHeader?.heading || "About"} 
          text2={pageHeader?.headingHighlight || "Us"}
          image={pageHeader?.backgroundImage ? urlFor(pageHeader.backgroundImage).url() : undefined}
        />

        <div className="relative w-full flex flex-col md:flex-row justify-center md:items-start md:justify-around items-center pt-6 md:py-8 md:gap-7 md:px-7 z-[60] bg-white">
          {/* Image Section */}
          {whoWeAre?.mainImage && (
            <ImageSection 
              image={urlFor(whoWeAre.mainImage).url()} 
              alt={whoWeAre.mainImage.alt}
            />
          )}

          <div className="md:w-full">
            {/* Who We Are Section */}
            {whoWeAre?.content && (
              <div className="sm:p-16 md:p-0 w-full mb-10">
                <div className="flex flex-col gap-4 p-8 sm:pt-0">
                  <h1 className="font-lora text-2xl font-medium">
                    {whoWeAre?.heading || "Who We Are"}
                  </h1>
                  <div className="prose prose-lg max-w-none text-gray-500">
                    <PortableText 
                      value={whoWeAre.content} 
                      components={PortableTextComponents}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mission & Values Section (Optional) */}
            {missionAndValues?.enabled && (
              <div className="sm:p-16 md:p-0 w-full mb-10">
                <div className="flex flex-col gap-4 p-8">
                  <h1 className="font-lora text-2xl font-medium">
                    {missionAndValues?.heading || "Our Mission & Values"}
                  </h1>
                  {missionAndValues?.mission && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
                      <p className="text-gray-500">{missionAndValues.mission}</p>
                    </div>
                  )}
                  {missionAndValues?.values && missionAndValues.values.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Our Core Values</h3>
                      <div className="grid gap-4">
                        {missionAndValues.values.map((value, index) => (
                          <div key={index} className="border-l-4 border-amber-600 pl-4">
                            <h4 className="font-semibold text-base mb-1">{value.title}</h4>
                            <p className="text-gray-500 text-sm">{value.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* FAQs Section */}
            {accordionData.length > 0 && (
              <Accordion
                title={faqs?.heading || "Frequently Asked Questions"}
                accordionData={accordionData}
                usePadding={true}
              />
            )}
          </div>
        </div>

        {/* CTA Section */}
        {ctaSection?.enabled !== false && (
          <Section4>
            <Consultation content={ctaSection} />
          </Section4>
        )}
      </div>
    </>
  );
};

export default AboutUs;