import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";

const PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || "Blog image"}
            width={800}
            height={600}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-ink-muted mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const bgColors = {
        info: "bg-blue-50 border-blue-500",
        warning: "bg-accent-300/25 border-accent-500",
        success: "bg-green-50 border-green-500",
        error: "bg-red-50 border-red-500",
      };

      return (
        <div
          className={`my-6 p-4 border-l-4 rounded ${
            bgColors[value.type] || bgColors.info
          }`}
        >
          <p className="text-navy-900">{value.content}</p>
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = value.blank ? "noopener noreferrer" : undefined;
      return (
        <Link
          href={value.href}
          target={value.blank ? "_blank" : undefined}
          rel={rel}
          className="text-accent-500 hover:text-accent-600 underline"
        >
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-display font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-display font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-display font-bold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-display font-bold mt-6 mb-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent-500 pl-4 my-6 italic text-ink-muted">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
};

export default PortableTextComponents;