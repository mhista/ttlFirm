import { client } from "@/lib/sanity.client";
import { contactPageQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import Section2 from "@components/common/section2";
import ContactUs from "@components/pages/home/contactUs";
import PageHeader from "@components/pages/header";
import Script from "next/script";

export const revalidate = 60;

// Fetch page data
async function getPageData() {
  try {
    const [contactPage, siteSettings] = await Promise.all([
      client.fetch(contactPageQuery),
      client.fetch(siteSettingsQuery)
    ]);
    
    return { 
      contactPage: contactPage || {},
      siteSettings: siteSettings || {}
    };
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return { 
      contactPage: {},
      siteSettings: {}
    };
  }
}

// Generate metadata from CMS
export async function generateMetadata() {
  const { contactPage, siteSettings } = await getPageData();
  const seo = contactPage?.seo || {};
  const contact = siteSettings?.contact || {};
  
  return {
    title: seo.metaTitle || "Contact Us | Free Consultation | Turuchi Law Firm NJ",
    description: seo.metaDescription || `Get a free legal consultation. Call ${contact.phone || '732-210-6410'} or visit us at ${contact.address?.street || '111 Town Square Pl'}, ${contact.address?.city || 'Jersey City'}, NJ. Available for Personal Injury, Immigration & Workers' Comp cases.`,
    keywords: seo.keywords || [
      "contact Turuchi Law Firm",
      "free legal consultation NJ",
      "Jersey City lawyer",
      "law firm contact",
      "schedule consultation"
    ],
    openGraph: {
      title: seo.metaTitle || "Contact Turuchi Law Firm | Free Consultation",
      description: seo.metaDescription || `Call ${contact.phone} for a free case evaluation. Located in Jersey City, serving all of New Jersey.`,
      url: "https://turuchilawfirm.com/contact"
    },
    alternates: {
      canonical: "https://turuchilawfirm.com/contact"
    }
  };
}

// Generate contact schema
function generateContactSchema(siteSettings) {
  const contact = siteSettings?.contact || {};
  const address = contact?.address || {};
  
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Turuchi Law Firm",
    "url": "https://turuchilawfirm.com/contact",
    "mainEntity": {
      "@type": "LegalService",
      "name": "Turuchi Law Firm, LLC",
      "telephone": contact.phone || "+17322106410",
      "email": contact.email || "info@turuchilawfirm.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address.street || "111 Town Square Pl",
        "addressLocality": address.city || "Jersey City",
        "addressRegion": address.state || "NJ",
        "postalCode": address.zipCode || "07310",
        "addressCountry": address.country || "US"
      }
    }
  };
}

const Contact = async () => {
  const { contactPage, siteSettings } = await getPageData();
  
  const pageHeader = contactPage?.pageHeader || {};
  const contactSchema = generateContactSchema(siteSettings);

  return (
    <>
      <Script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div className="relative">
        <PageHeader 
          text={pageHeader?.heading || "Contact"} 
          text2={pageHeader?.headingHighlight || "Us"}
        />
        
        <Section2>
          <ContactUs 
            contact={siteSettings?.contact} 
            social={siteSettings?.social}
            content={contactPage?.mainContent}
            formSettings={contactPage?.formSection}
          />
        </Section2>
        
        {/* Optional: Office Hours */}
        {contactPage?.officeHours?.enabled && (
          <Section2>
            <div className="w-full py-12 px-5 md:px-12">
              <h2 className="font-lora text-3xl font-bold mb-6 text-center">
                {contactPage.officeHours.heading}
              </h2>
              <div className="max-w-md mx-auto space-y-3">
                {contactPage.officeHours.hours?.map((item, index) => (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <span className="font-semibold">{item.days}</span>
                    <span className="text-gray-600">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section2>
        )}

        {/* Optional: Map Section */}
        {contactPage?.mapSection?.enabled && contactPage?.mapSection?.embedUrl && (
          <Section2>
            <div className="w-full h-[400px]">
              <iframe
                src={contactPage.mapSection.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Section2>
        )}
      </div>
    </>
  );
};

export default Contact;