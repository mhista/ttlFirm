import Link from "next/link";
import PageHeader from "@components/pages/header";
import Section1 from "@components/common/section1";
import LegalShell from "@components/pages/legal/legalShell";
import { FIRM } from "@/lib/siteNav";
import { client } from "@/lib/sanity.client";
import { legalPageBySlugQuery } from "@/lib/sanity.queries";
import CmsLegalPage from "@components/pages/legal/cmsLegalPage";

export const revalidate = 60;

async function getDoc() {
  try {
    return await client.fetch(legalPageBySlugQuery, { slug: "disclaimer" });
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return null;
  }
}

export const metadata = {
  title: "Legal Disclaimer",
  description:
    "Attorney advertising notice, no-legal-advice disclaimer, and information about prior results and attorney-client relationships at The Turuchi Law Firm.",
  alternates: { canonical: "https://turuchilawfirm.com/disclaimer" },
};

const SECTIONS = [
  { id: "attorney-advertising", label: "Attorney Advertising" },
  { id: "no-legal-advice", label: "No Legal Advice" },
  { id: "no-relationship", label: "No Attorney-Client Relationship" },
  { id: "prior-results", label: "Prior Results" },
  { id: "jurisdiction", label: "Jurisdiction" },
  { id: "contact", label: "Contact" },
];

const DisclaimerFallback = () => (
  <>
    <PageHeader
      eyebrow="Legal"
      text="Legal"
      text2="Disclaimer"
      description="Important notices about this website, legal advice, and prior case results."
      image="/assets/images/laws.jpg"
      breadcrumbs={[{ label: "Disclaimer" }]}
    />

    <Section1>
      <LegalShell
        sections={SECTIONS}
        lastUpdated="September 2, 2026"
        related={[
          { href: "/privacy-policy", label: "Privacy Policy" },
          { href: "/terms-and-conditions", label: "Terms & Conditions" },
        ]}
      >
        <h2 id="attorney-advertising">Attorney Advertising</h2>
        <p>
          This website may be considered attorney advertising in some jurisdictions. It is intended
          to provide general information about The Turuchi Law Firm and the areas in which the Firm
          practises.
        </p>

        <h2 id="no-legal-advice">No Legal Advice</h2>
        <p>
          Nothing on this website is legal advice, and no page, article, or blog post here is a
          substitute for advice from a licensed attorney about your specific situation. Law changes,
          and outcomes turn on facts that a website cannot know. Do not act, or delay acting, based
          on anything you read here.
        </p>

        <h2 id="no-relationship">No Attorney-Client Relationship</h2>
        <p>
          Contacting the Firm through this website &mdash; by form, email, or text message &mdash;
          does not create an attorney-client relationship, and information you send before an
          engagement is confirmed in writing may not be treated as confidential or privileged. The
          Firm represents you only after it confirms representation in writing, such as through a
          signed engagement or retainer agreement. Please review our{" "}
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link> before sending
          information.
        </p>

        <h2 id="prior-results">Prior Results and Testimonials</h2>
        <p>
          Prior results do not guarantee or predict a similar outcome in any future matter. Case
          descriptions, results, and client testimonials reflect the particular facts of those
          matters. They are not a guarantee, warranty, or prediction about your matter.
        </p>

        <h2 id="jurisdiction">Jurisdiction</h2>
        <p>
          The Firm is licensed to practise in the State of New Jersey. Nothing on this website is an
          offer to represent you in a jurisdiction where the Firm is not licensed to practise.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          <strong>{FIRM.name}</strong>
          <br />
          {FIRM.addressLine1}
          <br />
          {FIRM.addressLine2}
          <br />
          <a href={`tel:${FIRM.phoneHref}`}>{FIRM.phoneDisplay}</a>
          <br />
          <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
        </p>
      </LegalShell>
    </Section1>
  </>
);

const Disclaimer = async () => {
  // Sanity wins when the document exists; the wording above ships as the
  // fallback so the page is never empty and never un-reviewed.
  const doc = await getDoc();
  if (doc?.sections?.length) {
    return <CmsLegalPage doc={doc} breadcrumbLabel="Disclaimer" />;
  }
  return <DisclaimerFallback />;
};

export default Disclaimer;
