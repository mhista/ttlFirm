import Script from "next/script";

import { client, urlFor } from "@/lib/sanity.client";
import {
  testimonialsQuery,
  practiceAreasQuery,
  homePageQuery,
  siteSettingsQuery,
} from "@/lib/sanity.queries";
import { filterRetiredAreas, FIRM, getOffices } from "@/lib/siteNav";

import Section1 from "@components/common/section1";
import Section2 from "@components/common/section2";
import Section3 from "@components/common/section3";
import Section4 from "@components/common/section4";
import Header from "@components/layout/header";
import HomeHero from "@components/pages/home/hero";
import PracticeArea from "@components/pages/home/practiceAreas";
import WhyChooseUs from "@components/pages/home/whyChooseUs";
import FilmSection from "@components/pages/home/filmSection";
import AccidentTypes from "@components/pages/home/accidentTypes";
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

  const ogImage =
    seo.ogImage?.asset?.url ||
    homePage?.heroMedia?.poster?.asset?.url ||
    "/assets/videos/hero-poster.jpg";

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
    ],
    openGraph: {
      title: seo.metaTitle || fallbackTitle,
      description: seo.metaDescription || fallbackDescription,
      url: "https://turuchilawfirm.com",
      siteName: "Turuchi Law Firm",
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
    alternates: { canonical: "https://turuchilawfirm.com" },
  };
}

function buildOrganizationSchema(siteSettings) {
  const contact = siteSettings?.contact || {};
  const offices = getOffices(contact);

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteSettings?.title || "The Turuchi Law Firm, LLC",
    image: "https://turuchilawfirm.com/assets/images/logo.png",
    url: "https://turuchilawfirm.com",
    telephone: contact.phone || FIRM.phoneHref,
    email: contact.email || FIRM.email,
    description:
      siteSettings?.description ||
      "New Jersey law firm focused on personal injury and workers' compensation representation.",
    // schema.org takes an array once there is more than one location, and
    // reads the first as primary.
    address: offices.length === 1 ? offices[0].postal : offices.map((o) => o.postal),
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
    sameAs: Object.values(siteSettings?.social || {}).filter(Boolean),
  };
}

// Default order, used when nothing is set in the Studio.
const DEFAULT_ORDER = [
  "practiceAreas",
  "accidentTypes",
  "film",
  "whyChooseUs",
  "consultation",
  "testimonials",
  "blog",
  "contact",
];

const Home = async () => {
  const [homePage, testimonials, practiceAreasRaw, siteSettings] = await Promise.all([
    getHomePageData(),
    client.fetch(testimonialsQuery).catch(() => []),
    client.fetch(practiceAreasQuery).catch(() => []),
    client.fetch(siteSettingsQuery).catch(() => ({})),
  ]);

  const practiceAreas = filterRetiredAreas(practiceAreasRaw);
  const hero = homePage?.hero || {};
  const heroMedia = homePage?.heroMedia || {};
  const stats = siteSettings?.stats || {};
  const contact = siteSettings?.contact || {};

  // Hero media: whatever the Studio holds wins; otherwise the files shipped
  // with the site are used.
  // Phones get the portrait loop, desktop the landscape one. `desktopBackground`
  // in the Studio switches desktop between the wide loop and a wide still —
  // useful whenever the footage on hand isn't the right shape for full bleed.
  const videoSrc = heroMedia.backgroundVideo?.asset?.url || "/assets/videos/hero-loop.mp4";
  const posterSrc = heroMedia.poster?.asset?.url || "/assets/videos/hero-poster.jpg";
  const desktopMode = heroMedia.desktopBackground === "image" ? "image" : "video";
  // An uploaded video is an arbitrary file — the whole film, most likely — so
  // it gets the cross-faded loop and the optional in/out points. The file
  // shipped with the site was already cut to loop seamlessly and does not.
  const uploadedDesktopVideo = heroMedia.desktopVideo?.asset?.url;
  const desktopVideoSrc = uploadedDesktopVideo || "/assets/videos/hero-loop-wide.mp4";
  const desktopVideoSmoothLoop = Boolean(uploadedDesktopVideo);
  const desktopPosterSrc =
    heroMedia.desktopPoster?.asset?.url || "/assets/videos/hero-poster-wide.jpg";
  // "Desktop Photos" is a list, so one photo is a still hero and several
  // cross-fade. The older single-image field is still read, so nothing set
  // before this existed is lost.
  const desktopImages = (heroMedia.desktopImages || [])
    .map((img) => img?.asset?.url)
    .filter(Boolean);
  if (!desktopImages.length && heroMedia.desktopBackdrop?.asset?.url) {
    desktopImages.push(heroMedia.desktopBackdrop.asset.url);
  }
  const filmSrc = heroMedia.fullFilm?.asset?.url || "/assets/videos/turuchi-law-firm-film.mp4";
  const filmPoster = heroMedia.filmPoster?.asset?.url || "/assets/videos/film-poster.jpg";

  // Section visibility and order are both editable. A section is shown unless
  // it has been explicitly switched off.
  const on = (key) => homePage?.[key]?.enabled !== false;
  const order = homePage?.sectionOrder?.length ? homePage.sectionOrder : DEFAULT_ORDER;

  const sections = {
    practiceAreas: on("practiceAreasSection") && (
      <Section1 key="practiceAreas">
        <PracticeArea practiceAreas={practiceAreas} content={homePage?.practiceAreasSection} />
      </Section1>
    ),
    accidentTypes: on("accidentTypesSection") && (
      <Section1 key="accidentTypes">
        <AccidentTypes content={homePage?.accidentTypesSection} />
      </Section1>
    ),
    film: on("filmSection") && (
      <Section2 key="film">
        <FilmSection
          content={homePage?.filmSection}
          film={{ src: filmSrc, poster: filmPoster, loop: videoSrc, loopPoster: posterSrc }}
        />
      </Section2>
    ),
    whyChooseUs: on("whyChooseUsSection") && (
      <Section3 key="whyChooseUs">
        <WhyChooseUs
          content={homePage?.whyChooseUsSection}
          stats={stats}
          film={{ src: filmSrc, poster: filmPoster, loop: videoSrc, loopPoster: posterSrc }}
        />
      </Section3>
    ),
    consultation: on("consultationSection") && (
      <Section4 key="consultation">
        <Consultation content={homePage?.consultationSection} contact={contact} />
      </Section4>
    ),
    testimonials: on("testimonialsSection") && (
      <Section1 key="testimonials">
        <TestimonialCarousel
          testimonials={testimonials}
          content={homePage?.testimonialsSection}
        />
      </Section1>
    ),
    blog: on("blogSection") && (
      <Section2 key="blog">
        <BlogSection content={homePage?.blogSection} />
      </Section2>
    ),
    contact: on("contactSection") && (
      <Section1 key="contact">
        <ContactUs contact={contact} content={homePage?.contactSection} />
      </Section1>
    ),
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildOrganizationSchema(siteSettings)),
        }}
      />

      <Header
        videoSrc={videoSrc}
        posterSrc={posterSrc}
        desktopMode={desktopMode}
        desktopVideoSrc={desktopVideoSrc}
        desktopVideoSmoothLoop={desktopVideoSmoothLoop}
        desktopVideoStart={heroMedia.desktopVideoStart}
        desktopVideoEnd={heroMedia.desktopVideoEnd}
        desktopPosterSrc={desktopPosterSrc}
        desktopImages={desktopImages}
        desktopImageSeconds={heroMedia.desktopImageSeconds}
      >
        <HomeHero
          content={{ ...hero, phone: contact.phone || FIRM.phoneDisplay }}
          stats={stats}
          statsSection={homePage?.statsSection}
          film={{ src: filmSrc, poster: filmPoster, loop: videoSrc, loopPoster: posterSrc }}
        />
      </Header>

      {order.map((key) => sections[key]).filter(Boolean)}
    </>
  );
};

export default Home;
