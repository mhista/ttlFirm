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
`

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
`

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
`

export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "blog" && references(^._id)])
  }
`

export const tagsQuery = `
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "blog" && references(^._id)])
  }
`

// Practice Area & Sub-Service Queries
export const practiceAreasQuery = `
  *[_type == "practiceArea"] | order(order asc) {
    _id,
    name,
    slug,
    id,
    description,
    image {
      asset->{
        _id,
        url
      }
    },
    icon,
    "subServices": *[_type == "subService" && references(^._id) && status == "published"] {
      _id,
      title,
      slug
    }
  }
`

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
`

export const subServiceBySlugQuery = `
  *[_type == "subService" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    practiceArea->{
      name,
      slug,
      id
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
    whyChooseUs,
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
`

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
`

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
`

// Author Query
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
`

// Search Query
export const searchQuery = `
  *[_type in ["blog", "subService"] && [title, excerpt, body] match $searchTerm] {
    _type,
    _id,
    title,
    slug,
    excerpt,
    "type": _type
  }
`

// Sitemap Query
export const sitemapQuery = `
  {
    "blogs": *[_type == "blog" && status == "published"] {
      slug,
      publishedAt
    },
    "subServices": *[_type == "subService" && status == "published"] {
      slug,
      practiceArea->{
        slug
      }
    }
  }
`

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
  }`

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
`

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
`