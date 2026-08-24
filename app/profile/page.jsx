import { client } from "@/lib/sanity.client";
import { attorneyProfileQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/blog/PortableTextComponents";
import ImageSection from "@components/pages/profile/imageSection";
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
    description: seo.metaDescription || `Meet ${attorney.name}, experienced NJ attorney with expertise in Personal Injury, Immigration & Workers' Compensation. Former insurance defense attorney now fighting for clients.`,
    keywords: seo.keywords || [
      attorney.name,
      "New Jersey attorney",
      "personal injury lawyer NJ",
      "immigration attorney",
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
const Area = ({ title }) => {
  return (
    <span className="flex gap-2 items-center opacity-85">
      <div className="h-[13px] w-[13px] rounded-full border-2 border-gray-600 flex justify-center items-center">
        <div className="h-[5px] w-[5px] rounded-full bg-gray-600"></div>
      </div>
      <p className="text-gray-600">{title}</p>
    </span>
  );
};

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
      
      <div>
        <PageHeader 
          text="Meet Our" 
          text2="Founder" 
        />
        
        <div className="relative w-full flex flex-col md:flex-row justify-center md:items-start md:justify-around items-center pt-6 md:py-8 md:gap-7 md:px-7 z-[60] bg-white">
          {/* Image Section */}
          {attorney?.profileImage && (
            <ImageSection 
              image={urlFor(attorney.profileImage).url()}
              name={attorney.name}
              title={attorney.title}
              email={attorney.email}
              phone={attorney.phone}
            />
          )}
          
          <div className="md:w-full">
            {/* Introduction */}
            {introduction?.content && (
              <div className="sm:p-16 md:p-0 w-full">
                <div className="flex flex-col gap-4 p-8 sm:pt-0">
                  <h1 className="font-lora text-2xl font-medium">
                    {introduction?.heading || "Meet Our Founder"}
                  </h1>
                  <div className="prose prose-lg max-w-none text-gray-500 text-justify">
                    <PortableText 
                      value={introduction.content} 
                      components={PortableTextComponents}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Career Highlights */}
            {careerHighlights && careerHighlights.length > 0 && (
              <div className="flex flex-col p-8 gap-8">
                {careerHighlights.map((highlight, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <h1 className="font-lora text-xl font-medium">
                      {highlight.heading}
                    </h1>
                    <div className="prose prose-lg max-w-none text-gray-500 text-justify">
                      <PortableText 
                        value={highlight.content} 
                        components={PortableTextComponents}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Practice Areas */}
            {practiceAreas?.areas && practiceAreas.areas.length > 0 && (
              <div className="flex flex-col p-8 gap-4">
                <h1 className="font-lora text-2xl font-medium">
                  {practiceAreas?.heading || "Practice Areas"}
                </h1>
                {practiceAreas.areas.map((area, index) => (
                  <Area key={index} title={area} />
                ))}
              </div>
            )}
            
            <span className="flex justify-center items-center md:justify-center">
              <hr className="w-[90%] opacity-85 bg-amber-600 my-5" />
            </span>
            
            {/* Education */}
            {education?.degrees && education.degrees.length > 0 && (
              <div className="flex flex-col p-8 gap-4">
                <h1 className="font-lora text-2xl font-medium">
                  {education?.heading || "Education"}
                </h1>
                {education.degrees.map((degree, index) => (
                  <p key={index} className="text-gray-500">
                    {degree.institution} {degree.degree} {degree.year && `(${degree.year})`}
                  </p>
                ))}
              </div>
            )}
            
            <span className="flex justify-center items-center md:justify-center my-5">
              <hr className="w-[90%] opacity-85 bg-amber-600" />
            </span>
            
            {/* Bar Admissions */}
            {barAdmissions?.admissions && barAdmissions.admissions.length > 0 && (
              <div className="flex flex-col p-8 gap-4">
                <h1 className="font-lora text-2xl font-medium">
                  {barAdmissions?.heading || "Bar Admission"}
                </h1>
                {barAdmissions.admissions.map((admission, index) => (
                  <p key={index} className="text-gray-500">
                    {admission}
                  </p>
                ))}
              </div>
            )}

            {/* Honors & Awards */}
            {honorsAndAwards?.items && honorsAndAwards.items.length > 0 && (
              <div className="flex flex-col p-8 gap-4">
                <h1 className="font-lora text-2xl font-medium">
                  {honorsAndAwards?.heading || "Honors & Awards"}
                </h1>
                {honorsAndAwards.items.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    {item.organization && (
                      <p className="text-sm text-gray-600">{item.organization} {item.year && `- ${item.year}`}</p>
                    )}
                    {item.description && (
                      <p className="text-gray-500">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <Section4>
          <Consultation />
        </Section4>
      </div>
    </>
  );
};

export default Profile;