import { client } from "@/lib/sanity.client";
import {
  subServiceBySlugQuery,
  practiceAreasQuery,
} from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/blog/PortableTextComponents";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section4 from "@/components/common/section4";
import Consultation from "@/components/pages/home/consult";
import Accordion from "@/components/uiComponents/accordion";
import { FaArrowRightLong } from "react-icons/fa6";
import SEOHead from "@/components/SEOHead";
import { generateLocalBusinessSchema } from "@/lib/seo";

export const revalidate = 60;

// Generate static paths
export async function generateStaticParams() {
  const practiceAreas = await client.fetch(practiceAreasQuery);

  const paths = [];
  for (const area of practiceAreas) {
    if (area.subServices) {
      for (const service of area.subServices) {
        paths.push({
          practiceId: area.id?.toString() || area.slug.current,
          subService: service.slug.current,
        });
      }
    }
  }

  return paths;
}

// Generate metadata

export async function generateMetadata({ params }) {
  const { subService: subServiceSlug } = await params; // ← FIX: Await params
  const subService = await client.fetch(subServiceBySlugQuery, {
    slug: subServiceSlug,
  });

  if (!subService) {
    return { title: "Service Not Found" };
  }

  return {
    title:
      subService.seo?.metaTitle ||
      `${subService.title} | ${subService.practiceArea?.name} | Turuchi Law Firm`,
    description: subService.seo?.metaDescription || subService.excerpt,
    keywords: subService.seo?.keywords?.join(", "),
    openGraph: {
      title: subService.seo?.metaTitle || subService.title,
      description: subService.seo?.metaDescription || subService.excerpt,
      images: subService.seo?.ogImage
        ? [urlFor(subService.seo.ogImage).width(1200).height(630).url()]
        : subService.image
          ? [urlFor(subService.image).width(1200).height(630).url()]
          : [],
    },
  };
}

async function getSubService(slug) {
  const subService = await client.fetch(subServiceBySlugQuery, { slug });
  return subService;
}

async function getPracticeAreas() {
  const areas = await client.fetch(practiceAreasQuery);
  return areas;
}

export default async function SubServicePage({ params }) {
  const { subService: subServiceSlug } = await params;
  const [subService, practiceAreas] = await Promise.all([
    getSubService(subServiceSlug),
    getPracticeAreas(),
  ]);

  if (!subService) {
    notFound();
  }

  // Generate structured data schema for SEO
  const schema = generateLocalBusinessSchema(
    subService,
    subService.counties?.[0]
  );

  // Convert FAQs to accordion format
  const accordionData =
    subService.faqs?.map((faq) => ({
      title: faq.question,
      content: (
        <PortableText value={faq.answer} components={PortableTextComponents} />
      ),
    })) || [];

  return (
    <>
      {/* SEO Schema Markup */}
      <SEOHead schema={schema} />

      <div className="w-full flex flex-col">
        {/* Header */}
        <div className="relative w-full h-[400px] bg-gradient-to-r from-gray-900 to-gray-800">
          {subService.image && (
            <Image
              src={urlFor(subService.image).width(1920).height(600).url()}
              alt={subService.image.alt || subService.title}
              fill
              className="object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
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
              <Link
                href={`/practice/${
                  subService.practiceArea?.id ||
                  subService.practiceArea?.slug.current
                }`}
                className="hover:text-amber-600"
              >
                {subService.practiceArea?.name}
              </Link>
              <span>/</span>
              <span>{subService.title}</span>
            </nav>

            <h1 className="font-lora text-4xl md:text-5xl font-bold text-center px-4">
              {subService.title}
            </h1>

            {/* Counties */}
            {subService.counties && subService.counties.length > 0 && (
              <div className="mt-4 flex gap-2 flex-wrap justify-center">
                {subService.counties.map((county) => (
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
        <div className="relative w-full flex flex-col md:flex-row-reverse justify-center items-start md:justify-around md:pl-5 py-12">
          {/* Main Content */}
          <div className="flex flex-col w-full md:w-[70%] p-8 sm:p-16 md:px-12 gap-8">
            {/* Overview */}
            {subService.overview && (
              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={subService.overview}
                  components={PortableTextComponents}
                />
              </div>
            )}

            {/* Why Choose Us */}
            {subService.whyChooseUs && (
              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="font-lora text-3xl font-bold mb-6">
                  Why Choose Turuchi Law Firm
                </h2>
                <div className="prose prose-lg max-w-none">
                  <PortableText
                    value={subService.whyChooseUs}
                    components={PortableTextComponents}
                  />
                </div>
              </div>
            )}

            {/* Process Steps */}
            {subService.process && subService.process.length > 0 && (
              <div>
                <h2 className="font-lora text-3xl font-bold mb-6">
                  Our Process
                </h2>
                <div className="space-y-6">
                  {subService.process.map((step, index) => (
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
            {subService.countyContent &&
              subService.countyContent.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-lora text-3xl font-bold mb-6">
                    County-Specific Information
                  </h2>
                  <div className="space-y-6">
                    {subService.countyContent.map((item, index) => (
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

            {/* Related Services */}
            {subService.relatedServices &&
              subService.relatedServices.length > 0 && (
                <div className="mt-8">
                  <h2 className="font-lora text-3xl font-bold mb-6">
                    Related Services
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {subService.relatedServices.map((service) => (
                      <Link
                        key={service._id}
                        href={`/practice/${subService.practiceArea?.id}/${service.slug.current}`}
                        className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition group"
                      >
                        <h3 className="font-lora text-xl font-semibold mb-2 group-hover:text-amber-600 transition">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">
                          {service.excerpt}
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
              <h2 className="font-lora text-2xl font-medium">Practice Areas</h2>
              {practiceAreas.map((area) => (
                <div className="w-full flex flex-col gap-4" key={area._id}>
                  <hr className="w-full h-[1.5px] bg-amber-600 opacity-20" />
                  <Link
                    href={`/practice/${area.id || area.slug.current}`}
                    className="hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row transition-all duration-300 gap-3 items-center font-medium text-base"
                  >
                    <FaArrowRightLong className="text-xs" />
                    <span>{area.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Section4>
          <Consultation />
        </Section4>
      </div>
    </>
  );
}
