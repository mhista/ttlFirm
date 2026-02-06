// ===========================================
// app/practice/[practiceId]/page.jsx - COMPLETE REDESIGN
// ===========================================
import { client } from "@/lib/sanity.client";
import { practiceAreaByIdQuery, practiceAreasQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/blog/PortableTextComponents";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section2 from "@/components/common/section2";
import Section4 from "@/components/common/section4";
import Consultation from "@/components/pages/home/consult";
import Accordion from "@/components/uiComponents/accordion";
import { FaArrowRightLong } from "react-icons/fa6";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema } from "@/lib/seo";
import Script from "next/script";

export const revalidate = 60; // Always fetch fresh data

// Generate static paths
export async function generateStaticParams() {
  const practiceAreas = await client.fetch(practiceAreasQuery);
  return practiceAreas.map((area) => ({
    practiceId: area.id?.toString() || area.slug.current,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { practiceId } = await params;
  const practiceArea = await client.fetch(practiceAreaByIdQuery, {
    practiceId: parseInt(practiceId) || practiceId,
  });

  if (!practiceArea) {
    return { title: "Practice Area Not Found" };
  }

  return {
    title:
      practiceArea.seo?.metaTitle ||
      `${practiceArea.name} Attorney NJ | Turuchi Law Firm`,
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
  const practiceArea = await client.fetch(practiceAreaByIdQuery, {
    practiceId: parseInt(practiceId) || practiceId,
  });

  if (!practiceArea) {
    notFound();
  }

  // Generate schema for SEO - FIXED VERSION
  const schemaData = {
    name: practiceArea.name,
    title: practiceArea.name, // Added for consistency
    slug: practiceArea.slug,
    id: practiceArea.id,
    excerpt: practiceArea.excerpt,
    image: practiceArea.image,
    seo: practiceArea.seo,
    // Don't include practiceArea field since this IS a practice area
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
        {/* Header with Image */}
        <div className="relative w-full h-[400px] bg-gradient-to-r from-gray-900 to-gray-800">
          {practiceArea.image && (
            <Image
              src={urlFor(practiceArea.image).width(1920).height(600).url()}
              alt={practiceArea.image.alt || practiceArea.name}
              fill
              className="object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 px-4">
            {/* Breadcrumbs */}
            <nav className="flex gap-2 text-sm mb-4">
              <Link href="/" className="hover:text-amber-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/practice" className="hover:text-amber-600">
                Practice Areas
              </Link>
              <span>/</span>
              <span>{practiceArea.name}</span>
            </nav>

            <h1 className="font-lora text-4xl md:text-5xl font-bold text-center mb-4">
              {practiceArea.name}
            </h1>

            {practiceArea.excerpt && (
              <p className="text-xl text-gray-200 text-center max-w-3xl">
                {practiceArea.excerpt}
              </p>
            )}

            {/* Counties */}
            {practiceArea.counties && practiceArea.counties.length > 0 && (
              <div className="mt-6 flex gap-2 flex-wrap justify-center">
                {practiceArea.counties.map((county) => (
                  <span
                    key={county.slug.current}
                    className="bg-amber-600 text-white px-3 py-1 text-sm rounded"
                  >
                    {county.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <Section2>
          <div className="relative w-full flex flex-col md:flex-row-reverse justify-center items-start md:justify-around md:pl-5 py-12">
            {/* Main Content */}
            <div className="flex flex-col w-full md:w-[70%] p-8 sm:p-16 md:px-12 gap-8">
              {/* Overview */}
              {practiceArea.overview && (
                <div className="prose prose-lg max-w-none">
                  <PortableText
                    value={practiceArea.overview}
                    components={PortableTextComponents}
                  />
                </div>
              )}

              {/* Why Choose Us */}
              {practiceArea.whyChooseUs && (
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h2 className="font-lora text-3xl font-bold mb-6">
                    Why Choose Turuchi Law Firm for {practiceArea.name}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <PortableText
                      value={practiceArea.whyChooseUs}
                      components={PortableTextComponents}
                    />
                  </div>
                </div>
              )}

              {/* Process Steps */}
              {practiceArea.process && practiceArea.process.length > 0 && (
                <div>
                  <h2 className="font-lora text-3xl font-bold mb-6">
                    Our Process
                  </h2>
                  <div className="space-y-6">
                    {practiceArea.process.map((step, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-6 bg-white rounded-lg shadow-md"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-lora text-xl font-semibold mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-700">{step.description}</p>
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
                    <h2 className="font-lora text-3xl font-bold mb-6">
                      County-Specific Information
                    </h2>
                    <div className="space-y-6">
                      {practiceArea.countyContent.map((item, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-amber-600 pl-6"
                        >
                          <h3 className="font-lora text-2xl font-semibold mb-4">
                            {item.county.name}
                          </h3>
                          {item.localStats && (
                            <div className="bg-blue-50 p-4 rounded mb-4">
                              <p className="text-sm font-semibold text-blue-900">
                                Local Statistics:
                              </p>
                              <p className="text-gray-700">{item.localStats}</p>
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

              {/* Sub-Services Section */}
              {practiceArea.subServices &&
                practiceArea.subServices.length > 0 && (
                  <div className="mt-12">
                    <h2 className="font-lora text-3xl font-bold mb-6">
                      Our {practiceArea.name} Services
                    </h2>
                    <p className="text-gray-600 mb-8">
                      We offer comprehensive legal services across all areas of{" "}
                      {practiceArea.name.toLowerCase()}
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {practiceArea.subServices.map((service) => (
                        <Link
                          key={service._id}
                          href={`/practice/${practiceId}/${service.slug.current}`}
                          className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                        >
                          {service.image && (
                            <div className="relative w-full h-48 overflow-hidden">
                              <Image
                                src={urlFor(service.image)
                                  .width(600)
                                  .height(400)
                                  .url()}
                                alt={service.image.alt || service.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                          )}

                          <div className="p-6">
                            <h3 className="font-lora text-xl font-semibold mb-3 group-hover:text-amber-600 transition">
                              {service.title}
                            </h3>

                            {service.excerpt && (
                              <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                                {service.excerpt}
                              </p>
                            )}

                            {service.counties && service.counties.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {service.counties.slice(0, 3).map((county) => (
                                  <span
                                    key={county.slug.current}
                                    className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-medium"
                                  >
                                    {county.name}
                                  </span>
                                ))}
                                {service.counties.length > 3 && (
                                  <span className="text-xs text-gray-500">
                                    +{service.counties.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="flex items-center text-amber-600 font-semibold text-sm gap-2 group-hover:gap-3 transition-all">
                              Learn More
                              <span>→</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Related Practice Areas */}
              {practiceArea.relatedAreas &&
                practiceArea.relatedAreas.length > 0 && (
                  <div className="mt-12">
                    <h2 className="font-lora text-3xl font-bold mb-6">
                      Related Practice Areas
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {practiceArea.relatedAreas.map((area) => (
                        <Link
                          key={area._id}
                          href={`/practice/${area.id || area.slug.current}`}
                          className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition group"
                        >
                          <h3 className="font-lora text-xl font-semibold mb-2 group-hover:text-amber-600 transition">
                            {area.name}
                          </h3>
                          <p className="text-gray-600 line-clamp-2">
                            {area.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-[30%] p-8">
              <div className="w-full flex flex-col gap-5 md:sticky md:top-24">
                <h2 className="font-lora text-2xl font-medium">
                  Practice Areas
                </h2>
                {/* This will be populated with all practice areas */}
                <PracticeAreaSidebar currentId={practiceId} />
              </div>
            </div>
          </div>
        </Section2>

        <Section4>
          <Consultation />
        </Section4>
      </div>
    </>
  );
}

// Sidebar Component
async function PracticeAreaSidebar({ currentId }) {
  const practiceAreas = await client.fetch(practiceAreasQuery);

  return (
    <>
      {practiceAreas.map((area) => (
        <div className="w-full flex flex-col gap-4" key={area._id}>
          <hr className="w-full h-[1.5px] bg-amber-600 opacity-20" />
          <Link
            href={`/practice/${area.id || area.slug.current}`}
            className={`hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row transition-all duration-300 gap-3 items-center font-medium text-base ${
              (area.id?.toString() === currentId ||
                area.slug.current === currentId)
                ? "text-amber-600 ml-2"
                : ""
            }`}
          >
            <FaArrowRightLong className="text-xs" />
            <span>{area.name}</span>
          </Link>
        </div>
      ))}
    </>
  );
}