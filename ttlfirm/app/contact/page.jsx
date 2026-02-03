import Section2 from "@components/common/section2";
import ContactUs from "@components/pages/home/contactUs";
import PageHeader from "@components/pages/header";
import Script from "next/script";

export const metadata = {
  title: "Contact Us | Free Consultation | Turuchi Law Firm NJ",
  description: "Get a free legal consultation. Call 732-210-6410 or visit us at 111 Town Square Pl, Jersey City, NJ. Available for Personal Injury, Immigration & Workers' Comp cases.",
  keywords: [
    "contact Turuchi Law Firm",
    "free legal consultation NJ",
    "Jersey City lawyer",
    "law firm contact",
    "schedule consultation"
  ],
  openGraph: {
    title: "Contact Turuchi Law Firm | Free Consultation",
    description: "Call 732-210-6410 for a free case evaluation. Located in Jersey City, serving all of New Jersey.",
    url: "https://turuchilawfirm.com/contact",
    images: [{ url: "/assets/images/logo.png", width: 1200, height: 630 }]
  },
  alternates: {
    canonical: "https://turuchilawfirm.com/contact"
  }
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Turuchi Law Firm",
  "url": "https://turuchilawfirm.com/contact",
  "mainEntity": {
    "@type": "LegalService",
    "name": "Turuchi Law Firm, LLC",
    "telephone": "+17322106410",
    "email": "info@turuchilawfirm.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "111 Town Square Pl",
      "addressLocality": "Jersey City",
      "addressRegion": "NJ",
      "postalCode": "07310",
      "addressCountry": "US"
    }
  }
};

const Contact = () => {
  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div className="relative">
        <PageHeader text={"Contact"} text2={"Us"}/>
        <Section2>
          <ContactUs/>
        </Section2>
      </div>
    </>
  );
};

export default Contact;
