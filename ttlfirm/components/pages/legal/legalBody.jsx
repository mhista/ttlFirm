"use client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

/**
 * Renders the rich-text blocks of a CMS-authored legal document inside the
 * `.legal-doc` styles. Kept separate from LegalShell so the hard-coded
 * fallback documents can use the same shell without loading Portable Text.
 */
const components = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <div className="callout">{children}</div>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li className="pl-0 before:hidden">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const internal = href.startsWith("/");
      return internal ? (
        <Link href={href}>{children}</Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
};

export const LegalRichText = ({ value }) =>
  value?.length ? <PortableText value={value} components={components} /> : null;

/**
 * The numbered sections of a CMS legal page. Anchors come from the Studio so
 * existing #links keep working when sections are reordered.
 */
const LegalBody = ({ intro, callout, sections = [] }) => (
  <>
    <LegalRichText value={intro} />
    {callout?.length > 0 && (
      <div className="callout">
        <LegalRichText value={callout} />
      </div>
    )}

    {sections.map((section, i) => (
      <div key={section.anchor || i}>
        {section.partLabel && <h3>{section.partLabel}</h3>}
        <h2 id={section.anchor || `section-${i + 1}`}>{section.heading}</h2>
        <LegalRichText value={section.body} />
        {section.callout?.length > 0 && (
          <div className="callout">
            <LegalRichText value={section.callout} />
          </div>
        )}
      </div>
    ))}
  </>
);

export default LegalBody;
