import { client } from "@/lib/sanity.client";
import { blogsByCategoryQuery, categoriesQuery } from "@/lib/sanity.queries";
import BlogCard from "@/components/blog/BlogCard";
import Sidebar from "@/components/blog/Sidebar";
import PageHeader from "@/components/pages/header";

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await client.fetch(categoriesQuery);
  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ← FIX: Await params
  const categories = await client.fetch(categoriesQuery);
  const category = categories.find((c) => c.slug.current === slug);

  return {
    title: `${category?.title || "Category"} | Blog | Turuchi Law Firm`,
    description: category?.description || `Browse ${category?.title} articles`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params; // ← FIX: Await params
  const [blogs, categories] = await Promise.all([
    client.fetch(blogsByCategoryQuery, { category: slug }),
    client.fetch(categoriesQuery),
  ]);

  const currentCategory = categories.find((c) => c.slug.current === slug);

  return (
    <div className="bg-zinc-100 z-[60] relative">
      <PageHeader
        text="Category:"
        text2={currentCategory?.title || slug}
      />

      <div className="relative flex flex-col md:flex-row w-full bg-zinc-100 gap-10 md:px-12 py-10 md:py-14 z-[60]">
        <div className="flex flex-col w-full items-center gap-10 z-[60]">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-lora text-gray-600">
                No posts in this category yet.
              </h2>
            </div>
          ) : (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          )}
        </div>

        <Sidebar recentPosts={blogs.slice(0, 5)} categories={categories} tags={[]} />
      </div>
    </div>
  );
}