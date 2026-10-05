#!/usr/bin/env node
/**
 * Generates Sanity import files for the legal pages and the campaign landing
 * pages, so both are editable in the Studio instead of living in code.
 *
 *   node scripts/seed-content.mjs
 *   cd sanity
 *   npx sanity dataset import ../seed/legal-pages.ndjson production
 *   npx sanity dataset import ../seed/landing-pages.ndjson production
 *
 * The documents use fixed _ids, so re-running the import with
 * `--replace` updates them in place rather than creating duplicates.
 *
 * The site already renders the legal wording from hard-coded fallbacks, so
 * importing is optional — it is what makes the text editable by the client.
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// One copy of the attorney's bio, shared with the site itself so the landing
// pages and the homepage can never fall out of step.
import { ATTORNEY_BIO } from "../lib/attorneyBio.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, "..", "seed");

let keySeed = 0;
const key = () => `k${(keySeed++).toString(36)}`;

/* ------------------------------------------------------------ portable text */

/** Paragraph. Wrap a phrase in **double asterisks** to bold it. */
const p = (text) => {
  const spans = [];
  const markDefs = [];
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);

  for (const part of parts) {
    if (!part) continue;
    const bold = part.startsWith("**") && part.endsWith("**");
    spans.push({
      _type: "span",
      _key: key(),
      text: bold ? part.slice(2, -2) : part,
      marks: bold ? ["strong"] : [],
    });
  }

  return { _type: "block", _key: key(), style: "normal", markDefs, children: spans };
};

/** Bulleted list item. */
const li = (text) => ({ ...p(text), listItem: "bullet", level: 1 });

const blocks = (...lines) => lines.flat().filter(Boolean);

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

const section = (heading, body, opts = {}) => ({
  _type: "legalSection",
  _key: key(),
  partLabel: opts.part,
  heading,
  anchor: { _type: "slug", current: opts.anchor || slugify(heading.replace(/^\d+\.\s*/, "")) },
  body,
  callout: opts.callout,
});

/* ========================================================================== */
/*  LEGAL PAGES                                                               */
/* ========================================================================== */

const EFFECTIVE = "September 2, 2026";

const privacyPolicy = {
  _id: "legalPage-privacy-policy",
  _type: "legalPage",
  title: "Privacy Policy",
  slug: { _type: "slug", current: "privacy-policy" },
  pageHeader: {
    eyebrow: "Legal",
    heading: "Privacy",
    headingHighlight: "Policy",
    description:
      "How we collect, use, share and protect your information — including mobile phone numbers and text message consent.",
  },
  effectiveDate: EFFECTIVE,
  lastUpdated: EFFECTIVE,
  showContactCard: true,
  contactCardHeading: "Questions about this policy?",
  intro: blocks(
    p(
      "The Turuchi Law Firm (“Firm,” “we,” “us,” or “our”) operates this website and provides telephone and text-messaging communications through RingCentral and other service providers. This Privacy Policy explains what information we collect, how we use it, and the choices available to you."
    )
  ),
  callout: blocks(
    p(
      "**Text messaging in short:** we will only text you if you separately opt in. Consent is voluntary and is never a condition of purchasing services, retaining the Firm, or receiving legal services. No mobile opt-in or text message consent will be shared with third parties or affiliates for marketing or promotional purposes. Reply **STOP** at any time to opt out, or **HELP** for assistance."
    )
  ),
  relatedLinks: [
    { _key: key(), label: "Terms & Conditions", href: "/terms-and-conditions" },
    { _key: key(), label: "Legal Disclaimer", href: "/disclaimer" },
    { _key: key(), label: "Contact the firm", href: "/contact" },
  ],
  sections: [
    section("1. Information We Collect", blocks(
      p("We may collect information you voluntarily provide, including:"),
      li("Name, address, telephone number (including mobile phone number), and email address;"),
      li("Information submitted through contact, consultation, or intake forms;"),
      li("Information provided during telephone calls, text messages, emails, or other communications;"),
      li("Information concerning a potential legal matter, including accident, injury, medical, insurance, employment, or other case-related information; and"),
      li("SMS preferences and consent records."),
      p("We may also automatically collect technical information, including your IP address, browser type, device information, operating system, referring webpage, pages viewed, and general website-usage information through cookies, analytics tools, pixels, and similar technologies.")
    ), { anchor: "information-we-collect" }),

    section("2. How We Use Information", blocks(
      p("We may use information to:"),
      li("Respond to inquiries and requests;"),
      li("Evaluate potential representation;"),
      li("Schedule consultations and appointments;"),
      li("Communicate concerning an existing or potential legal matter;"),
      li("Provide requested legal services;"),
      li("Send requested or consented transactional, informational, conversational, or promotional text messages;"),
      li("Maintain business, administrative, security, and consent records;"),
      li("Operate, maintain, and improve the website;"),
      li("Detect, prevent, and address fraud, abuse, security incidents, or technical problems; and"),
      li("Comply with legal and professional obligations."),
      p("Submitting information does not guarantee that the Firm will contact you, accept your matter, or agree to represent you.")
    ), { anchor: "how-we-use-information" }),

    section("3. SMS Communications", blocks(
      p("If you separately opt in to receive SMS messages from the Firm, you may receive:"),
      li("**Conversational messages**, such as responses to your inquiries;"),
      li("**Transactional messages**, such as appointment confirmations, reminders, and case-related communications;"),
      li("**Informational messages**, such as requested information and Firm announcements; and"),
      li("**Promotional messages**, such as information about Firm services, where permitted by law and applicable carrier requirements."),
      p("Message content and frequency depend on your interactions with the Firm and the type of consent you provide."),
      p("**Message and data rates may apply. Messaging frequency may vary.** Consent to receive SMS messages is not a condition of purchasing services, retaining the Firm, or receiving legal services.")
    ), { anchor: "sms-communications" }),

    section("4. Information Sharing and SMS Consent", blocks(
      p("We may share information with vendors and service providers that assist with website hosting, communications, SMS/MMS messaging, case management, scheduling, analytics, security, and Firm operations. RingCentral may process telephone numbers, message content, delivery information, and consent records to provide communications services to the Firm."),
      p("We may also disclose information when authorized by you, required by law, necessary to comply with a legal or professional obligation, or reasonably necessary to protect the rights, safety, property, or security of the Firm, its clients, website users, or others.")
    ), {
      anchor: "information-sharing",
      callout: blocks(
        p("**No mobile opt-in or text message consent will be shared with third parties or affiliates for their own marketing purposes.** The Firm does not sell mobile telephone numbers or SMS opt-in information. Service providers may receive such information only as necessary to provide services to the Firm and may not use it for independent marketing.")
      ),
    }),

    section("5. Cookies and Analytics", blocks(
      p("The website may use cookies and similar technologies to remember preferences, understand website traffic, improve functionality, and measure website or advertising performance. You may be able to limit cookies through your browser settings. Disabling cookies may affect certain website features.")
    ), { anchor: "cookies" }),

    section("6. Security", blocks(
      p("The Firm maintains reasonable administrative, technical, and physical safeguards designed to protect information. No internet transmission, mobile network, electronic storage system, or security measure is completely secure. Accordingly, the Firm cannot guarantee absolute security.")
    ), { anchor: "security" }),

    section("7. Website Communications and Attorney-Client Relationship", blocks(
      p("Website inquiries, emails, telephone calls, and text messages may not be secure, may not be reviewed immediately, and may not reach the Firm."),
      p("**Submitting information does not create an attorney-client relationship.** Representation begins only after the Firm confirms representation in writing, such as through a signed engagement or retainer agreement. Until then, do not assume that the Firm represents you or that deadlines, claims, or legal rights are being protected.")
    ), { anchor: "attorney-client" }),

    section("8. Opting Out of SMS Communications", blocks(
      p("You may opt out at any time by replying **STOP** to any Firm text message. You may receive one confirmation message, after which no further messages will be sent unless you opt in again."),
      p("For assistance, reply **HELP** or contact the Firm using the information below. Carriers are not liable for delayed or undelivered messages.")
    ), { anchor: "opt-out" }),

    section("9. Data Retention", blocks(
      p("The Firm retains information for as long as reasonably necessary for the purposes described in this Policy, including legal, professional, administrative, security, and record-retention purposes.")
    ), { anchor: "retention" }),

    section("10. Children", blocks(
      p("The website and SMS program are not directed to children under 18. The Firm does not knowingly enroll anyone under 18 in its SMS program.")
    ), { anchor: "children" }),

    section("11. Third-Party Websites", blocks(
      p("The website may contain links to third-party websites. The Firm is not responsible for the content, security, or privacy practices of those websites.")
    ), { anchor: "third-party" }),

    section("12. Changes to This Policy", blocks(
      p("The Firm may update this Policy periodically. Updates will be posted on this page with a revised “Last Updated” date.")
    ), { anchor: "changes" }),

    section("13. Contact Information", blocks(
      p("If you have questions about this Privacy Policy or about how your information is handled, contact us:"),
      p("**The Turuchi Law Firm, LLC**"),
      p("3 Gateway Center, 12th Floor, Newark, NJ 07102"),
      p("732-210-6410 · Info@turuchilawfirm.com")
    ), { anchor: "contact" }),
  ],
  seo: {
    metaTitle: "Privacy Policy",
    metaDescription:
      "How The Turuchi Law Firm collects, uses, shares and protects personal information, including mobile phone numbers and SMS opt-in consent.",
  },
};

const terms = {
  _id: "legalPage-terms-and-conditions",
  _type: "legalPage",
  title: "Terms & Conditions",
  slug: { _type: "slug", current: "terms-and-conditions" },
  pageHeader: {
    eyebrow: "Legal",
    heading: "Terms &",
    headingHighlight: "Conditions",
    description:
      "The rules governing use of this website, and the terms of the firm's SMS text messaging program.",
  },
  effectiveDate: EFFECTIVE,
  lastUpdated: EFFECTIVE,
  showContactCard: true,
  contactCardHeading: "Questions about these terms?",
  intro: blocks(
    p("These Terms and Conditions (“Terms”) govern your use of the website operated by The Turuchi Law Firm (“Firm,” “we,” “us,” or “our”) and your participation in the Firm’s SMS text messaging program. Part I covers use of the website. Part II covers text messaging.")
  ),
  callout: blocks(
    p("**SMS disclosures at a glance:** if you consent to receive conversational, transactional, informational and promotional SMS messages from The Turuchi Law Firm, you agree to receive those messages from us. Reply **STOP** to opt out. Reply **HELP** for support. Message and data rates may apply. Message frequency varies. Carriers are not liable for delayed or undelivered messages. Consent is not a condition of purchasing services, retaining the Firm, or receiving legal services.")
  ),
  relatedLinks: [
    { _key: key(), label: "Privacy Policy", href: "/privacy-policy" },
    { _key: key(), label: "Legal Disclaimer", href: "/disclaimer" },
    { _key: key(), label: "Contact the firm", href: "/contact" },
  ],
  sections: [
    section("1. Acceptance of These Terms", blocks(
      p("By accessing or using this website, you agree to be bound by these Terms and by our Privacy Policy. If you do not agree, please do not use the website. Your continued use of the website after these Terms are revised constitutes acceptance of the revised Terms to the extent permitted by law.")
    ), { part: "Part I — Website Terms of Use", anchor: "acceptance" }),

    section("2. No Legal Advice", blocks(
      p("The content on this website is provided for general informational purposes only and is not legal advice. Legal outcomes depend on the specific facts of each matter and on law that changes over time. You should not act, or refrain from acting, on the basis of anything on this website without seeking advice from a licensed attorney regarding your particular situation."),
      p("Nothing on this website is a guarantee, warranty, or prediction regarding the outcome of any legal matter.")
    ), { anchor: "no-legal-advice" }),

    section("3. No Attorney-Client Relationship", blocks(
      p("Until representation is confirmed in writing, do not assume that the Firm represents you or that any deadline, claim, or legal right of yours is being protected. Communications sent before an attorney-client relationship exists may not be treated as privileged or confidential, and may not be reviewed immediately. Please do not send confidential or time-sensitive information through this website."),
      p("If your matter is urgent or a filing deadline may be approaching, call the Firm directly at 732-210-6410.")
    ), {
      anchor: "no-attorney-client",
      callout: blocks(
        p("**Submitting a form, sending a text message, sending an email, or otherwise contacting the Firm through this website does not create an attorney-client relationship.** An attorney-client relationship with the Firm is formed only when the Firm confirms representation in writing, such as through a signed engagement or retainer agreement.")
      ),
    }),

    section("4. Permitted Use of the Website", blocks(
      p("You agree that you will not:"),
      li("Use the website for any unlawful, fraudulent, deceptive, or abusive purpose;"),
      li("Submit false, misleading, or impersonated information, including a telephone number you are not authorized to provide;"),
      li("Attempt to gain unauthorized access to the website, its servers, or any connected system or network;"),
      li("Introduce malware, or interfere with or disrupt the integrity, security, or performance of the website;"),
      li("Use automated means to scrape, harvest, or collect information from the website without the Firm’s written permission; or"),
      li("Use the website in a manner that violates any applicable law or regulation."),
      p("The Firm may suspend or terminate access to the website, or to the SMS program, for conduct that violates these Terms.")
    ), { anchor: "permitted-use" }),

    section("5. Intellectual Property", blocks(
      p("The website and its contents — including text, graphics, logos, images, page layout, and the selection and arrangement of content — are owned by or licensed to the Firm and are protected by applicable intellectual property laws. You may view and print content for your own personal, non-commercial reference. Any other reproduction, distribution, modification, republication, or commercial use requires the Firm’s prior written permission.")
    ), { anchor: "intellectual-property" }),

    section("6. Third-Party Links and Content", blocks(
      p("The website may contain links to third-party websites and may incorporate third-party services. Those links and services are provided for convenience only. The Firm does not control and is not responsible for the content, security, availability, or privacy practices of any third party, and a link does not imply endorsement.")
    ), { anchor: "third-party-links" }),

    section("7. Attorney Advertising and Prior Results", blocks(
      p("This website may be considered attorney advertising in some jurisdictions. Prior results do not guarantee or predict a similar outcome in any future matter. Any testimonial, review, case description, or result described on this website reflects the specific facts of that matter and should not be understood as a representation about what the Firm can achieve in your matter. Testimonials are not a guarantee, warranty, or prediction regarding the outcome of your legal matter.")
    ), { anchor: "attorney-advertising" }),

    section("8. Disclaimers", blocks(
      p("The website and all content on it are provided “as is” and “as available,” without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, accuracy, non-infringement, and uninterrupted or error-free operation, to the fullest extent permitted by applicable law."),
      p("The Firm does not warrant that the website will be available at all times, that defects will be corrected, or that the website or the servers that make it available are free of harmful components.")
    ), { anchor: "disclaimers" }),

    section("9. Limitation of Liability", blocks(
      p("To the fullest extent permitted by applicable law, the Firm and its attorneys, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data, profits, or goodwill, arising out of or relating to your access to or use of, or inability to use, this website, the SMS program, or any content on the website — whether based in contract, tort, statute, or any other legal theory, and whether or not the Firm was advised of the possibility of such damages."),
      p("Nothing in these Terms limits any liability that cannot lawfully be limited, and nothing in these Terms is intended to limit any obligation the Firm owes to a client under the New Jersey Rules of Professional Conduct.")
    ), { anchor: "limitation-of-liability" }),

    section("10. Governing Law", blocks(
      p("These Terms are governed by the laws of the State of New Jersey, without regard to its conflict-of-laws principles. Any dispute arising out of or relating to these Terms or the website shall be brought exclusively in the state or federal courts located in New Jersey, and you consent to the jurisdiction of those courts."),
      p("If any provision of these Terms is held unenforceable, that provision will be limited or severed to the minimum extent necessary, and the remaining provisions will remain in full force and effect.")
    ), { anchor: "governing-law" }),

    section("11. Program Description", blocks(
      p("By voluntarily opting in to receive SMS messages from The Turuchi Law Firm, you agree to receive conversational, transactional, informational and, where applicable, promotional messages from the Firm. Messages may include appointment reminders, requested information, responses to inquiries, case-related communications, Firm announcements, and information about Firm services."),
      p("Opt-in is collected through the contact and text-message forms on this website, where the SMS consent checkbox is optional and is not pre-selected, and through other channels where you expressly agree to receive messages.")
    ), { part: "Part II — SMS Terms of Service", anchor: "sms-program" }),

    section("12. Required Disclosures", blocks(
      li("**Message and data rates may apply.**"),
      li("**Message frequency varies.**"),
      li("Reply **STOP** to opt out."),
      li("Reply **HELP** for support."),
      li("Consent is not a condition of purchasing services, retaining the Firm, or receiving legal services."),
      li("Carriers are not liable for delayed or undelivered messages."),
      p("For additional information, review the Firm’s Privacy Policy and these Terms and Conditions.")
    ), { anchor: "sms-disclosures" }),

    section("13. Consent", blocks(
      p("The Firm will maintain records of SMS consent and opt-out requests as reasonably necessary for compliance and business purposes. No mobile opt-in or text message consent will be shared with third parties or affiliates for their own marketing or promotional purposes.")
    ), {
      anchor: "sms-consent",
      callout: blocks(
        p("I consent to receive conversational, transactional, informational and, where applicable, promotional SMS messages from The Turuchi Law Firm. Message and data rates may apply. Messaging frequency may vary. Reply STOP to opt out and HELP for support. Consent is not a condition of purchasing services, retaining the Firm, or receiving legal services.")
      ),
    }),

    section("14. Opt-Out and Support", blocks(
      p("Reply **STOP** to cancel SMS messages. Reply **HELP** for assistance. After opting out, you may receive one confirmation message, and no further messages will be sent unless you opt in again."),
      p("You may also opt out or request assistance by calling 732-210-6410 or emailing Info@turuchilawfirm.com.")
    ), { anchor: "sms-opt-out" }),

    section("15. Prohibited Uses and Content", blocks(
      p("The Firm will use its SMS/MMS program only for lawful communications consistent with the consent provided. The Firm will not use the program to send content prohibited by applicable law, telecommunications carriers, RingCentral, or applicable messaging-industry registration requirements. The Firm may refuse, suspend, or terminate messaging enrollment if content, traffic, consent practices, or use of the program violates applicable requirements. Users may not use the program to transmit unlawful, fraudulent, abusive, deceptive, threatening, harassing, discriminatory, or otherwise prohibited content.")
    ), { anchor: "prohibited-uses" }),

    section("16. Carrier Disclaimer", blocks(
      p("**Carriers are not liable for delayed or undelivered messages.** Message delivery may depend on the carrier, RingCentral, the recipient’s device, network availability, and other factors outside the Firm’s control.")
    ), { anchor: "carrier-disclaimer" }),

    section("17. Age Requirement", blocks(
      p("You must be at least 18 years old to participate in the Firm’s SMS program. The website and the SMS program are not directed to children under 18, and the Firm does not knowingly enroll anyone under 18.")
    ), { anchor: "age-requirement" }),

    section("18. Privacy Policy", blocks(
      p("Information collected through this website and through the SMS program is handled as described in our Privacy Policy, which is incorporated into these Terms by reference.")
    ), { anchor: "privacy" }),

    section("19. Changes to These Terms", blocks(
      p("The Firm may revise these Terms by posting an updated version on the website with a revised “Last Updated” date. Continued use of the website, or continued participation in the SMS program, after the revised Terms are posted constitutes acceptance to the extent permitted by law.")
    ), { anchor: "changes" }),

    section("20. Contact Information", blocks(
      p("Questions about these Terms, the website, or the SMS program may be directed to:"),
      p("**The Turuchi Law Firm, LLC**"),
      p("3 Gateway Center, 12th Floor, Newark, NJ 07102"),
      p("732-210-6410 · Info@turuchilawfirm.com")
    ), { anchor: "contact" }),
  ],
  seo: {
    metaTitle: "Terms & Conditions",
    metaDescription:
      "Terms governing use of The Turuchi Law Firm website and the firm's SMS text messaging program, including opt-in, STOP/HELP, message frequency and carrier disclosures.",
  },
};

const disclaimer = {
  _id: "legalPage-disclaimer",
  _type: "legalPage",
  title: "Legal Disclaimer",
  slug: { _type: "slug", current: "disclaimer" },
  pageHeader: {
    eyebrow: "Legal",
    heading: "Legal",
    headingHighlight: "Disclaimer",
    description: "Important notices about this website, legal advice, and prior case results.",
  },
  lastUpdated: EFFECTIVE,
  showContactCard: true,
  contactCardHeading: "Need to speak to someone?",
  relatedLinks: [
    { _key: key(), label: "Privacy Policy", href: "/privacy-policy" },
    { _key: key(), label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  sections: [
    section("Attorney Advertising", blocks(
      p("This website may be considered attorney advertising in some jurisdictions. It is intended to provide general information about The Turuchi Law Firm and the areas in which the Firm practices.")
    ), { anchor: "attorney-advertising" }),
    section("No Legal Advice", blocks(
      p("Nothing on this website is legal advice, and no page, article, or blog post here is a substitute for advice from a licensed attorney about your specific situation. Law changes, and outcomes turn on facts that a website cannot know. Do not act, or delay acting, based on anything you read here.")
    ), { anchor: "no-legal-advice" }),
    section("No Attorney-Client Relationship", blocks(
      p("Contacting the Firm through this website — by form, email, or text message — does not create an attorney-client relationship, and information you send before an engagement is confirmed in writing may not be treated as confidential or privileged. The Firm represents you only after it confirms representation in writing, such as through a signed engagement or retainer agreement.")
    ), { anchor: "no-relationship" }),
    section("Prior Results and Testimonials", blocks(
      p("Prior results do not guarantee or predict a similar outcome in any future matter. Case descriptions, results, and client testimonials reflect the particular facts of those matters. They are not a guarantee, warranty, or prediction about your matter.")
    ), { anchor: "prior-results" }),
    section("Jurisdiction", blocks(
      p("The Firm is licensed to practice in the State of New Jersey. Nothing on this website is an offer to represent you in a jurisdiction where the Firm is not licensed to practice.")
    ), { anchor: "jurisdiction" }),
  ],
  seo: {
    metaTitle: "Legal Disclaimer",
    metaDescription:
      "Attorney advertising notice, no-legal-advice disclaimer, and information about prior results and attorney-client relationships at The Turuchi Law Firm.",
  },
};

/* ========================================================================== */
/*  LANDING PAGES                                                             */
/* ========================================================================== */

const sec = (type, data) => ({ _type: type, _key: key(), ...data });
const item = (data) => ({ _key: key(), ...data });

const carAccident = {
  _id: "landingPage-nj-car-accident-lawyer",
  _type: "landingPage",
  title: "Google Ads — NJ Car Accident",
  slug: { _type: "slug", current: "nj-car-accident-lawyer" },
  published: true,
  noIndex: true,
  sections: [
    sec("lpHero", {
      eyebrow: "New Jersey car accident lawyer",
      heading: "Hit by a car in New Jersey? Don't talk to their insurer alone.",
      subheading:
        "The other driver's insurance company will call you within days, sound friendly, and offer you a number. That number is almost never what your claim is worth. We handle the call, the paperwork and the negotiation — and you pay nothing unless we recover for you.",
      bullets: [
        "Free case review, no obligation",
        "No fee unless we win your case",
        "We deal with the insurance company, not you",
        "Straight answers about what your claim is worth",
      ],
      ctaText: "Get My Free Case Review",
      ctaLink: "#lead-form",
      showForm: true,
      formHeading: "Free case review",
      formSubheading: "Tell us what happened. We usually reply the same business day.",
    }),

    sec("lpTrustBar", {
      items: [
        item({ value: "500+", label: "Cases handled" }),
        item({ value: "8", label: "Years of experience" }),
        item({ value: "$0", label: "Upfront cost to you" }),
        item({ value: "24hr", label: "Typical response" }),
      ],
    }),

    sec("lpProofPoints", {
      eyebrow: "Why this matters",
      heading: "The insurance company has done this thousands of times. You haven't.",
      description:
        "Adjusters are trained, measured and paid on how little they settle claims for. Having a lawyer changes the file they are working on — and the number they are authorised to offer.",
      items: [
        item({
          icon: "FaUserTie",
          title: "We know how they value your claim",
          description:
            "Attorney Turuchi Iheanachor previously worked on the insurance defense side. That means we know how carriers assess injuries, what they discount, and where their real settlement authority sits.",
        }),
        item({
          icon: "FaBalanceScale",
          title: "Your medical bills, handled",
          description:
            "We collect your records, bills and liens, and negotiate them down at the end so more of the settlement stays with you instead of going to providers.",
        }),
        item({
          icon: "FaComments",
          title: "You stop taking their calls",
          description:
            "Once we're on the file, the adjuster deals with us. No recorded statements, no pressure to accept a quick check while you're still being treated.",
        }),
        item({
          icon: "FaMapMarkerAlt",
          title: "New Jersey rules, applied properly",
          description:
            "No-fault PIP, the verbal threshold, step-down clauses and the two-year deadline all decide what you can recover. Getting these wrong early can end a claim before it starts.",
        }),
        item({
          icon: "FaHandshake",
          title: "One attorney, start to finish",
          description:
            "You are not passed to a case manager you never chose. The attorney who reviews your case is the attorney who handles it.",
        }),
        item({
          icon: "FaCheckCircle",
          title: "Nothing upfront, ever",
          description:
            "We work on contingency. There is no hourly bill, no retainer, and no fee at all unless we recover money for you.",
        }),
      ],
    }),

    sec("lpVideo", {
      eyebrow: "Meet your attorney",
      heading: "The person who will actually handle your case",
      description:
        "Not a call center and not a case manager you never chose. Turuchi Iheanachor reviews your case, and Turuchi Iheanachor handles it — with the advantage of having worked in insurance defense, seeing exactly how these claims get valued and defended.",
      bullets: [
        "One attorney from first call to settlement",
        "Former insurance defense — we know their playbook",
        "Straight answers, not sales talk",
      ],
      orientation: "portrait",
      autoplay: false,
      showBio: true,
      bioParagraphs: ATTORNEY_BIO,
      ctaText: "Get My Free Case Review",
      ctaLink: "#lead-form",
    }),

    sec("lpSteps", {
      eyebrow: "What happens next",
      heading: "Three steps, starting today",
      steps: [
        item({
          title: "Tell us what happened",
          description:
            "Fill in the form or call. It takes a few minutes and costs nothing. We'll tell you honestly whether you have a claim worth pursuing.",
        }),
        item({
          title: "We take over the insurance side",
          description:
            "We notify the carriers, open the claim, gather the police report and your medical records, and make sure your treatment is documented properly.",
        }),
        item({
          title: "We push for the full value",
          description:
            "We present the claim, negotiate hard, and advise you plainly on whether an offer is worth taking. Nothing is settled without your say-so.",
        }),
      ],
    }),

    sec("lpFaq", {
      heading: "Questions people ask us first",
      items: [
        item({
          question: "How much does it cost to hire you?",
          answer:
            "Nothing upfront. We work on a contingency fee, which means our fee comes out of the recovery at the end. If there is no recovery, you owe us no attorney's fee.",
        }),
        item({
          question: "How long do I have to bring a claim in New Jersey?",
          answer:
            "In most New Jersey personal injury cases the deadline is two years from the date of the accident, and there are shorter notice deadlines when a public entity is involved. Waiting also makes evidence harder to obtain, so it is worth speaking to someone early even if you are unsure.",
        }),
        item({
          question: "The insurance company already offered me money. Should I take it?",
          answer:
            "Speak to a lawyer before you accept anything. Early offers usually arrive before the full extent of your injuries and treatment is known, and accepting one normally closes the claim for good.",
        }),
        item({
          question: "What if the accident was partly my fault?",
          answer:
            "New Jersey uses comparative negligence, so you can still recover as long as you were not more than 50% at fault — your recovery is reduced by your share. Do not assume you have no claim because you think you contributed.",
        }),
        item({
          question: "Do I have to go to court?",
          answer:
            "Most cases settle without a trial. We prepare every case as though it may be tried, because that is what gives a settlement negotiation weight, but the large majority resolve by agreement.",
        }),
        item({
          question: "What if I don't have health insurance?",
          answer:
            "In New Jersey your own auto policy's PIP coverage generally pays for accident-related medical treatment first, regardless of who caused the crash. We will help you work out what coverage applies.",
        }),
      ],
    }),

    // The Newark office. A landing page has no nav and no footer address, so
    // this is the only thing on the page that shows the firm is a real place
    // with a real door.
    sec("lpOffice", {
      heading: "A real office, in downtown Newark",
      description:
        "The firm is on the 12th floor of 3 Gateway Center, a few minutes from Newark Penn Station. You are welcome to come in — though most of our clients never need to, because we come to them.",
    }),

    sec("lpCta", {
      heading: "Find out what your claim is actually worth",
      description:
        "A free review costs you nothing and commits you to nothing. You will leave the call knowing where you stand.",
      ctaText: "Start My Free Case Review",
      ctaLink: "#lead-form",
      showPhone: true,
    }),
  ],
  seo: {
    metaTitle: "NJ Car Accident Lawyer | Free Case Review",
    metaDescription:
      "Injured in a New Jersey car accident? Free case review, no fee unless we recover. We handle the insurance company so you can focus on getting better.",
  },
};

const workInjury = {
  _id: "landingPage-injured-at-work-nj",
  _type: "landingPage",
  title: "Google Ads — Injured At Work",
  slug: { _type: "slug", current: "injured-at-work-nj" },
  published: true,
  noIndex: true,
  sections: [
    sec("lpHero", {
      eyebrow: "New Jersey workers' compensation attorney",
      heading: "Hurt at work in New Jersey? You have rights your employer may not explain.",
      subheading:
        "Workers' compensation should cover your medical treatment and part of your lost wages, whoever was at fault. But claims get delayed, treatment gets denied, and people get pushed back to work before they're ready. We make the system work the way it is supposed to.",
      bullets: [
        "Free consultation, no obligation",
        "No fee unless you receive benefits",
        "You cannot be legally fired for filing a claim",
        "We handle denials, delays and cut-off treatment",
      ],
      ctaText: "Get My Free Consultation",
      ctaLink: "#lead-form",
      showForm: true,
      formHeading: "Free consultation",
      formSubheading: "Tell us what happened at work. We usually reply the same business day.",
    }),

    sec("lpTrustBar", {
      items: [
        item({ value: "500+", label: "Cases handled" }),
        item({ value: "8", label: "Years of experience" }),
        item({ value: "$0", label: "Upfront cost to you" }),
        item({ value: "24hr", label: "Typical response" }),
      ],
    }),

    sec("lpProofPoints", {
      eyebrow: "Where claims go wrong",
      heading: "Most workers' comp problems are avoidable — if you act early",
      description:
        "The insurance carrier chooses your doctor, decides what treatment is authorised, and decides when you are fit to return. Those decisions are challengeable, and they are far easier to challenge before they harden.",
      items: [
        item({
          icon: "FaCheckCircle",
          title: "Treatment denied or cut off",
          description:
            "If the carrier stops authorising the treatment your doctor recommends, that decision can be taken to a judge of compensation. You do not have to simply accept it.",
        }),
        item({
          icon: "FaBalanceScale",
          title: "Permanent disability, undervalued",
          description:
            "Many injured workers settle without ever being assessed for permanent partial disability. That assessment is often the largest part of the claim.",
        }),
        item({
          icon: "FaComments",
          title: "Told you don't have a claim",
          description:
            "Pre-existing conditions, repetitive strain injuries and injuries that developed over time are all potentially compensable in New Jersey. Being told otherwise is not the end of it.",
        }),
        item({
          icon: "FaHandshake",
          title: "A third party may also be liable",
          description:
            "If a contractor, equipment manufacturer or driver caused your workplace injury, you may have a claim beyond workers' comp — one that can include pain and suffering.",
        }),
        item({
          icon: "FaUserTie",
          title: "Pushed back too early",
          description:
            "Returning to full duty before you are ready risks re-injury and weakens your claim. We push back on premature return-to-work determinations.",
        }),
        item({
          icon: "FaMapMarkerAlt",
          title: "Deadlines you may not know about",
          description:
            "New Jersey requires notice to your employer promptly and a formal claim petition within two years. Missing these can end an otherwise good claim.",
        }),
      ],
    }),

    sec("lpVideo", {
      eyebrow: "Meet your attorney",
      heading: "Someone who will push back on the carrier for you",
      description:
        "Workers' compensation runs on decisions made by an insurance carrier — what treatment is authorised, when you are fit to return, what your injury is worth. Turuchi Iheanachor challenges those decisions, with the perspective of an attorney who used to make them from the other side.",
      bullets: [
        "One attorney from first call to award",
        "Former insurance defense — we know their playbook",
        "We take denials to a judge when we need to",
      ],
      orientation: "portrait",
      autoplay: false,
      showBio: true,
      bioParagraphs: ATTORNEY_BIO,
      ctaText: "Get My Free Consultation",
      ctaLink: "#lead-form",
    }),

    sec("lpSteps", {
      eyebrow: "What happens next",
      heading: "How we get your claim moving",
      steps: [
        item({
          title: "Free review of where you stand",
          description:
            "Tell us what happened, what has been authorised, and what has been refused. We will tell you plainly whether the carrier is treating you properly.",
        }),
        item({
          title: "We file and fight the denials",
          description:
            "We file the claim petition, push for the treatment your doctor recommends, and take disputes to the Division of Workers' Compensation where necessary.",
        }),
        item({
          title: "We pursue the full award",
          description:
            "That means authorised treatment, temporary disability benefits while you cannot work, and a permanent disability award reflecting what the injury actually cost you.",
        }),
      ],
    }),

    sec("lpFaq", {
      heading: "Questions people ask us first",
      items: [
        item({
          question: "Can I be fired for filing a workers' comp claim?",
          answer:
            "New Jersey law prohibits retaliating against an employee for filing a workers' compensation claim. If it happens, that is a separate claim in itself. Fear of retaliation is one of the most common reasons people do not claim what they are owed.",
        }),
        item({
          question: "What if my employer says the injury wasn't their fault?",
          answer:
            "Workers' compensation is a no-fault system. You generally do not need to prove your employer did anything wrong — only that the injury arose out of and in the course of your employment.",
        }),
        item({
          question: "Can I use my own doctor?",
          answer:
            "In New Jersey the employer or its insurance carrier generally has the right to direct authorised treatment. That does not mean their decisions are final — a judge can order treatment the carrier has refused.",
        }),
        item({
          question: "What if the injury built up over time?",
          answer:
            "Repetitive stress and occupational exposure injuries can be compensable in New Jersey. There does not have to be a single accident on a single day.",
        }),
        item({
          question: "How much does a workers' comp attorney cost?",
          answer:
            "Attorney fees in New Jersey workers' compensation cases are set and approved by the judge of compensation, and come out of the award. There is nothing to pay upfront.",
        }),
        item({
          question: "Can I claim workers' comp and sue someone as well?",
          answer:
            "Sometimes. You generally cannot sue your employer, but if a third party — a contractor, a driver, an equipment manufacturer — contributed to your injury, you may have a separate claim against them.",
        }),
      ],
    }),

    // The Newark office. A landing page has no nav and no footer address, so
    // this is the only thing on the page that shows the firm is a real place
    // with a real door.
    sec("lpOffice", {
      heading: "A real office, in downtown Newark",
      description:
        "The firm is on the 12th floor of 3 Gateway Center, a few minutes from Newark Penn Station. You are welcome to come in — though most of our clients never need to, because we come to them.",
    }),

    sec("lpCta", {
      heading: "Find out what you're actually entitled to",
      description:
        "A free consultation costs nothing and commits you to nothing. Most people leave it knowing something about their claim they did not know before.",
      ctaText: "Start My Free Consultation",
      ctaLink: "#lead-form",
      showPhone: true,
    }),
  ],
  seo: {
    metaTitle: "Injured At Work in NJ? | Free Workers' Comp Consultation",
    metaDescription:
      "New Jersey workers' compensation attorney. Denied treatment, delayed benefits or pushed back to work too early? Free consultation, no fee unless you receive benefits.",
  },
};

/* ------------------------------------------------------------------- output */

const write = (name, docs) => {
  const path = resolve(outDir, name);
  writeFileSync(path, docs.map((d) => JSON.stringify(d)).join("\n") + "\n", "utf8");
  console.log(`wrote ${path}  (${docs.length} document${docs.length === 1 ? "" : "s"})`);
};

mkdirSync(outDir, { recursive: true });
write("legal-pages.ndjson", [privacyPolicy, terms, disclaimer]);
write("landing-pages.ndjson", [carAccident, workInjury]);

console.log(`
Next steps:
  cd sanity
  npx sanity dataset import ../seed/legal-pages.ndjson production --replace
  npx sanity dataset import ../seed/landing-pages.ndjson production --replace

Landing pages will then be live at:
  /lp/nj-car-accident-lawyer
  /lp/injured-at-work-nj
`);
