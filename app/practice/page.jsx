import PracticeArea from "@components/pages/home/practiceAreas";
import Section2 from "@components/common/section2";
import Section4 from "@components/common/section4";
import Consultation from "@components/pages/home/consult";
import PageHeader from "@components/pages/header";
import Script from "next/script";
import { client } from "@/lib/sanity.client";
import { practiceAreasQuery } from "@/lib/sanity.queries";

export const revalidate = 60;

export const metadata = {
  title: "Practice Areas | Personal Injury, Immigration & Workers' Comp Lawyer NJ",
  description: "Comprehensive legal services in NJ: Personal Injury, Immigration Law, Workers' Compensation, Municipal Court Defense. Serving Essex, Union, Hudson & all NJ counties.",
  keywords: [
    "NJ practice areas",
    "personal injury lawyer",
    "immigration attorney NJ",
    "workers compensation lawyer",
    "municipal court defense",
    "legal services New Jersey"
  ],
  openGraph: {
    title: "Our Practice Areas | Turuchi Law Firm",
    description: "Expert legal representation across multiple practice areas serving all New Jersey counties.",
    url: "https://turuchilawfirm.com/practice",
    images: [{ url: "/assets/images/inju.jpg", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://turuchilawfirm.com/practice"
  }
};

const practiceAreasSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Legal Services",
  "provider": {
    "@type": "LegalService",
    "name": "Turuchi Law Firm, LLC"
  },
  "areaServed": {
    "@type": "State",
    "name": "New Jersey"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Legal Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Personal Injury Law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Immigration Law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Workers' Compensation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Municipal Court Matters" } }
    ]
  }
};

// ✅ NOW ASYNC — fetches data server-side and passes as prop
const PracticeAreasPage = async () => {
  // Fetch here so we can pass data as a plain prop to the client-safe component
  let practiceAreas = [];
  try {
    practiceAreas = await client.fetch(practiceAreasQuery) ?? [];
  } catch (error) {
    console.error("Error fetching practice areas:", error);
  }

  return (
    <>
      <Script
        id="practice-areas-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(practiceAreasSchema) }}
      />
      <div className="relative">
        <PageHeader text={"Our Practice"} text2={"Areas"} subAreas={[]} />
        <Section2>
          {/* Pass fetched data as prop — no async needed inside PracticeArea */}
          <PracticeArea practiceAreas={practiceAreas} />
        </Section2>
        <Section4>
          <Consultation />
        </Section4>
      </div>
    </>
  );
};

export default PracticeAreasPage;