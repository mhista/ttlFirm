import Script from "next/script";

export default function SEOHead({ schema }) {
  if (!schema) return null;

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}