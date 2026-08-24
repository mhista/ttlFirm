import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import { BiTime } from "react-icons/bi";
import { CiFileOn } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Sidebar({ recentPosts, categories, tags }) {
  return (
    <div className="w-full md:w-[350px] lg:w-[400px]">
      <div className="flex sm:px-[100px] md:px-0 flex-col p-10 gap-16 sticky top-24">
        {/* Recent Posts */}
        {recentPosts && recentPosts.length > 0 && (
          <div className="flex flex-col gap-7">
            <h1 className="font-lora text-2xl font-medium">Recent Articles</h1>
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
                  <h3 className="font-semibold text-gray-700 text-sm group-hover:text-amber-600 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <span className="flex items-center gap-2">
                    <BiTime className="text-gray-400 text-sm" />
                    <time
                      dateTime={post.publishedAt}
                      className="text-gray-400 uppercase text-xs font-medium"
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
                      <CiFileOn className="text-gray-400" />
                      <p className="text-gray-400 uppercase text-xs font-medium">
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
            <h1 className="font-lora text-2xl font-medium">Categories</h1>
            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <div key={category._id}>
                  <hr className="w-full h-[1.5px] bg-amber-600 opacity-20 mb-3" />
                  <Link
                    href={`/blog/category/${category.slug.current}`}
                    className="hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row transition-all duration-300 gap-3 items-center font-medium text-sm"
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
            <h1 className="font-lora text-2xl font-medium">Tags</h1>
            <div className="flex gap-3 items-center flex-wrap">
              {tags.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/blog/tag/${tag.slug.current}`}
                  className="bg-amber-600 text-gray-200 px-4 py-2 uppercase font-jost tracking-widest text-xs font-semibold opacity-85 cursor-pointer transition-all hover:opacity-100 hover:bg-amber-700"
                >
                  {tag.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Practice Areas */}
        <div className="flex flex-col gap-5">
          <h1 className="font-lora text-2xl font-medium">Practice Areas</h1>
          <div className="flex flex-col gap-3">
            <hr className="w-full h-[1.5px] bg-amber-600 opacity-20" />
            <Link
              href="/practice/1"
              className="hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row transition-all duration-300 gap-3 items-center font-medium text-sm"
            >
              <FaArrowRightLong className="text-xs" />
              <span>Personal Injury</span>
            </Link>
            <hr className="w-full h-[1.5px] bg-amber-600 opacity-20" />
            <Link
              href="/practice/2"
              className="hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row transition-all duration-300 gap-3 items-center font-medium text-sm"
            >
              <FaArrowRightLong className="text-xs" />
              <span>Immigration Law</span>
            </Link>
            <hr className="w-full h-[1.5px] bg-amber-600 opacity-20" />
            <Link
              href="/practice/3"
              className="hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row transition-all duration-300 gap-3 items-center font-medium text-sm"
            >
              <FaArrowRightLong className="text-xs" />
              <span>Workers' Compensation</span>
            </Link>
            <hr className="w-full h-[1.5px] bg-amber-600 opacity-20" />
            <Link
              href="/practice/4"
              className="hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row transition-all duration-300 gap-3 items-center font-medium text-sm"
            >
              <FaArrowRightLong className="text-xs" />
              <span>Municipal Court Matters</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
