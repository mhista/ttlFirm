import { urlFor } from "./sanity.client";

export function generateLocalBusinessSchema(item, county) {
  // Handle both practice areas and sub-services
  const isPracticeArea = !item.practiceArea; // Practice areas don't have practiceArea field
  
  // Safely get the URL
  let url;
  if (isPracticeArea) {
    // For practice areas
    url = `https://turuchilawfirm.com/practice/${item.slug?.current || item.id || ''}`;
  } else {
    // For sub-services
    const practiceSlug = item.practiceArea?.slug?.current || item.practiceArea?.id || '';
    const serviceSlug = item.slug?.current || '';
    url = `https://turuchilawfirm.com/practice/${practiceSlug}/${serviceSlug}`;
  }

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: `${item.title || item.name} - ${county?.name || "New Jersey"} - Turuchi Law Firm`,
    description: item.seo?.metaDescription || item.excerpt || '',
    url: url,
    image: item.image
      ? urlFor(item.image).width(1200).height(630).url()
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
        url: "https://turuchilawfirm.com/assets/images/logo.png",
      },
    },
  };
}