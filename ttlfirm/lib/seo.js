import { urlFor } from "./sanity.client";

export function generateLocalBusinessSchema(subService, county) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${subService.title} - ${county?.name || ""} - Turuchi Law Firm`,
    description: subService.seo?.metaDescription || subService.excerpt,
    url: `https://turuchilawfirm.com/practice/${subService.practiceArea.slug.current}/${subService.slug.current}`,
    image: subService.image
      ? urlFor(subService.image).width(1200).height(630).url()
      : undefined,
    telephone: "+1-732-210-6410",
    email: "info@turuchilawfirm.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "111 Town Square Pl",
      addressLocality: "Jersey City",
      addressRegion: "NJ",
      postalCode: "07310",
      addressCountry: "US",
    },
    areaServed: county
      ? {
          "@type": "State",
          name: "New Jersey",
          containsPlace: {
            "@type": "City",
            name: county.name,
          },
        }
      : {
          "@type": "State",
          name: "New Jersey",
        },
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
  };
}

export function generateArticleSchema(blog) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.mainImage
      ? urlFor(blog.mainImage).width(1200).height(630).url()
      : undefined,
    datePublished: blog.publishedAt,
    dateModified: blog._updatedAt || blog.publishedAt,
    author: blog.author
      ? {
          "@type": "Person",
          name: blog.author.name,
          jobTitle: blog.author.title,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Turuchi Law Firm",
      logo: {
        "@type": "ImageObject",
        url: "https://turuchilawfirm.com/assets/images/logo.png", // Add your logo
      },
    },
  };
}