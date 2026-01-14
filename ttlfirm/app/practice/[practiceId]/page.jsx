// ===========================================
// app/practice/[practiceId]/page.jsx - UPDATED
// ===========================================
import { client } from "@/lib/sanity.client";
import { practiceAreasQuery, subServicesByPracticeQuery } from "@/lib/sanity.queries";
import Section2 from "@/components/common/section2";
import Section4 from "@/components/common/section4";
import Consultation from "@/components/pages/home/consult";
import PageHeader from "@/components/pages/header";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

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
  const practiceAreas = await client.fetch(practiceAreasQuery);
  const area = practiceAreas.find(
    (a) => a.id?.toString() === practiceId || a.slug.current === practiceId
  );

  if (!area) {
    return { title: "Practice Area Not Found" };
  }

  return {
    title: `${area.name} | Turuchi Law Firm`,
    description: area.description || `Expert ${area.name} legal services in New Jersey`,
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

  return (
    <div className="relative">
      <PageHeader text={practiceArea.name} subAreas={[]} />

      <Section2>
        <div className="w-full flex flex-col items-center gap-12 py-12 px-5 md:px-12">
          {/* Practice Area Description */}
          <div className="max-w-4xl text-center">
            <h2 className="font-lora text-3xl md:text-4xl font-bold mb-6">
              {practiceArea.name}
            </h2>
            <p className="text-lg text-gray-600">
              {practiceArea.description || `Expert legal services in ${practiceArea.name}`}
            </p>
          </div>

          {/* Sub-Services Grid */}
          {subServices && subServices.length > 0 ? (
            <>
              <div className="w-full max-w-6xl">
                <h3 className="font-lora text-2xl font-semibold mb-8 text-center">
                  Our Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {subServices.map((service) => (
                    <Link
                      key={service._id}
                      href={`/practice/${practiceId}/${service.slug.current}`}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Service Image (if you have one) */}
                      {service.image && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <img
                            src={urlFor(service.image).width(600).height(400).url()}
                            alt={service.image.alt || service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        <h4 className="font-lora text-xl font-semibold mb-3 group-hover:text-amber-600 transition">
                          {service.title}
                        </h4>
                        
                        {service.excerpt && (
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {service.excerpt}
                          </p>
                        )}

                        {/* Counties Served */}
                        {service.counties && service.counties.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {service.counties.slice(0, 3).map((county) => (
                              <span
                                key={county.slug.current}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
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

                        <div className="mt-4 text-amber-600 font-semibold text-sm flex items-center gap-2">
                          Learn More
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Contact us to learn more about our {practiceArea.name} services.
              </p>
              <Link href="/contact" className="btn mt-6 inline-block">
                Get in Touch
              </Link>
            </div>
          )}

          {/* General Practice Area Info */}
          <div className="max-w-4xl bg-gray-50 rounded-lg p-8 mt-8">
            <h3 className="font-lora text-2xl font-semibold mb-4">
              Why Choose Turuchi Law Firm?
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Experienced Representation</h4>
                <p className="text-sm">
                  Years of experience handling {practiceArea.name} cases throughout New Jersey.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Personalized Service</h4>
                <p className="text-sm">
                  Every case receives individual attention and a customized legal strategy.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Aggressive Advocacy</h4>
                <p className="text-sm">
                  We fight tirelessly to protect your rights and secure the best outcome.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Free Consultation</h4>
                <p className="text-sm">
                  Discuss your case with an experienced attorney at no cost.
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
  );
}