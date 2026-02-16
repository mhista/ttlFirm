import PracticeArea from "@components/pages/home/practiceAreas";
import Section2 from "@components/common/section2";
import Section4 from "@components/common/section4";
import Consultation from "@components/pages/home/consult";
import PageHeader from "@components/pages/header";
import Script from "next/script";
import { client } from "@/lib/sanity.client";
import { practiceAreasQuery } from "@/lib/sanity.queries";

export const revalidate = 0;

export const metadata = {
  title: "Practice Areas | Personal Injury, Immigration & Workers' Comp Lawyer NJ",
  description: "Comprehensive legal services in NJ: Personal Injury, Immigration Law, Workers' Compensation, Municipal Court Defense. Serving Essex, Union, Hudson & all NJ counties.",
  keywords: [
    "NJ practice areas",
    "personal injury lawyer",
    "immigration attorney NJ",
    "workers compensation lawyer",
    "municipal court defense",
    "legal services New Jersey"
  ],
  openGraph: {
    title: "Our Practice Areas | Turuchi Law Firm",
    description: "Expert legal representation across multiple practice areas serving all New Jersey counties.",
    url: "https://turuchilawfirm.com/practice",
    images: [{ url: "/assets/images/inju.jpg", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://turuchilawfirm.com/practice"
  }
};

const practiceAreasSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Legal Services",
  "provider": {
    "@type": "LegalService",
    "name": "Turuchi Law Firm, LLC"
  },
  "areaServed": {
    "@type": "State",
    "name": "New Jersey"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Legal Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Personal Injury Law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Immigration Law" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Workers' Compensation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Municipal Court Matters" } }
    ]
  }
};

// export const revalidate = 0; // disable cache for debugging

const PracticeAreasPage = async () => {

  // ── DEBUG: try the simplest possible query first ──────────────────────────
  const raw = await client
    .fetch(`*[_type == "practiceArea"][0...10]{ _id, name, status, slug }`)
    .catch((e) => { console.error("SANITY FETCH ERROR:", e); return null; });

  console.log("──── SANITY DEBUG ────────────────────────────");
  console.log("raw result:", JSON.stringify(raw, null, 2));
  console.log("─────────────────────────────────────────────");
  // ── END DEBUG ─────────────────────────────────────────────────────────────

  // full query only if raw worked
  const practiceAreas = Array.isArray(raw)
    ? await client
        .fetch(`*[_type == "practiceArea" && status == "published"] | order(order asc) {
          _id, name, slug, excerpt, image { asset->{ _id, url }, alt },
          "subServices": *[_type == "subService" && practiceArea._ref == ^._id && status == "published"]{ _id, title, slug }
        }`)
        .catch(() => [])
    : [];

  return (
    <>
      {/* Visible debug panel — remove after fixing */}
      <div style={{ background: '#1c1c1c', color: '#0f0', fontFamily: 'monospace', padding: '16px', fontSize: '13px', whiteSpace: 'pre-wrap', zIndex: 9999, position: 'relative' }}>
        <strong>DEBUG — Sanity raw (no status filter):</strong>{"\n"}
        {raw === null
          ? "❌ FETCH THREW AN ERROR — check terminal for SANITY FETCH ERROR"
          : raw.length === 0
          ? "⚠️  Query returned 0 documents. Check: _type name, dataset, projectId."
          : raw.map(a => `✅ _id:${a._id}  name:"${a.name}"  status:"${a.status}"  slug:"${a.slug?.current}"`).join("\n")
        }
        {"\n\n"}
        <strong>practiceAreas (published only):</strong>{"\n"}
        {practiceAreas.length === 0
          ? "⚠️  0 published practice areas — check status field value in Sanity"
          : practiceAreas.map(a => `✅ "${a.name}" → /practice/${a.slug?.current}`).join("\n")
        }
      </div>

      <div className="relative">
        <PageHeader text={"Our Practice"} text2={"Areas"} subAreas={[]} />
        <Section2>
          <PracticeArea practiceAreas={practiceAreas} />
        </Section2>
        <Section4>
          <Consultation />
        </Section4>
      </div>
    </>
  );
};

export default PracticeAreasPage;