"use client";
import Script from "next/script";
import { useSiteSettings } from "@/lib/siteSettingsContext";

/**
 * Meta Pixel and Google tags.
 *
 * IDs come from Site Settings → Ad Tracking. If an ID is empty, nothing is
 * injected for that platform — no script, no cookie, no third-party request.
 * That matters on a law-firm site: pages should not be loading trackers the
 * firm isn't actually using.
 *
 * A landing page can override the pixel via `pixelIdOverride` when a campaign
 * reports into a different Meta account.
 */
const Tracking = ({ pixelIdOverride }) => {
  const siteSettings = useSiteSettings();
  const t = siteSettings?.tracking || {};

  const pixelId = pixelIdOverride || t.metaPixelId;
  const ga4Id = t.ga4Id;
  const adsId = t.googleAdsId;
  const gtagId = ga4Id || adsId;

  return (
    <>
      {pixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
              ${adsId ? `gtag('config', '${adsId}');` : ""}
            `}
          </Script>
        </>
      )}
    </>
  );
};

export default Tracking;
