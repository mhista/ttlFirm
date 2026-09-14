// ===========================================
// lib/sanity.queries.js - COMPLETE FILE
// ===========================================

export const blogsQuery = `
  *[_type == "blog" && status != "draft"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      slug,
      image {
        asset->{
          _id,
          url
        }
      },
      title
    },
    categories[]->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    },
    publishedAt,
    featured
  }
`;

export const blogBySlugQuery = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      slug,
      image {
        asset->{
          _id,
          url
        }
      },
      title,
      bio,
      email,
      social
    },
    categories[]->{
      title,
      slug,
      color
    },
    tags[]->{
      title,
      slug
    },
    body,
    publishedAt,
    relatedPosts[]->{
      _id,
      title,
      slug,
      excerpt,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      publishedAt
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset->{
          _id,
          url
        }
      }
    }
  }
`;

export const blogsByCategoryQuery = `
  *[_type == "blog" && status != "draft" && $category in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      slug
    },
    publishedAt
  }
`;

export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "blog" && references(^._id)])
  }
`;

export const tagsQuery = `
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "blog" && references(^._id)])
  }
`;

// ============================================
// PRACTICE AREAS — list (cards, sidebar, static params)
// ============================================
export const practiceAreasQuery = `
  *[_type == "practiceArea" && status != "draft"] | order(order asc) {
    _id,
    name,
    slug,
    excerpt,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    icon,
    overview,
    process,
    faqs,
    counties[]->{
      name,
      slug,
      majorCities
    },
    countyContent[] {
      county->{
        name,
        slug
      },
      content,
      localStats
    },
    relatedAreas[]->{
      _id,
      name,
      slug,
      excerpt
    },
    ctaSection {
      enabled,
      sectionLabel,
      heading,
      description,
      buttons[] {
        text,
        link
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      localKeywords[] {
        county->{
          name,
          slug
        },
        keywords
      },
      ogImage {
        asset->{
          _id,
          url
        }
      },
      schema
    },
    "subServices": *[_type == "subService" && practiceArea._ref == ^._id && status != "draft"] | order(order asc) {
      _id,
      title,
      slug,
      excerpt,
      image {
        asset->{
          _id,
          url
        },
        alt
      },
      counties[]->{
        name,
        slug
      }
    }
  }
`;

// ============================================
// PRACTICE AREA — single page by SLUG
// ============================================
export const practiceAreaBySlugQuery = `
  *[_type == "practiceArea" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    excerpt,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    overview,
    process,
    faqs,
    counties[]->{
      name,
      slug,
      majorCities
    },
    countyContent[] {
      county->{
        name,
        slug
      },
      content,
      localStats
    },
    relatedAreas[]->{
      _id,
      name,
      slug,
      excerpt,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
    ctaSection {
      enabled,
      sectionLabel,
      heading,
      description,
      buttons[] {
        text,
        link
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      localKeywords[] {
        county->{
          name,
          slug
        },
        keywords
      },
      ogImage {
        asset->{
          _id,
          url
        }
      },
      schema
    },
    "subServices": *[_type == "subService" && practiceArea._ref == ^._id && status != "draft"] | order(order asc) {
      _id,
      title,
      slug,
      excerpt,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }
`;

export const practiceAreaByIdQuery = `
  *[_type == "practiceArea" && (id == $practiceId || slug.current == $practiceId)][0] {
    _id,
    name,
    slug,
    id,
    excerpt,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    overview,
    process,
    faqs,
    counties[]->{
      name,
      slug,
      majorCities
    },
    countyContent[] {
      county->{
        name,
        slug
      },
      content,
      localStats
    },
    relatedAreas[]->{
      _id,
      name,
      slug,
      id,
      excerpt
    },
    ctaSection {
      enabled,
      sectionLabel,
      heading,
      description,
      buttons[] {
        text,
        link
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset->{
          _id,
          url
        }
      },
      schema
    },
    "subServices": *[_type == "subService" && practiceArea._ref == ^._id && status != "draft"] | order(order asc) {
      _id,
      title,
      slug,
      excerpt,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }
`;

// ============================================
// SUB-SERVICE — single page by slug
// ============================================
export const subServiceBySlugQuery = `
  *[_type == "subService" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    practiceArea->{
      name,
      slug
    },
    counties[]->{
      name,
      slug,
      majorCities
    },
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    excerpt,
    overview,
    process,
    faqs,
    countyContent[] {
      county->{
        name,
        slug
      },
      content,
      localStats
    },
    relatedServices[]->{
      _id,
      title,
      slug,
      excerpt
    },
    ctaSection {
      enabled,
      sectionLabel,
      heading,
      description,
      buttons[] {
        text,
        link
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      localKeywords[] {
        county->{
          name,
          slug
        },
        keywords
      },
      ogImage {
        asset->{
          _id,
          url
        }
      },
      schema
    }
  }
`;

export const subServicesByPracticeQuery = `
  *[_type == "subService" && practiceArea._ref == $practiceAreaId && status != "draft"] | order(order asc) {
    _id,
    title,
    slug,
    excerpt,
    image {
      asset->{
        _id,
        url
      },
      alt
    }
  }
`;

export const subServiceByCountyQuery = `
  *[_type == "subService" && status != "draft" && $countyId in counties[]._ref] {
    _id,
    title,
    slug,
    excerpt,
    practiceArea->{
      name,
      slug
    },
    counties[]->{
      name,
      slug
    }
  }
`;

export const countiesQuery = `
  *[_type == "county"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    zipCodes,
    majorCities,
    "serviceCount": count(*[_type == "subService" && references(^._id)])
  }
`;

export const authorQuery = `
  *[_type == "author" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    image {
      asset->{
        _id,
        url
      }
    },
    title,
    bio,
    email,
    phone,
    social,
    "posts": *[_type == "blog" && author._ref == ^._id && status != "draft"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
    }
  }
`;

export const searchQuery = `
  *[_type in ["blog", "subService"] && [title, excerpt, body] match $searchTerm] {
    _type,
    _id,
    title,
    slug,
    excerpt,
    "type": _type
  }
`;

export const sitemapQuery = `
  {
    "blogs": *[_type == "blog" && status != "draft"] {
      slug,
      publishedAt
    },
    "practiceAreas": *[_type == "practiceArea" && status != "draft"] {
      slug
    },
    "subServices": *[_type == "subService" && status != "draft"] {
      slug,
      practiceArea->{
        slug
      }
    }
  }
`;

export const featuredBlogsQuery = `
  *[_type == "blog" && status != "draft" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      slug
    },
    categories[]->{
      title,
      slug,
      color
    },
    publishedAt
  }
`;

export const testimonialsQuery = `
  *[_type == "testimonial" && status == "active"] | order(order asc) {
    _id,
    name,
    role,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    testimonial,
    rating,
    caseType,
    featured
  }
`;

export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && status == "active" && featured == true] | order(order asc) [0...6] {
    _id,
    name,
    role,
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    testimonial,
    rating,
    caseType
  }
`;

// ============================================
// SITE SETTINGS QUERY
// ============================================
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    title,
    description,
    contact {
      phone,
      whatsapp,
      email,
      leadEmail,
      address {
        note,
        street,
        city,
        state,
        zipCode,
        country
      },
      additionalOffices[] {
        label,
        note,
        street,
        city,
        state,
        zipCode,
        country
      }
    },
    leadForm {
      caseTypes,
      languages
    },
    businessHours {
      weekdays,
      weekdaysDisplay,
      weekend
    },
    social {
      facebook,
      instagram,
      linkedin,
      tiktok,
      twitter,
      youtube
    },
    header {
      phoneLabel,
      ctaText,
      ctaLink
    },
    mainNav[] {
      label,
      href,
      children[] { label, href, blurb }
    },
    footer {
      ctaHeading,
      ctaSubheading,
      ctaButtonText,
      tagline,
      creditName,
      creditUrl,
      legalLinks[] { label, href }
    },
    legalNotices {
      attorneyAdvertising,
      smsNotice
    },
    smsConsent {
      summaryText,
      consentText,
      helperText,
      formDisclaimer
    },
    textWidget {
      enabled,
      buttonLabel,
      teaserText,
      panelHeading,
      panelSubheading,
      successHeading,
      successMessage
    },
    tracking {
      metaPixelId,
      ga4Id,
      googleAdsId,
      googleAdsLabel
    },
    stats {
      casesHandled,
      recoveredLabel,
      yearsExperience,
      countiesServed,
      clientSatisfaction
    },
    logo {
      asset->{
        _id,
        url
      },
      alt
    },
    favicon {
      asset->{
        _id,
        url
      }
    },
    defaultOGImage {
      asset->{
        _id,
        url
      }
    }
  }
`;

// ============================================
// HOMEPAGE QUERY
// ============================================
export const homePageQuery = `
  *[_type == "homePage"][0] {
    hero {
      eyebrow,
      heading,
      description,
      bullets,
      ctaText,
      ctaLink,
      attorneyLinkText,
      watchFilmLabel
    },
    heroMedia {
      backgroundVideo { asset->{ _id, url } },
      poster { asset->{ _id, url } },
      desktopBackground,
      desktopVideo { asset->{ _id, url } },
      desktopPoster { asset->{ _id, url } },
      desktopVideoStart,
      desktopVideoEnd,
      desktopImages[] { asset->{ _id, url } },
      desktopImageSeconds,
      desktopBackdrop { asset->{ _id, url } },
      fullFilm { asset->{ _id, url } },
      filmPoster { asset->{ _id, url } }
    },
    accidentTypesSection {
      enabled,
      sectionLabel,
      heading,
      description,
      groups[] { title, icon, items, href },
      ctaText,
      ctaLink
    },
    filmSection {
      enabled,
      sectionLabel,
      heading,
      description,
      portrait { asset->{ _id, url } },
      portraitName,
      portraitRole,
      roleLine,
      paragraphs,
      bullets,
      ctaText,
      ctaLink
    },
    statsSection {
      enabled,
      disclaimer,
      stats[] { value, label },
      stat1Label,
      stat2Label
    },
    practiceAreasSection {
      enabled,
      sectionLabel,
      heading,
      description,
      footnote,
      ctaText,
      ctaLink
    },
    whyChooseUsSection {
      enabled,
      sectionLabel,
      heading,
      description,
      features[] {
        icon,
        title,
        description
      },
      ctaText,
      ctaLink
    },
    consultationSection {
      enabled,
      sectionLabel,
      heading,
      description,
      ctaPrimaryText,
      ctaSecondaryText,
      disclaimer
    },
    testimonialsSection {
      enabled,
      sectionLabel,
      heading,
      description,
      disclaimer
    },
    blogSection {
      enabled,
      sectionLabel,
      heading,
      description,
      ctaText
    },
    contactSection {
      enabled,
      sectionLabel,
      heading,
      description,
      formHeading,
      formSubheading,
      hoursLabel
    },
    sectionOrder,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset->{
          _id,
          url
        }
      }
    }
  }
`;

// ============================================
// ABOUT PAGE QUERY
// ============================================
export const aboutPageQuery = `
  *[_type == "aboutPage"][0] {
    pageHeader {
      heading,
      headingHighlight,
      backgroundImage {
        asset->{
          _id,
          url
        }
      }
    },
    whoWeAre {
      heading,
      mainImage {
        asset->{
          _id,
          url
        },
        alt
      },
      content
    },
    missionAndValues {
      enabled,
      heading,
      mission,
      values[] {
        title,
        description
      }
    },
    faqs {
      heading,
      questions[] {
        question,
        answer
      }
    },
    ctaSection {
      enabled,
      heading,
      description,
      ctaText,
      ctaLink
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset->{
          _id,
          url
        }
      }
    }
  }
`;

// ============================================
// CONTACT PAGE QUERY
// ============================================
export const contactPageQuery = `
  *[_type == "contactPage"][0] {
    pageHeader {
      heading,
      headingHighlight
    },
    mainContent {
      heading,
      description
    },
    formSection {
      heading,
      submitButtonText,
      successMessage,
      errorMessage
    },
    officeHours {
      enabled,
      heading,
      hours[] {
        days,
        hours
      }
    },
    mapSection {
      enabled,
      embedUrl,
      latitude,
      longitude
    },
    seo {
      metaTitle,
      metaDescription,
      keywords
    }
  }
`;

// ============================================
// ATTORNEY PROFILE QUERY
// ============================================
export const attorneyProfileQuery = `
  *[_type == "attorneyProfile"][0] {
    attorney {
      name,
      credentials,
      title,
      profileImage {
        asset->{
          _id,
          url
        },
        alt
      },
      email,
      phone
    },
    introduction {
      heading,
      content
    },
    careerHighlights[] {
      heading,
      content
    },
    practiceAreas {
      heading,
      areas[]
    },
    education {
      heading,
      degrees[] {
        institution,
        degree,
        year
      }
    },
    barAdmissions {
      heading,
      admissions[]
    },
    honorsAndAwards {
      heading,
      items[] {
        title,
        organization,
        year,
        description
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset->{
          _id,
          url
        }
      }
    }
  }
`;
// ============================================
// LEGAL PAGES  (/privacy-policy, /terms-and-conditions, /disclaimer)
// ============================================
export const legalPageBySlugQuery = `
  *[_type == "legalPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    pageHeader {
      eyebrow,
      heading,
      headingHighlight,
      description,
      backgroundImage { asset->{ _id, url } }
    },
    effectiveDate,
    lastUpdated,
    intro,
    callout,
    sections[] {
      partLabel,
      heading,
      "anchor": anchor.current,
      body,
      callout
    },
    relatedLinks[] { label, href },
    showContactCard,
    contactCardHeading,
    seo { metaTitle, metaDescription }
  }
`;

export const legalPageSlugsQuery = `
  *[_type == "legalPage" && defined(slug.current)].slug.current
`;

// ============================================
// LANDING PAGES  (/lp/<slug>)
// ============================================
const landingSectionProjection = `
  _type,
  _key,
  eyebrow,
  heading,
  subheading,
  description,
  bullets,
  ctaText,
  ctaLink,
  showForm,
  showPhone,
  formHeading,
  formSubheading,
  backgroundImage { asset->{ _id, url }, alt },
  backgroundVideo { asset->{ _id, url } },
  video { asset->{ _id, url } },
  poster { asset->{ _id, url } },
  attorneyPhoto { asset->{ _id, url } },
  attorneyName,
  attorneyRole,
  showBio,
  bioParagraphs,
  orientation,
  autoplay,
  items[] { value, label, icon, title, description, question, answer },
  steps[] { title, description },
  body,
  disclaimer,
  testimonials[]-> {
    _id,
    name,
    role,
    testimonial,
    rating,
    caseType,
    image { asset->{ _id, url }, alt }
  }
`;

export const landingPageBySlugQuery = `
  *[_type == "landingPage" && slug.current == $slug && published == true][0] {
    title,
    "slug": slug.current,
    published,
    phoneOverride,
    metaPixelIdOverride,
    noIndex,
    sections[] { ${landingSectionProjection} },
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ _id, url } }
    }
  }
`;

export const landingPageSlugsQuery = `
  *[_type == "landingPage" && published == true && defined(slug.current)].slug.current
`;
