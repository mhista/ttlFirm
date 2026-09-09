"use client";
import Link from "next/link";

/**
 * SMS opt-in checkbox.
 *
 * Required by the RingCentral / TCR A2P 10DLC registration:
 *  - sits next to the phone number field
 *  - is OPTIONAL and UNCHECKED by default
 *  - carries the standard disclosures and a link to the Privacy Policy
 *
 * Do not make this field required, and do not default `checked` to true —
 * either change will fail the carrier review.
 */
const SmsConsent = ({ checked, onChange, id = "smsConsent", tone = "light" }) => {
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
          I consent to receive conversational, transactional, informational and
          promotional SMS messages from The Turuchi Law Firm at the number provided.
          Consent is not a condition of purchasing services, retaining the firm, or
          receiving legal services. Message and data rates may apply and message
          frequency varies. Reply <strong className={isDark ? "text-white" : "text-navy-900"}>STOP</strong> to opt out
          or <strong className={isDark ? "text-white" : "text-navy-900"}>HELP</strong> for help. See our{" "}
          <Link
            href="/privacy-policy"
            className={isDark ? "text-accent-400 underline underline-offset-2" : "link-accent underline"}
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms-and-conditions"
            className={isDark ? "text-accent-400 underline underline-offset-2" : "link-accent underline"}
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
        Optional. Leave unchecked and we will only contact you by phone or email.
        No mobile opt-in or text message consent will be shared with third parties
        or affiliates for marketing purposes.
      </p>
    </div>
  );
};

export default SmsConsent;
