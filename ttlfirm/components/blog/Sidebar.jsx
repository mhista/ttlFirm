import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import { BiTime } from "react-icons/bi";
import { CiFileOn } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { PRACTICE_AREAS } from "@/lib/siteNav";

export default function Sidebar({ recentPosts, categories, tags }) {
  return (
    <div className="w-full md:w-[350px] lg:w-[400px]">
      <div className="flex sm:px-[100px] md:px-0 flex-col p-10 gap-16 sticky top-24">
        {/* Recent Posts */}
        {recentPosts && recentPosts.length > 0 && (
          <div className="flex flex-col gap-7">
            <h1 className="font-display text-2xl font-medium">Recent Articles</h1>
            {recentPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="flex gap-4 items-start group"
              >
                {post.mainImage && (
                  <div className="relative w-[75px] h-[80px] flex-shrink-0">
                    <Image
                      src={urlFor(post.mainImage).width(150).height(160).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-ink-muted text-sm group-hover:text-accent-600 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <span className="flex items-center gap-2">
                    <BiTime className="text-ink-soft text-sm" />
                    <time
                      dateTime={post.publishedAt}
                      className="text-ink-soft uppercase text-xs font-medium"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                  {post.author && (
                    <span className="flex items-center gap-2">
                      <CiFileOn className="text-ink-soft" />
                      <p className="text-ink-soft uppercase text-xs font-medium">
                        {post.author.name}
                      </p>
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-col gap-5">
            <h1 className="font-display text-2xl font-medium">Categories</h1>
            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <div key={category._id}>
                  <hr className="w-full h-[1.5px] bg-accent-500 opacity-20 mb-3" />
                  <Link
                    href={`/blog/category/${category.slug.current}`}
                    className="hover:ml-4 hover:text-accent-600 hover:opacity-80 flex flex-row transition-all duration-300 gap-3 items-center font-medium text-sm"
                  >
                    <FaArrowRightLong className="text-xs" />
                    <span>
                      {category.title}{" "}
                      {category.postCount > 0 && `(${category.postCount})`}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-col gap-5">
            <h1 className="font-display text-2xl font-medium">Tags</h1>
            <div className="flex gap-3 items-center flex-wrap">
              {tags.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/blog/tag/${tag.slug.current}`}
                  className="bg-accent-500 text-white px-4 py-2 uppercase font-sans tracking-widest text-xs font-semibold opacity-85 cursor-pointer transition-all hover:opacity-100 hover:bg-accent-600"
                >
                  {tag.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Practice Areas */}
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-2xl font-bold text-navy-900">Practice Areas</h2>
          <div className="flex flex-col gap-3">
            {PRACTICE_AREAS.map((area) => (
              <div key={area.slug} className="flex flex-col gap-3">
                <hr className="h-px w-full border-0 bg-surface-line" />
                <Link
                  href={`/practice/${area.slug}`}
                  className="group flex flex-row items-center gap-3 text-sm font-medium text-ink transition-colors hover:text-accent-600"
                >
                  <FaArrowRightLong className="text-xs text-accent-500 transition-transform group-hover:translate-x-1" />
                  <span>{area.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
