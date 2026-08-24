
import "@styles/global.css";
import Footer from "@components/layout/footer";
import ScrollToTop from "@components/common/scrollToTop";
import { client } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import { SiteSettingsProvider } from "@/lib/siteSettingsContext";

// Site settings (phone, email, address, social links, stats) are shared by
// the Nav, StickyNav, and Footer on every page — fetch once here and hand
// it down via context instead of every page re-fetching it. `revalidate`
// here also acts as a floor for every route in the app: no page can be
// staler than this even if it doesn't set its own `revalidate`.
export const revalidate = 60;


export const metadata = {
  metadataBase: new URL('https://turuchilawfirm.com'), // Replace with your domain
  title: {
    default: "Reliable Law firm in New Jersey | The Turuchi Law Firm",
    template: "%s | Turuchi Law Firm"
  },
  description: "Experienced law firm in New Jersey offering immigration, personal injury, workers’ compensation, and municipal court representation. Get a free consultation.",
  keywords: [
    "New Jersey lawyer",
    "personal injury attorney",
    "immigration lawyer",
    "workers compensation",
    "municipal court defense"
  ],
  authors: [{ name: "Turuchi Law Firm" }],
  creator: "Turuchi Law Firm",
  publisher: "Turuchi Law Firm",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: 'your-google-verification-code', // Add after creating Google Search Console
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://turuchilawfirm.com',
    siteName: 'Turuchi Law Firm',
    title: 'Reliable Law firm in New Jersey | The Turuchi Law Firm',
    description: 'Experienced law firm in New Jersey offering immigration, personal injury, workers’ compensation, and municipal court representation. Get a free consultation.',
    images: [
      {
        url: '/assets/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Turuchi Law Firm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turuchi Law Firm',
    description: 'Experienced law firm in New Jersey offering immigration, personal injury, workers’ compensation, and municipal court representation. Get a free consultation.',
    creator: '@turuchilawfirm', // Add your Twitter handle
    images: ['/assets/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const Rootlayout = async ({ children }) => {
  let siteSettings = {};
  try {
    siteSettings = (await client.fetch(siteSettingsQuery)) || {};
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }

  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <body>
        <SiteSettingsProvider value={siteSettings}>
          <main className="main font-jost">

            {children}
            <Footer />
            <ScrollToTop/>
          </main>
        </SiteSettingsProvider>
      </body>
    </html>
  );
};

export default Rootlayout;
