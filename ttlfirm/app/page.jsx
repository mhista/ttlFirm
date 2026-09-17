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
import OfficeGallery from "@components/common/officeGallery";

export const revalidate = 60;

async function getHomePageData() {
  try {
    return (await client.fetch(homePageQuery)) || {};
  } catch (error) {
    console.error("Error fetching home page:", error);
    return {};
  }
}

// The homepage <title> is the single biggest influence on the heading Google
// prints for the site, so it ends in the full registered name — the client's
// note was that the result should read "The Turuchi Law Firm, LLC", not
// "Turuchi Law Firm". og:site_name and the WebSite schema below say the same
// thing, because Google cross-checks all three before settling on a name.
const fallbackTitle =
  "New Jersey Personal Injury & Workers' Compensation Lawyer | The Turuchi Law Firm, LLC";
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
      "Newark personal injury attorney",
    ],
    openGraph: {
      title: seo.metaTitle || fallbackTitle,
      description: seo.metaDescription || fallbackDescription,
      url: "https://turuchilawfirm.com",
      siteName: "The Turuchi Law Firm, LLC",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "The Turuchi Law Firm, LLC — New Jersey Personal Injury Attorney",
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
    "@id": "https://turuchilawfirm.com/#organization",
    name: siteSettings?.title || "The Turuchi Law Firm, LLC",
    legalName: "The Turuchi Law Firm, LLC",
    alternateName: ["The Turuchi Law Firm", "Turuchi Law Firm"],
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
    geo: { "@type": "GeoCoordinates", latitude: "40.7350", longitude: "-74.1724" },
    areaServed: [{ "@type": "State", name: "New Jersey" }],
    priceRange: "$$",
    knowsAbout: ["Personal Injury Law", "Workers' Compensation Law"],
    founder: {
      "@type": "Person",
      name: "Turuchi S. Iheanachor",
      jobTitle: "Founder & Managing Attorney",
    },
    // She asked for 24/7 — this is the machine-readable half of that.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs: Object.values(siteSettings?.social || {}).filter(Boolean),
  };
}

/**
 * The site's identity, and the pages it wants Google to surface.
 *
 * Two jobs, both asked for by the client:
 *
 * 1. WebSite.name is one of the signals Google uses for the *site name* line
 *    printed above a result — the line her screenshots had as "Turuchi Law
 *    Firm". It has to agree with og:site_name and the <title> suffix, which it
 *    now does; Google ignores a name that only one of the three claims.
 *
 * 2. SiteNavigationElement tells Google which pages the site itself considers
 *    its main ones. Sitelinks cannot be set — Google chooses them, and there
 *    is no markup, no Search Console setting and no file that forces a
 *    particular six. What can be done is to stop contradicting the preference:
 *    name the pages here, link them most prominently in the footer (see the
 *    note on `companyLinks` there), and keep the legal pages low in the
 *    sitemap. That is the whole of the honest lever. It typically takes a few
 *    weeks of recrawling to show up.
 */
function buildSiteSchema(siteSettings) {
  const name = siteSettings?.title || FIRM.name;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://turuchilawfirm.com/#website",
        url: "https://turuchilawfirm.com",
        name,
        alternateName: ["The Turuchi Law Firm", "Turuchi Law Firm"],
        publisher: { "@id": "https://turuchilawfirm.com/#organization" },
        inLanguage: "en-US",
      },
      ...[
        { name: "Personal Injury", url: "/practice/personal-injury-lawyer-in-new-jersey" },
        { name: "Attorney Profile", url: "/profile" },
        { name: "Workers' Compensation", url: "/practice/new-jersey-workers-compensation-attorney" },
        { name: "Practice Areas", url: "/practice" },
        { name: "About Us", url: "/about" },
        { name: "Contact Us", url: "/contact" },
      ].map((item, i) => ({
        "@type": "SiteNavigationElement",
        "@id": `https://turuchilawfirm.com/#nav-${i + 1}`,
        position: i + 1,
        name: item.name,
        url: `https://turuchilawfirm.com${item.url}`,
      })),
    ],
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
  "office",
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
    // Photographs of the Newark building. Same component the contact page
    // uses, so the copy and the photos are edited in one place.
    office: on("officeSection") && (
      <OfficeGallery
        key="office"
        contact={contact}
        heading={homePage?.officeSection?.heading}
        description={homePage?.officeSection?.description}
        photos={homePage?.officeSection?.photos}
      />
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

      <Script
        id="site-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildSiteSchema(siteSettings)),
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
