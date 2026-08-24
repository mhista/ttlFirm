import { client } from "@/lib/sanity.client";
import { tagsQuery } from "@/lib/sanity.queries";
import BlogCard from "@/components/blog/BlogCard";
import Sidebar from "@/components/blog/Sidebar";
import PageHeader from "@/components/pages/header";

export const revalidate = 60;

export async function generateStaticParams() {
  const tags = await client.fetch(tagsQuery);
  return tags.map((tag) => ({
    slug: tag.slug.current,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ← FIX: Await params
  const tags = await client.fetch(tagsQuery);
  const tag = tags.find((t) => t.slug.current === slug);

  return {
    title: `${tag?.title || "Tag"} | Blog | Turuchi Law Firm`,
  };
}

const blogsByTagQuery = `
  *[_type == "blog" && status == "published" && $tag in tags[]->slug.current] | order(publishedAt desc) {
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

export default async function TagPage({ params }) {
  const { slug } = await params; // ← FIX: Await params
  const [blogs, tags] = await Promise.all([
    client.fetch(blogsByTagQuery, { tag: slug }),
    client.fetch(tagsQuery),
  ]);

  const currentTag = tags.find((t) => t.slug.current === slug);

  return (
    <div className="bg-zinc-100 z-[60] relative">
      <PageHeader text="Tag:" text2={currentTag?.title || slug} />

      <div className="relative flex flex-col md:flex-row w-full bg-zinc-100 gap-10 md:px-12 py-10 md:py-14 z-[60]">
        <div className="flex flex-col w-full items-center gap-10 z-[60]">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-lora text-gray-600">
                No posts with this tag yet.
              </h2>
            </div>
          ) : (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          )}
        </div>

        <Sidebar recentPosts={blogs.slice(0, 5)} categories={[]} tags={tags} />
      </div>
    </div>
  );
}
