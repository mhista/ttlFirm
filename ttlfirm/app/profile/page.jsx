import { client } from "@/lib/sanity.client";
import { attorneyProfileQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/blog/PortableTextComponents";
import ImageSection from "@components/pages/profile/imageSection";
import Section1 from "@components/common/section1";
import Section4 from "@components/common/section4";
import Consultation from "@components/pages/home/consult";
import PageHeader from "@components/pages/header";
import Script from "next/script";

export const revalidate = 60;

// Fetch page data
async function getPageData() {
  try {
    const profilePage = await client.fetch(attorneyProfileQuery);
    return profilePage || {};
  } catch (error) {
    console.error("Error fetching attorney profile:", error);
    return {};
  }
}

// Generate metadata from CMS
export async function generateMetadata() {
  const data = await getPageData();
  const seo = data?.seo || {};
  const attorney = data?.attorney || {};
  
  return {
    title: seo.metaTitle || `${attorney.name}, ${attorney.credentials} | Founder & Managing Attorney | NJ Lawyer`,
    description: seo.metaDescription || `Meet ${attorney.name}, experienced NJ attorney with focused practice in personal injury and workers' compensation. Former insurance defense attorney now fighting for clients.`,
    keywords: seo.keywords || [
      attorney.name,
      "New Jersey attorney",
      "personal injury lawyer NJ",
      "workers compensation lawyer",
      "experienced NJ lawyer"
    ],
    openGraph: {
      title: seo.metaTitle || `Attorney ${attorney.name} | Turuchi Law Firm`,
      description: seo.metaDescription || "Results-driven attorney with proven expertise.",
      url: "https://turuchilawfirm.com/profile",
      images: seo.ogImage ? [
        {
          url: urlFor(seo.ogImage).width(1200).height(630).url(),
          width: 1200,
          height: 630
        }
      ] : attorney.profileImage ? [
        {
          url: urlFor(attorney.profileImage).width(1200).height(630).url(),
          width: 1200,
          height: 630
        }
      ] : []
    },
    alternates: {
      canonical: "https://turuchilawfirm.com/profile"
    }
  };
}

// Generate attorney schema
function generateAttorneySchema(data) {
  const attorney = data?.attorney || {};
  const education = data?.education || {};
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": attorney.name,
    "jobTitle": attorney.title,
    "worksFor": {
      "@type": "LegalService",
      "name": "Turuchi Law Firm, LLC"
    },
    "alumniOf": education?.degrees?.map(deg => ({
      "@type": "CollegeOrUniversity",
      "name": deg.institution
    })) || [],
    "telephone": attorney.phone || "+17322106410",
    "email": attorney.email || "info@turuchilawfirm.com",
    "url": "https://turuchilawfirm.com/profile",
    "image": attorney.profileImage ? urlFor(attorney.profileImage).url() : undefined
  };
}

// Component for Practice Area items
const Area = ({ title }) => (
  <li className="flex items-start gap-3 text-[15px] text-ink-muted">
    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
    <span>{title}</span>
  </li>
);

const InfoBlock = ({ heading, children }) => (
  <section className="border-t border-surface-line pt-8">
    <h2 className="font-display text-2xl font-bold text-navy-900">{heading}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

const Profile = async () => {
  const data = await getPageData();

  const attorney = data?.attorney || {};
  const introduction = data?.introduction || {};
  const careerHighlights = data?.careerHighlights || [];
  const practiceAreas = data?.practiceAreas || {};
  const education = data?.education || {};
  const barAdmissions = data?.barAdmissions || {};
  const honorsAndAwards = data?.honorsAndAwards || {};

  const attorneySchema = generateAttorneySchema(data);

  return (
    <>
      <Script
        id="attorney-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }}
      />

      <PageHeader
        eyebrow="Attorney Profile"
        text="Meet Our"
        text2="Founder"
        description={
          attorney?.name
            ? `${attorney.name}${attorney.title ? ` — ${attorney.title}` : ""}`
            : "The attorney who will handle your case, and the experience behind it."
        }
        image="/assets/images/lawyer2.jpg"
        breadcrumbs={[{ label: "Attorney Profile" }]}
      />

      <Section1>
        <div className="container-x section-y">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Portrait + contact card */}
            {attorney?.profileImage && (
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <ImageSection
                    image={urlFor(attorney.profileImage).width(720).url()}
                    name={attorney.name}
                    title={attorney.title}
                    email={attorney.email}
                    phone={attorney.phone}
                  />
                </div>
              </div>
            )}

            {/* Biography */}
            <div className={attorney?.profileImage ? "lg:col-span-8" : "lg:col-span-12"}>
              <div className="space-y-10">
                {introduction?.content && (
                  <section>
                    <div className="flex items-center gap-3">
                      <span className="rule" aria-hidden="true" />
                      <span className="eyebrow">About</span>
                    </div>
                    <h2 className="h-section mt-4">
                      {introduction?.heading || "Meet Our Founder"}
                    </h2>
                    <div className="mt-5 max-w-prose2 text-[15px] leading-relaxed text-ink-muted md:text-base [&_p]:mb-4">
                      <PortableText
                        value={introduction.content}
                        components={PortableTextComponents}
                      />
                    </div>
                  </section>
                )}

                {careerHighlights?.length > 0 &&
                  careerHighlights.map((highlight, index) => (
                    <InfoBlock key={index} heading={highlight.heading}>
                      <div className="max-w-prose2 text-[15px] leading-relaxed text-ink-muted [&_p]:mb-4">
                        <PortableText
                          value={highlight.content}
                          components={PortableTextComponents}
                        />
                      </div>
                    </InfoBlock>
                  ))}

                {practiceAreas?.areas?.length > 0 && (
                  <InfoBlock heading={practiceAreas?.heading || "Practice Areas"}>
                    <ul className="space-y-2.5">
                      {practiceAreas.areas.map((area, index) => (
                        <Area key={index} title={area} />
                      ))}
                    </ul>
                  </InfoBlock>
                )}

                {education?.degrees?.length > 0 && (
                  <InfoBlock heading={education?.heading || "Education"}>
                    <ul className="space-y-2.5">
                      {education.degrees.map((degree, index) => (
                        <Area
                          key={index}
                          title={`${degree.institution} ${degree.degree}${
                            degree.year ? ` (${degree.year})` : ""
                          }`}
                        />
                      ))}
                    </ul>
                  </InfoBlock>
                )}

                {barAdmissions?.admissions?.length > 0 && (
                  <InfoBlock heading={barAdmissions?.heading || "Bar Admissions"}>
                    <ul className="space-y-2.5">
                      {barAdmissions.admissions.map((admission, index) => (
                        <Area key={index} title={admission} />
                      ))}
                    </ul>
                  </InfoBlock>
                )}

                {honorsAndAwards?.items?.length > 0 && (
                  <InfoBlock heading={honorsAndAwards?.heading || "Honors & Awards"}>
                    <div className="space-y-6">
                      {honorsAndAwards.items.map((item, index) => (
                        <div key={index}>
                          <h3 className="font-sans text-base font-bold text-navy-900">
                            {item.title}
                          </h3>
                          {item.organization && (
                            <p className="mt-0.5 text-sm text-ink-soft">
                              {item.organization}
                              {item.year && ` — ${item.year}`}
                            </p>
                          )}
                          {item.description && (
                            <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </InfoBlock>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section1>

      <Section4>
        <Consultation />
      </Section4>
    </>
  );
};

export default Profile;
