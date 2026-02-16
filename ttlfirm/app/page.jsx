import { client } from "@/lib/sanity.client";
import { testimonialsQuery, practiceAreasQuery } from "@/lib/sanity.queries";
import Countdown from "@components/common/countdown";
import Section1 from "@components/common/section1";
import Section2 from "@components/common/section2";
import Section3 from "@components/common/section3";
import Section4 from "@components/common/section4";
import Consultation from "@components/pages/home/consult";
import ContactUs from "@components/pages/home/contactUs";
import PracticeArea from "@components/pages/home/practiceAreas";
import TestimonialCarousel from "@components/pages/home/testimonial";
import Header from "@components/layout/header";
import WhyChooseUs from "@components/pages/home/whyChooseUs";
import HomeHero from "@components/pages/home/hero";
import BlogSection from "@components/pages/home/blogSection";
import Script from "next/script";

export const revalidate = 60;

export const metadata = {
  title: "Reliable Law firm in New Jersey | The Turuchi Law Firm",
  description: "Experienced law firm in New Jersey offering immigration, personal injury, workers' compensation, and municipal court representation. Get a free consultation.",
  keywords: [
    "New Jersey lawyer",
    "personal injury attorney NJ",
    "immigration lawyer New Jersey",
    "workers compensation attorney",
    "Essex County lawyer",
    "Union County attorney",
    "Hudson County legal services",
    "car accident lawyer NJ",
    "slip and fall attorney",
    "work injury lawyer"
  ],
  openGraph: {
    title: "Reliable Law firm in New Jersey | The Turuchi Law Firm",
    description: "Experienced law firm in New Jersey offering immigration, personal injury, workers' compensation, and municipal court representation. Get a free consultation.",
    url: "https://turuchilawfirm.com",
    siteName: "Turuchi Law Firm",
    images: [
      {
        url: "/assets/images/lawyer.jpg",
        width: 1200,
        height: 630,
        alt: "Turuchi Law Firm - New Jersey Attorney"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Reliable Law firm in New Jersey | The Turuchi Law Firm",
    description: "Experienced law firm in New Jersey offering immigration, personal injury, workers' compensation, and municipal court representation. Get a free consultation.",
    images: ["/assets/images/lawyer.jpg"]
  },
  alternates: {
    canonical: "https://turuchilawfirm.com"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Turuchi Law Firm, LLC",
  "image": "https://turuchilawfirm.com/assets/images/logo.png",
  "url": "https://turuchilawfirm.com",
  "telephone": "+17322106410",
  "email": "info@turuchilawfirm.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "111 Town Square Pl",
    "addressLocality": "Jersey City",
    "addressRegion": "NJ",
    "postalCode": "07310",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7178",
    "longitude": "-74.0431"
  },
  "areaServed": [{ "@type": "State", "name": "New Jersey" }],
  "priceRange": "$$",
  "founder": {
    "@type": "Person",
    "name": "Turuchi S. Iheanachor",
    "jobTitle": "Founder & Managing Attorney"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/turuchilawfirm",
    "https://www.linkedin.com/company/turuchi-law-firm"
  ]
};

const Home = async () => {
  // ✅ Fetch both in parallel
  const [testimonials, practiceAreas] = await Promise.all([
    client.fetch(testimonialsQuery).catch(() => []),
    client.fetch(practiceAreasQuery).catch(() => []),
  ]);

  const height1 = "1200";
  const height2 = "600";
  const height3 = "800";

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="relative h-[full]">
        <Header height1={"1200"} height2={height2} height3={height3}>
          <HomeHero height1={1200} height2={height2} height3={height3} />
        </Header>

        <div className="absolute z-[70] w-[85%] lg:w-[50%] justify-center items-center right-[28px] sm:right-[48px] lg:left-10 top-[1270px] sm:top-[650px] md:top-[780px] lg:top-[820px] md:pr-4 bg-zinc-100 flex flex-row shadow-2xl border-amber-600 border-opacity-90 border-t-[3px] gap:3 md:gap-5 rounded-sm">
          <Countdown countToUse={500} subtitle={'Legal Cases Handled'} sign={'+'} timer={10} />
          <div className="w-[1px] bg-[#1f385b] h-[70px] md:h-[100px] opacity-75 mr-4 md:mr-0"></div>
          <Countdown countToUse={8} subtitle={'Years of Industry Experience'} timer={100} />
        </div>

        <Section1>
          {/* ✅ Pass fetched data as prop */}
          <PracticeArea practiceAreas={practiceAreas} />
        </Section1>

        <Section3>
          <WhyChooseUs />
        </Section3>

        <Section4>
          <Consultation />
        </Section4>

        <Section1>
          <TestimonialCarousel testimonials={testimonials} />
        </Section1>

        <Section2>
          <BlogSection />
        </Section2>

        <Section2>
          <ContactUs />
        </Section2>
      </div>
    </>
  );
};

export default Home;