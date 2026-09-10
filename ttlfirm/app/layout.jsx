import "@styles/global.css";
import SiteChrome from "@components/layout/siteChrome";
import Tracking from "@components/common/tracking";
import { FilmProvider } from "@components/common/filmPlayer";
import MotionRoot from "@components/common/motion";
import { client } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import { SiteSettingsProvider } from "@/lib/siteSettingsContext";

// Fonts are pulled in by an @import at the top of styles/global.css rather
// than next/font, so the production build never depends on being able to
// reach Google Fonts at build time (some CI networks block it, and next/font
// turns that into a hard build failure). Note: do NOT add a raw <head>
// element to this layout — it suppresses Next's own metadata and viewport
// injection, which silently breaks mobile rendering.

// Site settings (phone, email, address, social links, stats) are shared by
// the Nav, StickyNav, and Footer on every page — fetch once here and hand
// it down via context instead of every page re-fetching it. `revalidate`
// here also acts as a floor for every route in the app.
export const revalidate = 60;

const SITE_DESCRIPTION =
  "New Jersey personal injury and workers' compensation attorney. We represent injured people against insurance companies across New Jersey. Free consultation, no fee unless we recover.";

export const metadata = {
  metadataBase: new URL("https://turuchilawfirm.com"),
  title: {
    default: "New Jersey Personal Injury & Workers' Compensation Lawyer | The Turuchi Law Firm",
    template: "%s | Turuchi Law Firm",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "New Jersey personal injury lawyer",
    "NJ workers compensation attorney",
    "car accident lawyer New Jersey",
    "slip and fall attorney NJ",
    "work injury lawyer New Jersey",
    "Jersey City personal injury attorney",
  ],
  authors: [{ name: "Turuchi Law Firm" }],
  creator: "Turuchi Law Firm",
  publisher: "Turuchi Law Firm",
  formatDetection: { email: false, address: false, telephone: false },
  verification: {
    google: "your-google-verification-code",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://turuchilawfirm.com",
    siteName: "Turuchi Law Firm",
    title: "New Jersey Personal Injury & Workers' Compensation Lawyer | The Turuchi Law Firm",
    description: SITE_DESCRIPTION,
    images: [
      { url: "/assets/images/logo.png", width: 1200, height: 630, alt: "Turuchi Law Firm" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Turuchi Law Firm",
    description: SITE_DESCRIPTION,
    creator: "@turuchilawfirm",
    images: ["/assets/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2340",
};

const Rootlayout = async ({ children }) => {
  let siteSettings = {};
  try {
    siteSettings = (await client.fetch(siteSettingsQuery)) || {};
  } catch (error) {
    console.error("Error fetching site settings:", error);
  }

  return (
    // suppressHydrationWarning is for THIS element only, and it is here because
    // the inline script below adds `js-motion` to <html> before React hydrates.
    // The server never renders that class — deliberately, so a page without
    // JavaScript is never left with hidden sections — which React otherwise
    // reports as an attribute mismatch. It does not suppress anything inside
    // the tree.
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white">
        {/* Runs before any of the markup below is parsed, so the scroll-reveal
            styles only ever apply on a page where JavaScript is actually
            running. Without this gate a blocked or failed bundle would leave
            every animated section permanently invisible; with it, the worst
            case is a page that simply does not animate. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-motion')",
          }}
        />
        <MotionRoot />

        <SiteSettingsProvider value={siteSettings}>
          {/* Keyboard and screen-reader users land here first. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to main content
          </a>

          <Tracking />

          <FilmProvider>
            <main id="main-content" className="main font-sans">
              {children}
              <SiteChrome />
            </main>
          </FilmProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
};

export default Rootlayout;
