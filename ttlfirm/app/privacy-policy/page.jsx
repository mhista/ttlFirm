import PageHeader from "@components/pages/header";
import Section1 from "@components/common/section1";
import LegalShell from "@components/pages/legal/legalShell";
import { FIRM } from "@/lib/siteNav";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How The Turuchi Law Firm collects, uses, shares and protects personal information, including mobile phone numbers and SMS opt-in consent.",
  alternates: { canonical: "https://turuchilawfirm.com/privacy-policy" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "September 2, 2026";
const LAST_UPDATED = "September 2, 2026";

const SECTIONS = [
  { id: "information-we-collect", label: "1. Information We Collect" },
  { id: "how-we-use-information", label: "2. How We Use Information" },
  { id: "sms-communications", label: "3. SMS Communications" },
  { id: "information-sharing", label: "4. Sharing & SMS Consent" },
  { id: "cookies", label: "5. Cookies and Analytics" },
  { id: "security", label: "6. Security" },
  { id: "attorney-client", label: "7. Attorney-Client Relationship" },
  { id: "opt-out", label: "8. Opting Out of SMS" },
  { id: "retention", label: "9. Data Retention" },
  { id: "children", label: "10. Children" },
  { id: "third-party", label: "11. Third-Party Websites" },
  { id: "changes", label: "12. Changes to This Policy" },
  { id: "contact", label: "13. Contact Information" },
];

const PrivacyPolicy = () => (
  <>
    <PageHeader
      eyebrow="Legal"
      text="Privacy"
      text2="Policy"
      description="How we collect, use, share and protect your information — including mobile phone numbers and text message consent."
      image="/assets/images/laws.jpg"
      breadcrumbs={[{ label: "Privacy Policy" }]}
    />

    <Section1>
      <LegalShell
        sections={SECTIONS}
        effectiveDate={EFFECTIVE_DATE}
        lastUpdated={LAST_UPDATED}
        related={[
          { href: "/terms-and-conditions", label: "Terms & Conditions" },
          { href: "/disclaimer", label: "Legal Disclaimer" },
          { href: "/contact", label: "Contact the firm" },
        ]}
      >
        <p>
          The Turuchi Law Firm (&ldquo;Firm,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) operates this website and provides telephone and text-messaging
          communications through RingCentral and other service providers. This Privacy Policy
          explains what information we collect, how we use it, and the choices available to you.
        </p>

        <div className="callout">
          <strong>Text messaging in short:</strong> we will only text you if you separately opt in.
          Consent is voluntary and is never a condition of purchasing services, retaining the Firm,
          or receiving legal services. No mobile opt-in or text message consent will be shared with
          third parties or affiliates for marketing or promotional purposes. Reply{" "}
          <strong>STOP</strong> at any time to opt out, or <strong>HELP</strong> for assistance.
        </div>

        <h2 id="information-we-collect">1. Information We Collect</h2>
        <p>We may collect information you voluntarily provide, including:</p>
        <ul>
          <li>Name, address, telephone number (including mobile phone number), and email address;</li>
          <li>Information submitted through contact, consultation, or intake forms;</li>
          <li>
            Information provided during telephone calls, text messages, emails, or other
            communications;
          </li>
          <li>
            Information concerning a potential legal matter, including accident, injury, medical,
            insurance, employment, or other case-related information; and
          </li>
          <li>SMS preferences and consent records.</li>
        </ul>
        <p>
          We may also automatically collect technical information, including your IP address,
          browser type, device information, operating system, referring webpage, pages viewed, and
          general website-usage information through cookies, analytics tools, pixels, and similar
          technologies.
        </p>

        <h2 id="how-we-use-information">2. How We Use Information</h2>
        <p>We may use information to:</p>
        <ul>
          <li>Respond to inquiries and requests;</li>
          <li>Evaluate potential representation;</li>
          <li>Schedule consultations and appointments;</li>
          <li>Communicate concerning an existing or potential legal matter;</li>
          <li>Provide requested legal services;</li>
          <li>
            Send requested or consented transactional, informational, conversational, or promotional
            text messages;
          </li>
          <li>Maintain business, administrative, security, and consent records;</li>
          <li>Operate, maintain, and improve the website;</li>
          <li>Detect, prevent, and address fraud, abuse, security incidents, or technical problems; and</li>
          <li>Comply with legal and professional obligations.</li>
        </ul>
        <p>
          Submitting information does not guarantee that the Firm will contact you, accept your
          matter, or agree to represent you.
        </p>

        <h2 id="sms-communications">3. SMS Communications</h2>
        <p>
          If you separately opt in to receive SMS messages from the Firm, you may receive:
        </p>
        <ul>
          <li><strong>Conversational messages</strong>, such as responses to your inquiries;</li>
          <li>
            <strong>Transactional messages</strong>, such as appointment confirmations, reminders,
            and case-related communications;
          </li>
          <li>
            <strong>Informational messages</strong>, such as requested information and Firm
            announcements; and
          </li>
          <li>
            <strong>Promotional messages</strong>, such as information about Firm services, where
            permitted by law and applicable carrier requirements.
          </li>
        </ul>
        <p>
          Message content and frequency depend on your interactions with the Firm and the type of
          consent you provide.
        </p>
        <p>
          <strong>Message and data rates may apply. Messaging frequency may vary.</strong> Consent to
          receive SMS messages is not a condition of purchasing services, retaining the Firm, or
          receiving legal services.
        </p>

        <h2 id="information-sharing">4. Information Sharing and SMS Consent</h2>
        <p>
          We may share information with vendors and service providers that assist with website
          hosting, communications, SMS/MMS messaging, case management, scheduling, analytics,
          security, and Firm operations. RingCentral may process telephone numbers, message content,
          delivery information, and consent records to provide communications services to the Firm.
        </p>
        <div className="callout">
          <strong>
            No mobile opt-in or text message consent will be shared with third parties or affiliates
            for their own marketing purposes.
          </strong>{" "}
          The Firm does not sell mobile telephone numbers or SMS opt-in information. Service
          providers may receive such information only as necessary to provide services to the Firm
          and may not use it for independent marketing.
        </div>
        <p>
          We may also disclose information when authorized by you, required by law, necessary to
          comply with a legal or professional obligation, or reasonably necessary to protect the
          rights, safety, property, or security of the Firm, its clients, website users, or others.
        </p>

        <h2 id="cookies">5. Cookies and Analytics</h2>
        <p>
          The website may use cookies and similar technologies to remember preferences, understand
          website traffic, improve functionality, and measure website or advertising performance.
          You may be able to limit cookies through your browser settings. Disabling cookies may
          affect certain website features.
        </p>

        <h2 id="security">6. Security</h2>
        <p>
          The Firm maintains reasonable administrative, technical, and physical safeguards designed
          to protect information. No internet transmission, mobile network, electronic storage
          system, or security measure is completely secure. Accordingly, the Firm cannot guarantee
          absolute security.
        </p>

        <h2 id="attorney-client">7. Website Communications and Attorney-Client Relationship</h2>
        <p>
          Website inquiries, emails, telephone calls, and text messages may not be secure, may not be
          reviewed immediately, and may not reach the Firm.
        </p>
        <p>
          <strong>Submitting information does not create an attorney-client relationship.</strong>{" "}
          Representation begins only after the Firm confirms representation in writing, such as
          through a signed engagement or retainer agreement. Until then, do not assume that the Firm
          represents you or that deadlines, claims, or legal rights are being protected.
        </p>

        <h2 id="opt-out">8. Opting Out of SMS Communications</h2>
        <p>
          You may opt out at any time by replying <strong>STOP</strong> to any Firm text message. You
          may receive one confirmation message, after which no further messages will be sent unless
          you opt in again.
        </p>
        <p>
          For assistance, reply <strong>HELP</strong> or contact the Firm using the information
          below. Carriers are not liable for delayed or undelivered messages.
        </p>

        <h2 id="retention">9. Data Retention</h2>
        <p>
          The Firm retains information for as long as reasonably necessary for the purposes described
          in this Policy, including legal, professional, administrative, security, and
          record-retention purposes.
        </p>

        <h2 id="children">10. Children</h2>
        <p>
          The website and SMS program are not directed to children under 18. The Firm does not
          knowingly enroll anyone under 18 in its SMS program.
        </p>

        <h2 id="third-party">11. Third-Party Websites</h2>
        <p>
          The website may contain links to third-party websites. The Firm is not responsible for the
          content, security, or privacy practices of those websites.
        </p>

        <h2 id="changes">12. Changes to This Policy</h2>
        <p>
          The Firm may update this Policy periodically. Updates will be posted on this page with a
          revised &ldquo;Last Updated&rdquo; date.
        </p>

        <h2 id="contact">13. Contact Information</h2>
        <p>
          If you have questions about this Privacy Policy or about how your information is handled,
          contact us:
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

export default PrivacyPolicy;
