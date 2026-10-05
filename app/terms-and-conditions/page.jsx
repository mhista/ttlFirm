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
    return await client.fetch(legalPageBySlugQuery, { slug: "terms-and-conditions" });
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return null;
  }
}

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms governing use of The Turuchi Law Firm website and the firm's SMS text messaging program, including opt-in, STOP/HELP, message frequency and carrier disclosures.",
  alternates: { canonical: "https://turuchilawfirm.com/terms-and-conditions" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "September 2, 2026";
const LAST_UPDATED = "September 2, 2026";

const SECTIONS = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "no-legal-advice", label: "2. No Legal Advice" },
  { id: "no-attorney-client", label: "3. No Attorney-Client Relationship" },
  { id: "permitted-use", label: "4. Permitted Use of the Website" },
  { id: "intellectual-property", label: "5. Intellectual Property" },
  { id: "third-party-links", label: "6. Third-Party Links" },
  { id: "attorney-advertising", label: "7. Attorney Advertising" },
  { id: "disclaimers", label: "8. Disclaimers" },
  { id: "limitation-of-liability", label: "9. Limitation of Liability" },
  { id: "governing-law", label: "10. Governing Law" },
  { id: "sms-program", label: "11. SMS Program Description" },
  { id: "sms-disclosures", label: "12. Required SMS Disclosures" },
  { id: "sms-consent", label: "13. Consent" },
  { id: "sms-opt-out", label: "14. Opt-Out and Support" },
  { id: "prohibited-uses", label: "15. Prohibited Uses and Content" },
  { id: "carrier-disclaimer", label: "16. Carrier Disclaimer" },
  { id: "age-requirement", label: "17. Age Requirement" },
  { id: "privacy", label: "18. Privacy Policy" },
  { id: "changes", label: "19. Changes to These Terms" },
  { id: "contact", label: "20. Contact Information" },
];

const TermsAndConditionsFallback = () => (
  <>
    <PageHeader
      eyebrow="Legal"
      text="Terms &"
      text2="Conditions"
      description="The rules governing use of this website, and the terms of the firm's SMS text messaging program."
      image="/assets/images/laws.jpg"
      breadcrumbs={[{ label: "Terms & Conditions" }]}
    />

    <Section1>
      <LegalShell
        sections={SECTIONS}
        effectiveDate={EFFECTIVE_DATE}
        lastUpdated={LAST_UPDATED}
        related={[
          { href: "/privacy-policy", label: "Privacy Policy" },
          { href: "/disclaimer", label: "Legal Disclaimer" },
          { href: "/contact", label: "Contact the firm" },
        ]}
      >
        <p>
          These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the website operated by
          The Turuchi Law Firm (&ldquo;Firm,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) and your participation in the Firm&rsquo;s SMS text messaging program.
          Part I covers use of the website. Part II covers text messaging.
        </p>

        <div className="callout">
          <strong>SMS disclosures at a glance:</strong> if you consent to receive conversational,
          transactional, informational and promotional SMS messages from The Turuchi Law Firm, you
          agree to receive those messages from us. Reply <strong>STOP</strong> to opt out. Reply{" "}
          <strong>HELP</strong> for support. Message and data rates may apply. Message frequency
          varies. Carriers are not liable for delayed or undelivered messages. Consent is not a
          condition of purchasing services, retaining the Firm, or receiving legal services. See our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </div>

        <h3>Part I &mdash; Website Terms of Use</h3>

        <h2 id="acceptance">1. Acceptance of These Terms</h2>
        <p>
          By accessing or using this website, you agree to be bound by these Terms and by our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree, please do not use
          the website. Your continued use of the website after these Terms are revised constitutes
          acceptance of the revised Terms to the extent permitted by law.
        </p>

        <h2 id="no-legal-advice">2. No Legal Advice</h2>
        <p>
          The content on this website is provided for general informational purposes only and is not
          legal advice. Legal outcomes depend on the specific facts of each matter and on law that
          changes over time. You should not act, or refrain from acting, on the basis of anything on
          this website without seeking advice from a licensed attorney regarding your particular
          situation.
        </p>
        <p>
          Nothing on this website is a guarantee, warranty, or prediction regarding the outcome of
          any legal matter.
        </p>

        <h2 id="no-attorney-client">3. No Attorney-Client Relationship</h2>
        <div className="callout">
          <strong>
            Submitting a form, sending a text message, sending an email, or otherwise contacting the
            Firm through this website does not create an attorney-client relationship.
          </strong>{" "}
          An attorney-client relationship with the Firm is formed only when the Firm confirms
          representation in writing, such as through a signed engagement or retainer agreement.
        </div>
        <p>
          Until representation is confirmed in writing, do not assume that the Firm represents you or
          that any deadline, claim, or legal right of yours is being protected. Communications sent
          before an attorney-client relationship exists may not be treated as privileged or
          confidential, and may not be reviewed immediately. Please do not send confidential or
          time-sensitive information through this website.
        </p>
        <p>
          If your matter is urgent or a filing deadline may be approaching, call the Firm directly at{" "}
          <a href={`tel:${FIRM.phoneHref}`}>{FIRM.phoneDisplay}</a>.
        </p>

        <h2 id="permitted-use">4. Permitted Use of the Website</h2>
        <p>You agree that you will not:</p>
        <ul>
          <li>Use the website for any unlawful, fraudulent, deceptive, or abusive purpose;</li>
          <li>
            Submit false, misleading, or impersonated information, including a telephone number you
            are not authorized to provide;
          </li>
          <li>
            Attempt to gain unauthorized access to the website, its servers, or any connected system
            or network;
          </li>
          <li>
            Introduce malware, or interfere with or disrupt the integrity, security, or performance
            of the website;
          </li>
          <li>
            Use automated means to scrape, harvest, or collect information from the website without
            the Firm&rsquo;s written permission; or
          </li>
          <li>Use the website in a manner that violates any applicable law or regulation.</li>
        </ul>
        <p>
          The Firm may suspend or terminate access to the website, or to the SMS program, for conduct
          that violates these Terms.
        </p>

        <h2 id="intellectual-property">5. Intellectual Property</h2>
        <p>
          The website and its contents &mdash; including text, graphics, logos, images, page layout,
          and the selection and arrangement of content &mdash; are owned by or licensed to the Firm
          and are protected by applicable intellectual property laws. You may view and print content
          for your own personal, non-commercial reference. Any other reproduction, distribution,
          modification, republication, or commercial use requires the Firm&rsquo;s prior written
          permission.
        </p>

        <h2 id="third-party-links">6. Third-Party Links and Content</h2>
        <p>
          The website may contain links to third-party websites and may incorporate third-party
          services. Those links and services are provided for convenience only. The Firm does not
          control and is not responsible for the content, security, availability, or privacy
          practices of any third party, and a link does not imply endorsement.
        </p>

        <h2 id="attorney-advertising">7. Attorney Advertising and Prior Results</h2>
        <p>
          This website may be considered attorney advertising in some jurisdictions. Prior results do
          not guarantee or predict a similar outcome in any future matter. Any testimonial, review,
          case description, or result described on this website reflects the specific facts of that
          matter and should not be understood as a representation about what the Firm can achieve in
          your matter. Testimonials are not a guarantee, warranty, or prediction regarding the
          outcome of your legal matter.
        </p>

        <h2 id="disclaimers">8. Disclaimers</h2>
        <p>
          The website and all content on it are provided &ldquo;as is&rdquo; and &ldquo;as
          available,&rdquo; without warranties of any kind, whether express or implied, including
          implied warranties of merchantability, fitness for a particular purpose, accuracy,
          non-infringement, and uninterrupted or error-free operation, to the fullest extent
          permitted by applicable law.
        </p>
        <p>
          The Firm does not warrant that the website will be available at all times, that defects
          will be corrected, or that the website or the servers that make it available are free of
          harmful components.
        </p>

        <h2 id="limitation-of-liability">9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, the Firm and its attorneys, employees,
          and agents will not be liable for any indirect, incidental, special, consequential, or
          punitive damages, or for any loss of data, profits, or goodwill, arising out of or relating
          to your access to or use of, or inability to use, this website, the SMS program, or any
          content on the website &mdash; whether based in contract, tort, statute, or any other legal
          theory, and whether or not the Firm was advised of the possibility of such damages.
        </p>
        <p>
          Nothing in these Terms limits any liability that cannot lawfully be limited, and nothing in
          these Terms is intended to limit any obligation the Firm owes to a client under the New
          Jersey Rules of Professional Conduct.
        </p>

        <h2 id="governing-law">10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of New Jersey, without regard to its
          conflict-of-laws principles. Any dispute arising out of or relating to these Terms or the
          website shall be brought exclusively in the state or federal courts located in New Jersey,
          and you consent to the jurisdiction of those courts.
        </p>
        <p>
          If any provision of these Terms is held unenforceable, that provision will be limited or
          severed to the minimum extent necessary, and the remaining provisions will remain in full
          force and effect.
        </p>

        <h3>Part II &mdash; SMS Terms of Service</h3>

        <h2 id="sms-program">11. Program Description</h2>
        <p>
          By voluntarily opting in to receive SMS messages from The Turuchi Law Firm, you agree to
          receive conversational, transactional, informational and, where applicable, promotional
          messages from the Firm. Messages may include appointment reminders, requested information,
          responses to inquiries, case-related communications, Firm announcements, and information
          about Firm services.
        </p>
        <p>
          Opt-in is collected through the contact and text-message forms on this website, where the
          SMS consent checkbox is optional and is not pre-selected, and through other channels where
          you expressly agree to receive messages.
        </p>

        <h2 id="sms-disclosures">12. Required Disclosures</h2>
        <ul>
          <li><strong>Message and data rates may apply.</strong></li>
          <li><strong>Message frequency varies.</strong></li>
          <li>Reply <strong>STOP</strong> to opt out.</li>
          <li>Reply <strong>HELP</strong> for support.</li>
          <li>
            Consent is not a condition of purchasing services, retaining the Firm, or receiving legal
            services.
          </li>
          <li>Carriers are not liable for delayed or undelivered messages.</li>
        </ul>
        <p>
          For additional information, review the Firm&rsquo;s{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and these Terms and Conditions.
        </p>

        <h2 id="sms-consent">13. Consent</h2>
        <div className="callout">
          I consent to receive conversational, transactional, informational and, where applicable,
          promotional SMS messages from The Turuchi Law Firm. Message and data rates may apply.
          Messaging frequency may vary. Reply STOP to opt out and HELP for support. Consent is not a
          condition of purchasing services, retaining the Firm, or receiving legal services. View the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> and Terms and Conditions.
        </div>
        <p>
          The Firm will maintain records of SMS consent and opt-out requests as reasonably necessary
          for compliance and business purposes. No mobile opt-in or text message consent will be
          shared with third parties or affiliates for their own marketing or promotional purposes.
        </p>

        <h2 id="sms-opt-out">14. Opt-Out and Support</h2>
        <p>
          Reply <strong>STOP</strong> to cancel SMS messages. Reply <strong>HELP</strong> for
          assistance. After opting out, you may receive one confirmation message, and no further
          messages will be sent unless you opt in again.
        </p>
        <p>
          You may also opt out or request assistance by calling{" "}
          <a href={`tel:${FIRM.phoneHref}`}>{FIRM.phoneDisplay}</a> or emailing{" "}
          <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>.
        </p>

        <h2 id="prohibited-uses">15. Prohibited Uses and Content</h2>
        <p>
          The Firm will use its SMS/MMS program only for lawful communications consistent with the
          consent provided. The Firm will not use the program to send content prohibited by
          applicable law, telecommunications carriers, RingCentral, or applicable messaging-industry
          registration requirements. The Firm may refuse, suspend, or terminate messaging enrollment
          if content, traffic, consent practices, or use of the program violates applicable
          requirements. Users may not use the program to transmit unlawful, fraudulent, abusive,
          deceptive, threatening, harassing, discriminatory, or otherwise prohibited content.
        </p>

        <h2 id="carrier-disclaimer">16. Carrier Disclaimer</h2>
        <p>
          <strong>Carriers are not liable for delayed or undelivered messages.</strong> Message
          delivery may depend on the carrier, RingCentral, the recipient&rsquo;s device, network
          availability, and other factors outside the Firm&rsquo;s control.
        </p>

        <h2 id="age-requirement">17. Age Requirement</h2>
        <p>
          You must be at least 18 years old to participate in the Firm&rsquo;s SMS program. The
          website and the SMS program are not directed to children under 18, and the Firm does not
          knowingly enroll anyone under 18.
        </p>

        <h2 id="privacy">18. Privacy Policy</h2>
        <p>
          Information collected through this website and through the SMS program is handled as
          described in our <Link href="/privacy-policy">Privacy Policy</Link>, which is incorporated
          into these Terms by reference.
        </p>

        <h2 id="changes">19. Changes to These Terms</h2>
        <p>
          The Firm may revise these Terms by posting an updated version on the website with a revised
          &ldquo;Last Updated&rdquo; date. Continued use of the website, or continued participation in
          the SMS program, after the revised Terms are posted constitutes acceptance to the extent
          permitted by law.
        </p>

        <h2 id="contact">20. Contact Information</h2>
        <p>
          Questions about these Terms, the website, or the SMS program may be directed to:
        </p>
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

const TermsAndConditions = async () => {
  // Sanity wins when the document exists; the wording above ships as the
  // fallback so the page is never empty and never un-reviewed.
  const doc = await getDoc();
  if (doc?.sections?.length) {
    return <CmsLegalPage doc={doc} breadcrumbLabel="Terms & Conditions" />;
  }
  return <TermsAndConditionsFallback />;
};

export default TermsAndConditions;
