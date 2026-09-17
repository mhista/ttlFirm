import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { FaPhone } from "react-icons/fa6";

import { client } from "@/lib/sanity.client";
import {
  landingPageBySlugQuery,
  landingPageSlugsQuery,
  siteSettingsQuery,
} from "@/lib/sanity.queries";
import { FIRM, telHref, LEGAL_LINKS } from "@/lib/siteNav";
import LandingRenderer from "@components/pages/landing/landingRenderer";
import Tracking from "@components/common/tracking";

export const revalidate = 60;

async function getPage(slug) {
  try {
    return await client.fetch(landingPageBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching landing page:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = (await client.fetch(landingPageSlugsQuery)) || [];
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Not found" };

  const seo = page.seo || {};
  return {
    title: seo.metaTitle || page.title,
    description: seo.metaDescription,
    // Ad landing pages normally stay out of the index so they don't compete
    // with the main site for the same terms.
    robots: page.noIndex === false ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: seo.metaTitle || page.title,
      description: seo.metaDescription,
      images: seo.ogImage?.asset?.url ? [{ url: seo.ogImage.asset.url }] : undefined,
    },
    alternates: { canonical: `https://turuchilawfirm.com/lp/${slug}` },
  };
}

const LandingPage = async ({ params }) => {
  const { slug } = await params;
  const [page, siteSettings] = await Promise.all([
    getPage(slug),
    client.fetch(siteSettingsQuery).catch(() => ({})),
  ]);

  if (!page) notFound();

  // A campaign-specific number can be set per page so calls are attributable.
  const phone = page.phoneOverride || siteSettings?.contact?.phone || FIRM.phoneDisplay;

  const faqSection = page.sections?.find((s) => s._type === "lpFaq");
  const faqSchema =
    faqSection?.items?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSection.items
            .filter((i) => i.question && i.answer)
            .map((i) => ({
              "@type": "Question",
              name: i.question,
              acceptedAnswer: { "@type": "Answer", text: i.answer },
            })),
        }
      : null;

  return (
    <>
      {/* A campaign can report into its own pixel; otherwise this re-uses the
          site pixel already mounted by the root layout, which Meta de-dupes. */}
      {page.metaPixelIdOverride && <Tracking pixelIdOverride={page.metaPixelIdOverride} />}

      {faqSchema && (
        <Script
          id="lp-faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Minimal header: logo and one phone number. No menu — nothing to
          click except the action this page exists for. */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950">
        <div className="container-x flex h-[80px] items-center justify-between gap-4 md:h-[92px]">
          <Link href="/" aria-label="Turuchi Law Firm">
            {/* Intrinsic size matches the source (556x448) so Next serves an
                asset for the right aspect; the height is set in CSS. */}
            <Image
              src="/assets/images/logo.png"
              width={556}
              height={448}
              alt="The Turuchi Law Firm"
              className="h-14 w-auto md:h-[68px]"
              priority
            />
          </Link>

          <a
            href={telHref(phone)}
            className="flex items-center gap-2.5 rounded-md bg-accent-500 px-4 py-2.5 font-sans text-sm font-bold text-navy-950 transition-colors hover:bg-accent-400"
          >
            <FaPhone className="text-xs" aria-hidden="true" />
            <span className="hidden sm:inline">{phone}</span>
            <span className="sm:hidden">Call now</span>
          </a>
        </div>
      </header>

      <main>
        <LandingRenderer
          sections={page.sections || []}
          phone={phone}
          contact={siteSettings?.contact}
        />
      </main>

      {/* Minimal footer: the compliance notices, and nothing else. */}
      <footer className="border-t border-white/10 bg-navy-950">
        <div className="container-x py-10">
          <p className="text-xs leading-relaxed text-navy-300/90">
            <strong className="font-semibold text-navy-100">Attorney advertising.</strong>{" "}
            {siteSettings?.legalNotices?.attorneyAdvertising ||
              "The information on this website is for general informational purposes only and is not legal advice. Viewing this site, submitting a form, or contacting the firm does not create an attorney-client relationship. Prior results do not guarantee a similar outcome."}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-navy-300/90">
            <strong className="font-semibold text-navy-100">SMS notice.</strong>{" "}
            {siteSettings?.legalNotices?.smsNotice ||
              "Consent to receive text messages from The Turuchi Law Firm is optional and is not a condition of purchasing services, retaining the firm, or receiving legal services. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help. No mobile opt-in or text message consent will be shared with third parties or affiliates for marketing or promotional purposes."}
          </p>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-navy-200 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} The Turuchi Law Firm. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {(siteSettings?.footer?.legalLinks?.length
                ? siteSettings.footer.legalLinks
                : LEGAL_LINKS
              ).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-accent-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
