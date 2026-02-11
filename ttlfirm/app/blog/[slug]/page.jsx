import { client } from "@/lib/sanity.client";
import { blogBySlugQuery, blogsQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { BiTime } from "react-icons/bi";
import { CiFileOn } from "react-icons/ci";
import { notFound } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import PortableTextComponents from "@/components/blog/PortableTextComponents";

export const revalidate = 60;

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const blogs = await client.fetch(blogsQuery);
  return blogs.map((blog) => ({
    slug: blog.slug.current,
  }));
}

// Generate metadata for SEO - FIX: Await params
export async function generateMetadata({ params }) {
  const { slug } = await params; // ← Add this line
  const blog = await client.fetch(blogBySlugQuery, { slug });

  if (!blog) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: blog.seo?.metaTitle || blog.title,
    description: blog.seo?.metaDescription || blog.excerpt,
    keywords: blog.seo?.keywords?.join(", "),
    openGraph: {
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      images: blog.seo?.ogImage
        ? [urlFor(blog.seo.ogImage).width(1200).height(630).url()]
        : blog.mainImage
          ? [urlFor(blog.mainImage).width(1200).height(630).url()]
          : [],
    },
  };
}

async function getBlogPost(slug) {
  const blog = await client.fetch(blogBySlugQuery, { slug });
  return blog;
}

// Main component - FIX: Await params
export default async function BlogPost({ params }) {
  const { slug } = await params; // ← Add this line
  const blog = await getBlogPost(slug);

  if (!blog) {
    notFound();
  }

  const publishedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-zinc-100 min-h-screen">
      {/* ... rest of your component stays the same */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="flex gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-amber-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-amber-600">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-800">{blog.title}</span>
        </nav>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {blog.mainImage && (
            <div className="relative w-full h-[400px]">
              <Image
                src={urlFor(blog.mainImage).width(1200).height(600).url()}
                alt={blog.mainImage.alt || blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex gap-2 mb-4">
                {blog.categories.map((category) => (
                  <Link
                    key={category.slug.current}
                    href={`/blog/category/${category.slug.current}`}
                    className="bg-amber-600 text-white px-3 py-1 text-xs uppercase tracking-wider rounded"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-lora text-4xl md:text-5xl font-bold mb-6">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-gray-600 mb-8 pb-8 border-b">
              {/* Author */}
              {blog.author && (
                <div className="flex items-center gap-2">
                  {blog.author.image && (
                    <Image
                      src={urlFor(blog.author.image).width(40).height(40).url()}
                      alt={blog.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <Link
                      href={`/author/${blog.author.slug.current}`}
                      className="font-medium text-gray-800 hover:text-amber-600"
                    >
                      {blog.author.name}
                    </Link>
                    {blog.author.title && (
                      <p className="text-xs text-gray-500">
                        {blog.author.title}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Date */}
              <span className="flex items-center gap-2">
                <BiTime />
                <time dateTime={blog.publishedAt}>{publishedDate}</time>
              </span>
            </div>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl text-gray-700 mb-8 italic">
                {blog.excerpt}
              </p>
            )}

            {/* Body Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText
                value={blog.body}
                components={PortableTextComponents}
              />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-lora text-lg font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Link
                      key={tag.slug.current}
                      href={`/blog/tag/${tag.slug.current}`}
                      className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded hover:bg-amber-600 hover:text-white transition"
                    >
                      #{tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio - FIXED IMAGE ASPECT RATIO */}
            {blog.author && blog.author.bio && (
              <div className="mt-12 p-6 md:p-8 bg-gray-50 rounded-lg">
                <h3 className="font-lora text-xl font-semibold mb-6">
                  About the Author
                </h3>
                <div className="flex flex-col sm:flex-row gap-6">
                  {blog.author.image && (
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                        <Image
                          src={urlFor(blog.author.image)
                            .width(150)
                            .height(150)
                            .url()}
                          alt={blog.author.name}
                          fill
                          className="rounded-full object-cover"
                          sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg md:text-xl mb-1">
                      {blog.author.name}
                    </h4>
                    {blog.author.title && (
                      <p className="text-sm text-gray-600 mb-3">
                        {blog.author.title}
                      </p>
                    )}
                    <div className="prose prose-sm max-w-none">
                      <PortableText
                        value={blog.author.bio}
                        components={PortableTextComponents}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Posts */}
        {blog.relatedPosts && blog.relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="font-lora text-3xl font-bold mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blog.relatedPosts.map((post) => (
                <BlogCard key={post._id} blog={post} compact />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg p-8 text-center">
          <h2 className="font-lora text-3xl font-bold mb-4">
            Need Legal Assistance?
          </h2>
          <p className="text-lg mb-6">
            Get a free consultation with our experienced attorneys.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  );
}
