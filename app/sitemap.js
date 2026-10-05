import { client } from "@/lib/sanity.client";
import { sitemapQuery } from "@/lib/sanity.queries";
import { PRACTICE_AREAS, RETIRED_PRACTICE_SLUGS } from "@/lib/siteNav";

const baseUrl = "https://turuchilawfirm.com";

const isRetired = (slug = "") =>
  RETIRED_PRACTICE_SLUGS.includes(slug) || /immigration|municipal/i.test(slug);

export default async function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/practice`, changeFrequency: "weekly", priority: 0.9 },
    ...PRACTICE_AREAS.map((area) => ({
      url: `${baseUrl}/practice/${area.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    })),
    // The attorney profile is one of the two pages the client wants Google to
    // surface, so it sits with the practice pages rather than below them.
    { url: `${baseUrl}/profile`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/reviews`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "daily", priority: 0.7 },
    // Legal pages must stay crawlable — the A2P registration review checks
    // that the Privacy Policy is publicly reachable — but they are kept at the
    // bottom of the priority list so nothing here argues for showing them as
    // sitelinks ahead of the pages above.
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms-and-conditions`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/disclaimer`, changeFrequency: "yearly", priority: 0.1 },
  ].map((page) => ({ lastModified: now, ...page }));

  try {
    const data = await client.fetch(sitemapQuery);

    const blogs =
      data?.blogs?.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug.current}`,
        lastModified: blog.publishedAt ? new Date(blog.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.7,
      })) ?? [];

    const subServices =
      data?.subServices
        ?.map((service) => {
          const parent =
            service?.practiceArea?.slug?.current ?? service?.practiceArea?.id ?? null;
          if (!parent || isRetired(parent)) return null;
          return {
            url: `${baseUrl}/practice/${parent}/${service.slug.current}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
          };
        })
        .filter(Boolean) ?? [];

    return [...staticPages, ...blogs, ...subServices];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
