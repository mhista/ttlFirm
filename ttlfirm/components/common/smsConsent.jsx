"use client";
import Link from "next/link";
import { useSiteSettings } from "@/lib/siteSettingsContext";

/**
 * SMS opt-in checkbox.
 *
 * Required by the RingCentral / TCR A2P 10DLC registration:
 *  - sits next to the phone number field
 *  - is OPTIONAL and UNCHECKED by default
 *  - carries the standard disclosures and a link to the Privacy Policy
 *
 * The wording is editable in Sanity (Site Settings → SMS & Widget) so the
 * firm's counsel can revise it without a deploy. The defaults below are the
 * approved language and are what renders if the field is left empty.
 *
 * Do not make this field required, and do not default `checked` to true —
 * either change will fail the carrier review.
 */
const DEFAULT_CONSENT =
  "I consent to receive conversational, transactional, informational and promotional SMS messages from The Turuchi Law Firm at the number provided. Consent is not a condition of purchasing services, retaining the firm, or receiving legal services. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help.";

const DEFAULT_HELPER =
  "Optional. Leave unchecked and we will only contact you by phone or email. No mobile opt-in or text message consent will be shared with third parties or affiliates for marketing purposes.";

/**
 * Renders the consent copy with STOP / HELP emboldened wherever they appear,
 * so the emphasis survives the text being edited in the Studio.
 */
const withEmphasis = (text, isDark) =>
  String(text)
    .split(/(\bSTOP\b|\bHELP\b)/g)
    .map((chunk, i) =>
      chunk === "STOP" || chunk === "HELP" ? (
        <strong key={i} className={isDark ? "text-white" : "text-navy-900"}>
          {chunk}
        </strong>
      ) : (
        chunk
      )
    );

const SmsConsent = ({ checked, onChange, id = "smsConsent", tone = "light" }) => {
  const siteSettings = useSiteSettings();
  const copy = siteSettings?.smsConsent || {};

  const consentText = copy.consentText || DEFAULT_CONSENT;
  const helperText = copy.helperText || DEFAULT_HELPER;
  const isDark = tone === "dark";

  return (
    <div
      className={[
        "rounded-lg border p-4",
        isDark ? "border-white/15 bg-white/5" : "border-surface-line bg-surface-alt",
      ].join(" ")}
    >
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-ink-soft/50 accent-[#D98324]"
        />
        <span
          className={[
            "text-[12.5px] leading-relaxed",
            isDark ? "text-navy-100" : "text-ink-muted",
          ].join(" ")}
        >
          {withEmphasis(consentText, isDark)}{" "}
          <span className="whitespace-nowrap">
            See our{" "}
            <Link
              href="/privacy-policy"
              className={
                isDark
                  ? "text-accent-400 underline underline-offset-2"
                  : "link-accent underline"
              }
            >
              Privacy Policy
            </Link>
          </span>{" "}
          and{" "}
          <Link
            href="/terms-and-conditions"
            className={
              isDark ? "text-accent-400 underline underline-offset-2" : "link-accent underline"
            }
          >
            Terms &amp; Conditions
          </Link>
          .
        </span>
      </label>

      <p
        className={[
          "mt-2.5 pl-[30px] text-[11px] leading-relaxed",
          isDark ? "text-navy-200" : "text-ink-soft",
        ].join(" ")}
      >
        {helperText}
      </p>
    </div>
  );
};

export default SmsConsent;
