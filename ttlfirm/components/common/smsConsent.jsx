"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import { useSiteSettings } from "@/lib/siteSettingsContext";

/**
 * SMS opt-in.
 *
 * Required by the RingCentral / TCR A2P 10DLC registration:
 *  - sits next to the phone number field
 *  - is OPTIONAL and UNCHECKED by default
 *  - carries the standard disclosures and links to the Privacy Policy and
 *    Terms & Conditions
 *
 * WHY THIS IS AN ACCORDION
 * The full approved paragraph runs to about ten lines on a phone, which pushed
 * the submit button off the bottom of the screen and made the form look like
 * paperwork. So the block is split in two:
 *
 *  1. A short line that is ALWAYS visible and still carries every element the
 *     carrier review looks for — the brand name, that consent is not a
 *     condition of service, that message and data rates may apply, that
 *     frequency varies, STOP and HELP, and both policy links.
 *  2. The full approved wording, one tap away behind "Full SMS terms". It is
 *     rendered at all times and only collapsed by height, so it is present in
 *     the page source and in the accessibility tree — a reviewer or a crawler
 *     sees it whether or not they open it.
 *
 * That keeps every disclosure at the point of opt-in, which is what the rule
 * actually requires, without a wall of text above the button.
 *
 * Both strings are editable in Sanity (Site Settings → SMS & Widget) so the
 * firm's counsel can revise them without a deploy. The defaults below are the
 * approved language and are what renders if a field is left empty.
 *
 * Do not make this field required, and do not default `checked` to true —
 * either change will fail the carrier review.
 */
const DEFAULT_SUMMARY =
  "I agree to receive SMS from The Turuchi Law Firm at the number above. Consent is not a condition of service. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help.";

const DEFAULT_CONSENT =
  "I consent to receive conversational, transactional, informational and promotional SMS messages from The Turuchi Law Firm at the number provided. Consent is not a condition of purchasing services, retaining the firm, or receiving legal services. Message and data rates may apply and message frequency varies. Reply STOP to opt out or HELP for help.";

const DEFAULT_HELPER =
  "Optional. Leave unchecked and we will only contact you by phone or email. No mobile opt-in or text message consent will be shared with third parties or affiliates for marketing purposes.";

/**
 * Renders copy with STOP / HELP emboldened wherever they appear, so the
 * emphasis survives the text being edited in the Studio.
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
  const [open, setOpen] = useState(false);
  const panelId = `${useId()}-sms-terms`;

  const summaryText = copy.summaryText || DEFAULT_SUMMARY;
  const consentText = copy.consentText || DEFAULT_CONSENT;
  const helperText = copy.helperText || DEFAULT_HELPER;
  const isDark = tone === "dark";

  const linkClass = isDark
    ? "text-accent-400 underline underline-offset-2"
    : "link-accent underline";

  return (
    <div
      className={[
        "rounded-lg border px-3.5 py-3",
        isDark ? "border-white/15 bg-white/5" : "border-surface-line bg-surface-alt",
      ].join(" ")}
    >
      {/* ------------------------------------------------- always visible */}
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          id={id}
          /* The id is namespaced per form instance; the name is not, because
             it is what the consent record is keyed on. */
          name="smsConsent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-ink-soft/50 accent-[#D98324]"
        />
        <span
          className={[
            "text-[12px] leading-[1.55]",
            isDark ? "text-navy-100" : "text-ink-muted",
          ].join(" ")}
        >
          {withEmphasis(summaryText, isDark)}
        </span>
      </label>

      {/* ---------------------------------------- links + disclosure toggle */}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 pl-[30px]">
        <Link href="/privacy-policy" className={`text-[11px] ${linkClass}`}>
          Privacy Policy
        </Link>
        <span className={isDark ? "text-white/25" : "text-ink-soft/50"} aria-hidden="true">
          ·
        </span>
        <Link href="/terms-and-conditions" className={`text-[11px] ${linkClass}`}>
          Terms &amp; Conditions
        </Link>
        <span className={isDark ? "text-white/25" : "text-ink-soft/50"} aria-hidden="true">
          ·
        </span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className={[
            "inline-flex items-center gap-1.5 text-[11px] font-semibold transition-colors",
            isDark ? "text-navy-200 hover:text-white" : "text-ink-soft hover:text-navy-900",
          ].join(" ")}
        >
          {open ? "Hide full SMS terms" : "Full SMS terms"}
          <FaChevronDown
            className={`text-[8px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ------------------------------------------------ collapsed, not gone */}
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-2.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={[
              "space-y-2 border-t pl-[30px] pr-1 pt-2.5 text-[11.5px] leading-relaxed",
              isDark ? "border-white/10 text-navy-200" : "border-surface-line text-ink-soft",
            ].join(" ")}
          >
            <p>{withEmphasis(consentText, isDark)}</p>
            <p>{helperText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmsConsent;
