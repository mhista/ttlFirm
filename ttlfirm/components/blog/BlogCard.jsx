import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import { BiTime } from "react-icons/bi";
import { CiFileOn } from "react-icons/ci"; 

export default function BlogCard({ blog, compact = false }) {
  const publishedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (compact) {
    return (
      <Link
        href={`/blog/${blog.slug.current}`}
        className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition group"
      >
        {blog.mainImage && (
          <div className="relative w-full h-48">
            <Image
              src={urlFor(blog.mainImage).width(400).height(300).url()}
              alt={blog.mainImage.alt || blog.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-lora text-lg font-semibold mb-2 group-hover:text-amber-600 transition">
            {blog.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BiTime />
            <time dateTime={blog.publishedAt}>{publishedDate}</time>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white flex flex-col items-center z-[60] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      <Link href={`/blog/${blog.slug.current}`} className="w-full">
        {blog.mainImage && (
          <div className="relative w-full h-[300px] lg:h-[350px]">
            <Image
              src={urlFor(blog.mainImage).width(800).height(400).url()}
              alt={blog.mainImage.alt || blog.title}
              fill
              className="object-cover hover:opacity-90 transition"
            />
          </div>
        )}
      </Link>

      <div className="flex flex-col w-full p-8 lg:p-12 gap-4">
        {/* Categories */}
        {blog.categories && blog.categories.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {blog.categories.map((category) => (
              <Link
                key={category.slug.current}
                href={`/blog/category/${category.slug.current}`}
                className="bg-amber-600 text-white px-3 py-1 text-xs uppercase tracking-wider rounded hover:bg-amber-700 transition"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${blog.slug.current}`}
          className="group"
        >
          <h2 className="text-2xl lg:text-3xl font-medium font-lora group-hover:text-amber-600 transition">
            {blog.title}
          </h2>
        </Link>

        {blog.excerpt && (
          <p className="text-gray-700 line-clamp-3">{blog.excerpt}</p>
        )}

        <div className="flex flex-col items-start w-full text-gray-600 text-sm">
          {/* Author & Date */}
          <div className="flex items-center gap-2 mb-2">
            <BiTime />
            <time dateTime={blog.publishedAt}>{publishedDate}</time>
          </div>

          {blog.author && (
            <div className="flex items-center gap-2">
              <CiFileOn />
              <Link
                href={`/author/${blog.author.slug.current}`}
                className="hover:text-amber-600 transition"
              >
                {blog.author.name}
              </Link>
            </div>
          )}

          <Link
            href={`/blog/${blog.slug.current}`}
            className="btn w-32 text-center hover:text-black mt-6"
          >
            READ MORE
          </Link>
        </div>
      </div>
    </div>
  );
}