import { client } from "@/lib/sanity.client";
import { practiceAreasQuery, subServicesByPracticeQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import Section2 from "@/components/common/section2";
import Section4 from "@/components/common/section4";
import Consultation from "@/components/pages/home/consult";
import PageHeader from "@/components/pages/header";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

export const revalidate = 60;

export async function generateStaticParams() {
  const practiceAreas = await client.fetch(practiceAreasQuery);
  return practiceAreas.map((area) => ({
    practiceId: area.id?.toString() || area.slug.current,
  }));
}

export async function generateMetadata({ params }) {
  const { practiceId } = await params;
  const practiceAreas = await client.fetch(practiceAreasQuery);
  const area = practiceAreas.find(
    (a) => a.id?.toString() === practiceId || a.slug.current === practiceId
  );

  if (!area) {
    return { title: "Practice Area Not Found" };
  }

  return {
    title: `${area.name} Attorney New Jersey | Turuchi Law Firm`,
    description: area.description || `Expert ${area.name} legal services serving all New Jersey counties including Essex, Union, Hudson, Middlesex, Bergen, Passaic, and Mercer County.`,
    keywords: [
      `${area.name} lawyer NJ`,
      `${area.name} attorney New Jersey`,
      "Essex County lawyer",
      "Union County attorney",
      "Hudson County legal services"
    ],
    openGraph: {
      title: `${area.name} | Turuchi Law Firm`,
      description: area.description,
      url: `https://turuchilawfirm.com/practice/${practiceId}`,
    },
  };
}

async function getPracticeArea(practiceId) {
  const practiceAreas = await client.fetch(practiceAreasQuery);
  return practiceAreas.find(
    (a) => a.id?.toString() === practiceId || a.slug.current === practiceId
  );
}

async function getSubServices(practiceAreaRef) {
  const subServices = await client.fetch(subServicesByPracticeQuery, {
    practiceAreaId: practiceAreaRef,
  });
  return subServices;
}

export default async function PracticeAreaPage({ params }) {
  const { practiceId } = await params;
  const practiceArea = await getPracticeArea(practiceId);

  if (!practiceArea) {
    notFound();
  }

  const subServices = await getSubServices(practiceArea._id);

  // Schema for SEO
  const practiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": practiceArea.name,
    "provider": {
      "@type": "LegalService",
      "name": "Turuchi Law Firm, LLC"
    },
    "areaServed": {
      "@type": "State",
      "name": "New Jersey"
    }
  };

  return (
    <>
      <Script
        id="practice-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(practiceSchema) }}
      />

      <div className="relative">
        <PageHeader text={practiceArea.name} subAreas={[]} />

        <Section2>
          <div className="w-full flex flex-col items-center gap-12 py-12 px-5 md:px-12 lg:px-16">
            {/* Practice Area Description - REDESIGNED FOR LONG CONTENT */}
            <div className="max-w-5xl w-full">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h2 className="font-lora text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
                  {practiceArea.name}
                </h2>
                
                {/* Long Description - Now with Better Typography */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {practiceArea.description || 
                      `Expert ${practiceArea.name} legal services serving all New Jersey counties. 
                      Our experienced attorneys provide comprehensive representation for clients 
                      throughout Essex County, Union County, Hudson County, Middlesex County, 
                      Bergen County, Passaic County, and Mercer County. With a proven track 
                      record of success and personalized attention to every case, we are 
                      committed to protecting your rights and achieving the best possible outcome 
                      for your legal matter.`
                    }
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">
                      {subServices.length}+
                    </div>
                    <div className="text-sm text-gray-600">Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">7</div>
                    <div className="text-sm text-gray-600">NJ Counties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">500+</div>
                    <div className="text-sm text-gray-600">Cases Handled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-1">8</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-Services Grid */}
            {subServices && subServices.length > 0 ? (
              <div className="w-full max-w-7xl">
                <div className="text-center mb-10">
                  <h3 className="font-lora text-3xl md:text-4xl font-bold mb-3">
                    Our {practiceArea.name} Services
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Comprehensive legal representation across all areas of {practiceArea.name.toLowerCase()}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {subServices.map((service) => (
                    <Link
                      key={service._id}
                      href={`/practice/${practiceId}/${service.slug.current}`}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                    >
                      {service.image && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <img
                            src={urlFor(service.image).width(600).height(400).url()}
                            alt={service.image.alt || service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                      )}

                      <div className="p-6">
                        <h4 className="font-lora text-xl font-semibold mb-3 group-hover:text-amber-600 transition">
                          {service.title}
                        </h4>
                        
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
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-600 text-lg mb-6">
                  Contact us to learn more about our {practiceArea.name} services.
                </p>
                <Link href="/contact" className="btn">
                  Get in Touch
                </Link>
              </div>
            )}

            {/* Why Choose Us Section */}
            <div className="w-full max-w-6xl bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 shadow-lg">
              <h3 className="font-lora text-3xl font-bold mb-8 text-center">
                Why Choose Turuchi Law Firm for {practiceArea.name}?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-lg mb-3 text-amber-600">Experienced Representation</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Years of experience handling {practiceArea.name} cases throughout New Jersey with a proven track record of successful outcomes.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-lg mb-3 text-amber-600">Personalized Service</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Every case receives individual attention and a customized legal strategy tailored to your unique circumstances and goals.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-lg mb-3 text-amber-600">Aggressive Advocacy</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    We fight tirelessly to protect your rights and secure the best possible outcome, whether through negotiation or litigation.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h4 className="font-semibold text-lg mb-3 text-amber-600">Free Consultation</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Discuss your case with an experienced attorney at no cost. Call 732-210-6410 to schedule your free consultation today.
                  </p>
                </div>
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