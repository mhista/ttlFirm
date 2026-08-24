import { client } from "@/lib/sanity.client";
import { authorQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/blog/PortableTextComponents";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/pages/header";

export const revalidate = 60;

const allAuthorsQuery = `*[_type == "author"] {slug}`;

export async function generateStaticParams() {
  const authors = await client.fetch(allAuthorsQuery);
  return authors.map((author) => ({
    slug: author.slug.current,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ← FIX: Await params
  const author = await client.fetch(authorQuery, { slug });

  if (!author) {
    return { title: "Author Not Found" };
  }

  return {
    title: `${author.name} | Authors | Turuchi Law Firm`,
    description: `Read articles by ${author.name}${author.title ? `, ${author.title}` : ""}`,
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params; // ← FIX: Await params
  const author = await client.fetch(authorQuery, { slug });

  if (!author) {
    notFound();
  }

  return (
    <div className="bg-zinc-100 min-h-screen">
      <PageHeader text="Author:" text2={author.name} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {author.image && (
              <div className="flex-shrink-0">
                <Image
                  src={urlFor(author.image).width(200).height(200).url()}
                  alt={author.name}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="font-lora text-4xl font-bold mb-2">
                {author.name}
              </h1>
              {author.title && (
                <p className="text-xl text-gray-600 mb-4">{author.title}</p>
              )}

              {author.bio && (
                <div className="prose prose-lg">
                  <PortableText
                    value={author.bio}
                    components={PortableTextComponents}
                  />
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2 text-gray-600">
                {author.email && (
                  <div className="flex items-center gap-2">
                    <strong>Email:</strong>
                    <a
                      href={`mailto:${author.email}`}
                      className="text-amber-600 hover:underline"
                    >
                      {author.email}
                    </a>
                  </div>
                )}
                {author.phone && (
                  <div className="flex items-center gap-2">
                    <strong>Phone:</strong>
                    <a
                      href={`tel:${author.phone}`}
                      className="text-amber-600 hover:underline"
                    >
                      {author.phone}
                    </a>
                  </div>
                )}
              </div>

              {author.social && (
                <div className="mt-6 flex gap-4">
                  {author.social.linkedin && (
                    <Link
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      LinkedIn
                    </Link>
                  )}
                  {author.social.twitter && (
                    <Link
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600"
                    >
                      Twitter
                    </Link>
                  )}
                  {author.social.facebook && (
                    <Link
                      href={author.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900"
                    >
                      Facebook
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Author's Posts */}
        {author.posts && author.posts.length > 0 && (
          <div>
            <h2 className="font-lora text-3xl font-bold mb-6">
              Articles by {author.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {author.posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition group"
                >
                  <div className="p-6">
                    <h3 className="font-lora text-xl font-semibold mb-2 group-hover:text-amber-600 transition">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    <time
                      dateTime={post.publishedAt}
                      className="text-xs text-gray-500"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}