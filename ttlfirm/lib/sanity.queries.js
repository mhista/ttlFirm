// ===========================================
// lib/sanity.queries.js - COMPLETE FILE
// Replace your existing sanity.queries.js with this
// ===========================================

// ============================================
// BLOG QUERIES
// ============================================
export const blogsQuery = `
  *[_type == "blog" && status == "published"] | order(publishedAt desc) {
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
  *[_type == "blog" && status == "published" && $category in categories[]->slug.current] | order(publishedAt desc) {
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

export const featuredBlogsQuery = `
  *[_type == "blog" && status == "published" && featured == true] | order(publishedAt desc) [0...3] {
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
    "posts": *[_type == "blog" && author._ref == ^._id && status == "published"] | order(publishedAt desc) {
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

// ============================================
// SITEMAP QUERY
// ============================================
export const sitemapQuery = `
  {
    "blogs": *[_type == "blog" && status == "published"] {
      slug,
      publishedAt
    },
    "subServices": *[_type == "subService" && status == "published"] {
      slug,
      practiceArea->{
        slug,
        id
      }
    }
  }
`;

// ============================================
// PRACTICE AREA QUERIES
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
    }
  }
`;

// Practice Areas Query - UPDATED
export const practiceAreasQuery = `
  *[_type == "practiceArea" && status == "published"] | order(order asc) {
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
      keywords
    },
    "subServices": *[_type == "subService" && practiceArea._ref == ^._id && status == "published"] | order(order asc) {
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

// Sub-Service by Slug Query - UPDATED
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
  *[_type == "subService" && practiceArea._ref == $practiceAreaId && status == "published"] | order(order asc) {
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
  *[_type == "subService" && status == "published" && $countyId in counties[]._ref] {
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

// ============================================
// TESTIMONIALS QUERIES
// ============================================
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
      email,
      address {
        street,
        city,
        state,
        zipCode,
        country
      }
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
      twitter
    },
    stats {
      casesHandled,
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
      heading,
      headingHighlight,
      description,
      ctaText,
      ctaLink,
      heroImage {
        asset->{
          _id,
          url
        },
        alt
      },
      backgroundImage {
        asset->{
          _id,
          url
        }
      },
      attorneyLinkText
    },
    statsSection {
      enabled,
      stat1Label,
      stat2Label
    },
    practiceAreasSection {
      sectionLabel,
      heading,
      description,
      ctaText,
      ctaLink
    },
    whyChooseUsSection {
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
      sectionLabel,
      heading,
      description,
      ctaPrimaryText,
      ctaSecondaryText
    },
    testimonialsSection {
      enabled,
      sectionLabel,
      heading,
      description,
      trustBadgeText
    },
    blogSection {
      enabled,
      sectionLabel,
      heading,
      description,
      ctaText
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