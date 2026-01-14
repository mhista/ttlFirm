import { client } from "@/lib/sanity.client";
import { featuredBlogsQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { BiTime } from "react-icons/bi";

async function getFeaturedBlogs() {
  try {
    const blogs = await client.fetch(featuredBlogsQuery);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogSection() {
  const blogs = await getFeaturedBlogs();

  if (!blogs || blogs.length === 0) {
    return null; // Don't show section if no blogs
  }

  return (
    <div className="relative w-full flex flex-col items-center gap-8 py-16 px-5 md:px-12">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex flex-row items-center gap-3">
          <hr className="bg-amber-600 h-[2px] w-14" />
          <h3 className="text-amber-600 text-lg uppercase font-jost inline font-bold">
            Our Blog
          </h3>
          <hr className="bg-amber-600 h-[2px] w-14" />
        </div>
        <h1 className="font-lora text-4xl text-center">Latest Legal Insights</h1>
        <p className="text-gray-600 max-w-2xl">
          Stay informed with expert legal advice, case studies, and updates from our attorneys
        </p>
      </div>

      {/* Blog Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug.current}`}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col"
          >
            {/* Blog Image */}
            {blog.mainImage && (
              <div className="relative w-full h-[220px] overflow-hidden">
                <Image
                  src={urlFor(blog.mainImage).width(600).height(400).url()}
                  alt={blog.mainImage.alt || blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="p-6 flex flex-col flex-1">
              {/* Categories */}
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex gap-2 mb-3 flex-wrap">
                  {blog.categories.slice(0, 2).map((category) => (
                    <span
                      key={category.slug.current}
                      className="bg-amber-600 text-white px-2 py-1 text-xs uppercase tracking-wider rounded"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h3 className="font-lora text-xl font-semibold mb-3 group-hover:text-amber-600 transition line-clamp-2">
                {blog.title}
              </h3>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                  {blog.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <BiTime />
                  <time dateTime={blog.publishedAt}>
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                {blog.author && (
                  <span className="text-xs text-gray-500">
                    By {blog.author.name}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <Link
        href="/blog"
        className="btn mt-4"
      >
        View All Articles
      </Link>
    </div>
  );
}