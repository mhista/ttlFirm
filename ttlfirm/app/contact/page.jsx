import { client } from "@/lib/sanity.client";
import { contactPageQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import { getOffices } from "@/lib/siteNav";
import Section2 from "@components/common/section2";
import ContactUs from "@components/pages/home/contactUs";
import OfficeGallery from "@components/common/officeGallery";
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
    title: seo.metaTitle || "Contact Us | Free Consultation",
    description: seo.metaDescription || `Get a free legal consultation. Call ${contact.phone || '732-210-6410'} or visit us at ${contact.address?.street || '3 Gateway Center, 12th Floor'}, ${contact.address?.city || 'Newark'}, NJ. Available for personal injury and workers' compensation cases.`,
    keywords: seo.keywords || [
      "contact Turuchi Law Firm",
      "free legal consultation NJ",
      "Newark NJ lawyer",
      "law firm contact",
      "schedule consultation"
    ],
    openGraph: {
      title: seo.metaTitle || "Contact The Turuchi Law Firm, LLC | Free Consultation",
      description: seo.metaDescription || `Call ${contact.phone} for a free case evaluation. Located in Newark, serving all of New Jersey.`,
      url: "https://turuchilawfirm.com/contact"
    },
    alternates: {
      canonical: "https://turuchilawfirm.com/contact"
    }
  };
}

// Generate contact schema.
// `address` takes an array when a business has more than one location, and the
// first entry is the one Google treats as primary — which is why getOffices()
// keeps the main address at the front.
function generateContactSchema(siteSettings) {
  const contact = siteSettings?.contact || {};
  const offices = getOffices(contact);

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact The Turuchi Law Firm, LLC",
    "url": "https://turuchilawfirm.com/contact",
    "mainEntity": {
      "@type": "LegalService",
      "name": "The Turuchi Law Firm, LLC",
      "telephone": contact.phone || "+17322106410",
      "email": contact.email || "info@turuchilawfirm.com",
      "address": offices.length === 1 ? offices[0].postal : offices.map((o) => o.postal),
    },
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
          eyebrow="Free Case Review"
          text={pageHeader?.heading || "Contact"}
          text2={pageHeader?.headingHighlight || "Us"}
          description={
            pageHeader?.description ||
            "Tell us what happened and we'll explain where you stand — at no cost, and with no obligation to hire us."
          }
          image="/assets/images/bgg.jpg"
          breadcrumbs={[{ label: "Contact" }]}
        />
        
        <Section2>
          <ContactUs
            contact={siteSettings?.contact}
            content={contactPage?.mainContent}
          />
        </Section2>
        
        {/* Photographs of the building. Her note: "I want to add pictures of
            the exterior of my office to the website. Do not pin it to Google,
            I am just adding it as a photo." */}
        <OfficeGallery
          contact={siteSettings?.contact}
          heading={contactPage?.officeGallery?.heading}
          description={contactPage?.officeGallery?.description}
        />

        {/* Optional: Office Hours */}
        {contactPage?.officeHours?.enabled && (
          <Section2>
            <div className="w-full py-12 px-5 md:px-12">
              <h2 className="font-display text-3xl font-bold mb-6 text-center">
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