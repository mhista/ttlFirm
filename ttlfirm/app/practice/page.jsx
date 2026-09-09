import Script from "next/script";

import PracticeArea from "@components/pages/home/practiceAreas";
import Section1 from "@components/common/section1";
import Section4 from "@components/common/section4";
import Consultation from "@components/pages/home/consult";
import PageHeader from "@components/pages/header";
import { client } from "@/lib/sanity.client";
import { practiceAreasQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import { filterRetiredAreas } from "@/lib/siteNav";

export const revalidate = 60;

export const metadata = {
  title: "Practice Areas | NJ Personal Injury & Workers' Compensation Lawyer",
  description:
    "Personal injury and workers' compensation representation across New Jersey — car and truck accidents, slip and fall, wrongful death, and on-the-job injury claims. Free consultation.",
  keywords: [
    "NJ personal injury lawyer",
    "New Jersey workers compensation attorney",
    "car accident attorney NJ",
    "truck accident lawyer New Jersey",
    "slip and fall lawyer NJ",
    "workplace injury attorney New Jersey",
  ],
  openGraph: {
    title: "Practice Areas | Turuchi Law Firm",
    description:
      "Focused representation in personal injury and workers' compensation for clients across New Jersey.",
    url: "https://turuchilawfirm.com/practice",
    images: [{ url: "/assets/images/inju.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://turuchilawfirm.com/practice" },
};

const practiceAreasSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Legal Services",
  provider: { "@type": "LegalService", name: "The Turuchi Law Firm, LLC" },
  areaServed: { "@type": "State", name: "New Jersey" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Legal Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Personal Injury Law" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Workers' Compensation Law" },
      },
    ],
  },
};

const PracticeAreasPage = async () => {
  let practiceAreas = [];
  let siteSettings = {};

  try {
    [practiceAreas, siteSettings] = await Promise.all([
      client.fetch(practiceAreasQuery).then((r) => r ?? []),
      client.fetch(siteSettingsQuery).then((r) => r ?? {}),
    ]);
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

      <PageHeader
        eyebrow="What We Do"
        text="Our Practice"
        text2="Areas"
        description="Two areas, handled properly. If you were hurt in an accident or injured at work in New Jersey, we can tell you where you stand — at no cost."
        image="/assets/images/inju.jpg"
        breadcrumbs={[{ label: "Practice Areas" }]}
      />

      <Section1>
        <PracticeArea
          practiceAreas={filterRetiredAreas(practiceAreas)}
          eyebrow="Areas of Focus"
          heading="How We Help Injured People in New Jersey"
          description="Every matter is handled personally, with a strategy built around the facts of your case rather than a template."
        />
      </Section1>

      <Section4>
        <Consultation contact={siteSettings?.contact} stats={siteSettings?.stats} />
      </Section4>
    </>
  );
};

export default PracticeAreasPage;
