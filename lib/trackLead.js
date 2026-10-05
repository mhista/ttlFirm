/**
 * Fires the conversion event every ad platform needs when someone submits a
 * case-review form.
 *
 * Meta's `Lead` is the standard event its optimisation is built around — an ad
 * set told to optimise for leads is worthless without it, because the platform
 * has no signal to learn from. Google gets the equivalent conversion.
 *
 * Everything here is defensive: if a pixel was never configured, `fbq` simply
 * doesn't exist and this is a no-op. A tracking failure must never stop a form
 * from submitting, so every call is wrapped.
 */
export function trackLead({ source = "Website form", value = 0, currency = "USD", google } = {}) {
  if (typeof window === "undefined") return;

  // ---- Meta
  try {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {
        content_name: source,
        content_category: "Legal case review",
        value,
        currency,
      });
    }
  } catch {
    /* never block the submission */
  }

  // ---- Google Ads conversion + GA4 event
  try {
    if (typeof window.gtag === "function") {
      if (google?.adsId && google?.label) {
        window.gtag("event", "conversion", {
          send_to: `${google.adsId}/${google.label}`,
          value,
          currency,
        });
      }
      window.gtag("event", "generate_lead", {
        event_category: "form",
        event_label: source,
        value,
        currency,
      });
    }
  } catch {
    /* never block the submission */
  }

  // ---- Google Tag Manager, if the firm ever adds it
  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: "lead_submitted", lead_source: source });
    }
  } catch {
    /* never block the submission */
  }
}

export default trackLead;
