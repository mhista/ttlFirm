import Script from "next/script";

import { client, urlFor } from "@/lib/sanity.client";
import {
  testimonialsQuery,
  practiceAreasQuery,
  homePageQuery,
  siteSettingsQuery,
} from "@/lib/sanity.queries";
import { filterRetiredAreas, FIRM } from "@/lib/siteNav";

import Section1 from "@components/common/section1";
import Section2 from "@components/common/section2";
import Section3 from "@components/common/section3";
import Section4 from "@components/common/section4";
import Header from "@components/layout/header";
import HomeHero from "@components/pages/home/hero";
import PracticeArea from "@components/pages/home/practiceAreas";
import WhyChooseUs from "@components/pages/home/whyChooseUs";
import Consultation from "@components/pages/home/consult";
import TestimonialCarousel from "@components/pages/home/testimonial";
import BlogSection from "@components/pages/home/blogSection";
import ContactUs from "@components/pages/home/contactUs";

export const revalidate = 60;

async function getHomePageData() {
  try {
    return (await client.fetch(homePageQuery)) || {};
  } catch (error) {
    console.error("Error fetching home page:", error);
    return {};
  }
}

const fallbackTitle =
  "New Jersey Personal Injury & Workers' Compensation Lawyer | The Turuchi Law Firm";
const fallbackDescription =
  "New Jersey personal injury and workers' compensation attorney representing injured people and injured workers. Free consultation, no fee unless we recover.";

export async function generateMetadata() {
  const homePage = await getHomePageData();
  const seo = homePage?.seo || {};

  return {
    title: seo.metaTitle || fallbackTitle,
    description: seo.metaDescription || fallbackDescription,
    keywords: seo.keywords || [
      "New Jersey personal injury lawyer",
      "NJ workers compensation attorney",
      "car accident lawyer NJ",
      "truck accident attorney New Jersey",
      "slip and fall attorney NJ",
      "work injury lawyer New Jersey",
      "Jersey City personal injury attorney",
      "Essex County injury lawyer",
      "Union County workers comp attorney",
      "Hudson County accident lawyer",
    ],
    openGraph: {
      title: seo.metaTitle || fallbackTitle,
      description: seo.metaDescription || fallbackDescription,
      url: "https://turuchilawfirm.com",
      siteName: "Turuchi Law Firm",
      images: seo.ogImage
        ? [
            {
              url: urlFor(seo.ogImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: "Turuchi Law Firm — New Jersey Personal Injury Attorney",
            },
          ]
        : [
            {
              url: "/assets/video/hero-poster.jpg",
              width: 1200,
              height: 630,
              alt: "Turuchi Law Firm — New Jersey Personal Injury Attorney",
            },
          ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || fallbackTitle,
      description: seo.metaDescription || fallbackDescription,
      images: ["/assets/video/hero-poster.jpg"],
    },
    alternates: { canonical: "https://turuchilawfirm.com" },
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "The Turuchi Law Firm, LLC",
  image: "https://turuchilawfirm.com/assets/images/logo.png",
  url: "https://turuchilawfirm.com",
  telephone: "+17322106410",
  email: "info@turuchilawfirm.com",
  description:
    "New Jersey law firm focused on personal injury and workers' compensation representation.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "111 Town Square Pl, Ste 1238 #492165",
    addressLocality: "Jersey City",
    addressRegion: "NJ",
    postalCode: "07310",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: "40.7178", longitude: "-74.0431" },
  areaServed: [{ "@type": "State", name: "New Jersey" }],
  priceRange: "$$",
  knowsAbout: ["Personal Injury Law", "Workers' Compensation Law"],
  founder: {
    "@type": "Person",
    name: "Turuchi S. Iheanachor",
    jobTitle: "Founder & Managing Attorney",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/turuchilawfirm",
    "https://www.linkedin.com/company/turuchi-law-firm",
  ],
};

const Home = async () => {
  const [homePage, testimonials, practiceAreasRaw, siteSettings] = await Promise.all([
    getHomePageData(),
    client.fetch(testimonialsQuery).catch(() => []),
    client.fetch(practiceAreasQuery).catch(() => []),
    client.fetch(siteSettingsQuery).catch(() => ({})),
  ]);

  const practiceAreas = filterRetiredAreas(practiceAreasRaw);
  const hero = homePage?.hero || {};
  const stats = siteSettings?.stats || {};
  const contact = siteSettings?.contact || {};

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Header
        videoSrc="/assets/video/hero-placeholder.mp4"
        posterSrc="/assets/video/hero-poster.jpg"
      >
        <HomeHero
          content={{ ...hero, phone: contact.phone || FIRM.phoneDisplay }}
          stats={stats}
        />
      </Header>

      <Section1>
        <PracticeArea
          practiceAreas={practiceAreas}
          heading={homePage?.practiceSection?.heading}
          description={homePage?.practiceSection?.description}
          eyebrow={homePage?.practiceSection?.sectionLabel}
        />
      </Section1>

      <Section3>
        <WhyChooseUs content={homePage?.whyChooseUsSection} stats={stats} />
      </Section3>

      <Section4>
        <Consultation content={homePage?.consultationSection} contact={contact} stats={stats} />
      </Section4>

      <Section1>
        <TestimonialCarousel
          testimonials={testimonials}
          content={homePage?.testimonialsSection}
        />
      </Section1>

      <Section2>
        <BlogSection content={homePage?.blogSection} />
      </Section2>

      <Section1>
        <ContactUs contact={contact} social={siteSettings?.social} />
      </Section1>
    </>
  );
};

export default Home;
