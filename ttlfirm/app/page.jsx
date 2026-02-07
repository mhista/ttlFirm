import { client } from "@/lib/sanity.client";
import { 
  testimonialsQuery, 
  homePageQuery, 
  siteSettingsQuery 
} from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
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

// Fetch all page data
async function getPageData() {
  try {
    const [homePage, siteSettings, testimonials] = await Promise.all([
      client.fetch(homePageQuery),
      client.fetch(siteSettingsQuery),
      client.fetch(testimonialsQuery)
    ]);
    
    return { 
      homePage: homePage || {}, 
      siteSettings: siteSettings || {},
      testimonials: testimonials || []
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return { 
      homePage: {}, 
      siteSettings: {},
      testimonials: []
    };
  }
}

// Generate dynamic metadata from CMS
export async function generateMetadata() {
  const { homePage, siteSettings } = await getPageData();
  
  const seo = homePage?.seo || {};
  const defaultOGImage = siteSettings?.defaultOGImage 
    ? urlFor(siteSettings.defaultOGImage).width(1200).height(630).url()
    : "/assets/images/lawyer.jpg";

  return {
    title: seo.metaTitle || "Reliable Law firm in New Jersey | The Turuchi Law Firm",
    description: seo.metaDescription || "Experienced law firm in New Jersey offering immigration, personal injury, workers' compensation, and municipal court representation. Get a free consultation.",
    keywords: seo.keywords || [
      "New Jersey lawyer",
      "personal injury attorney NJ",
      "immigration lawyer New Jersey",
      "workers compensation attorney"
    ],
    openGraph: {
      title: seo.metaTitle || "Reliable Law firm in New Jersey | The Turuchi Law Firm",
      description: seo.metaDescription,
      url: "https://turuchilawfirm.com",
      siteName: siteSettings?.title || "Turuchi Law Firm",
      images: [
        {
          url: seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : defaultOGImage,
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
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [seo.ogImage ? urlFor(seo.ogImage).url() : defaultOGImage]
    },
    alternates: {
      canonical: "https://turuchilawfirm.com"
    }
  };
}

// Generate Organization Schema from CMS
function generateOrganizationSchema(siteSettings) {
  const contact = siteSettings?.contact || {};
  const address = contact?.address || {};
  const social = siteSettings?.social || {};
  
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": siteSettings?.title || "Turuchi Law Firm, LLC",
    "image": siteSettings?.logo ? urlFor(siteSettings.logo).url() : "https://turuchilawfirm.com/assets/images/logo.png",
    "url": "https://turuchilawfirm.com",
    "telephone": contact?.phone || "+17322106410",
    "email": contact?.email || "info@turuchilawfirm.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address?.street || "111 Town Square Pl",
      "addressLocality": address?.city || "Jersey City",
      "addressRegion": address?.state || "NJ",
      "postalCode": address?.zipCode || "07310",
      "addressCountry": address?.country || "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "40.7178",
      "longitude": "-74.0431"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "New Jersey"
      }
    ],
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
      social?.facebook,
      social?.linkedin,
      social?.instagram
    ].filter(Boolean)
  };
}

const Home = async () => {
  const { homePage, siteSettings, testimonials } = await getPageData();
  
  // Get stats from CMS or use defaults
  const stats = siteSettings?.stats || {};
  const casesHandled = stats?.casesHandled || 500;
  const yearsExperience = stats?.yearsExperience || 8;
  
  const organizationSchema = generateOrganizationSchema(siteSettings);
  
  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />

      <div className="relative h-[full]">
        <Header height1={"1200"} height2={"600"} height3={"800"}>
          <HomeHero 
            content={homePage?.hero} 
            height1={1200} 
            height2={600} 
            height3={800} 
          />
        </Header>

        {/* Stats Section - Dynamic from CMS */}
        {homePage?.statsSection?.enabled !== false && (
          <div className="absolute z-[70] w-[85%] lg:w-[50%] justify-center items-center right-[28px] sm:right-[48px] lg:left-10 top-[1270px] sm:top-[650px] md:top-[780px] lg:top-[820px] md:pr-4 bg-zinc-100 flex flex-row shadow-2xl border-amber-600 border-opacity-90 border-t-[3px] gap:3 md:gap-5 rounded-sm">
            <Countdown 
              countToUse={casesHandled} 
              subtitle={homePage?.statsSection?.stat1Label || 'Legal Cases Handled'} 
              sign={'+'} 
              timer={10}
            />
            <div className="w-[1px] bg-[#1f385b] h-[70px] md:h-[100px] opacity-75 mr-4 md:mr-0"></div>
            <Countdown 
              countToUse={yearsExperience} 
              subtitle={homePage?.statsSection?.stat2Label || 'Years of Industry Experience'} 
              timer={100}
            />
          </div>
        )}

        <Section1>
          <PracticeArea content={homePage?.practiceAreasSection} />
        </Section1>

        <Section3>
          <WhyChooseUs content={homePage?.whyChooseUsSection} stats={stats} />
        </Section3>

        <Section4>
          <Consultation content={homePage?.consultationSection} contact={siteSettings?.contact} />
        </Section4>

        {/* Testimonials Section */}
        {homePage?.testimonialsSection?.enabled !== false && (
          <Section1>
            <TestimonialCarousel 
              testimonials={testimonials}
              content={homePage?.testimonialsSection}
              stats={stats}
            />
          </Section1>
        )}

        {/* Blog Section */}
        {homePage?.blogSection?.enabled !== false && (
          <Section2>
            <BlogSection content={homePage?.blogSection} />
          </Section2>
        )}

        <Section2>
          <ContactUs contact={siteSettings?.contact} social={siteSettings?.social} />
        </Section2>
      </div>
    </>
  );
};

export default Home;