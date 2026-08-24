import { client } from "@/lib/sanity.client";
import { sitemapQuery } from "@/lib/sanity.queries";

export default async function sitemap() {
  const baseUrl = "https://turuchilawfirm.com"; // Replace with your actual domain

  try {
    const data = await client.fetch(sitemapQuery);

    // Blog posts
    const blogs = data.blogs?.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug.current}`,
      lastModified: new Date(blog.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    })) || [];

    // Sub-services
    const subServices = data.subServices?.map((service) => ({
      url: `${baseUrl}/practice/${service.practiceArea.id || service.practiceArea.slug.current}/${service.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })) || [];

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/profile`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/practice`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/practice/1`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      },
      {
        url: `${baseUrl}/practice/2`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      },
      {
        url: `${baseUrl}/practice/3`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      },
      {
        url: `${baseUrl}/practice/4`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.7,
      },
    ];

    return [...staticPages, ...blogs, ...subServices];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return at least static pages if dynamic content fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}