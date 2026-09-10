"use client";
import { useEffect, useId, useState } from "react";
import { FaCircleCheck, FaCircleExclamation, FaXmark, FaSpinner } from "react-icons/fa6";
import SmsConsent from "@components/common/smsConsent";
import { useSiteSettings } from "@/lib/siteSettingsContext";
import { trackLead } from "@/lib/trackLead";

const EMPTY = { name: "", phone: "", email: "", message: "" };
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes, matching the message shown.

/**
 * Lead form.
 *
 * Changes from the previous version:
 *  - MUI (Button / Snackbar / CircularProgress) dropped — it pulled Emotion
 *    into the client bundle for three widgets and forced an inline orange.
 *  - The cooldown notice said "10 minutes" while the check used one hour.
 *  - Adds the required, optional, unchecked SMS consent checkbox.
 *  - Real labels instead of duplicated `id="name"` on every input.
 */
const Form = ({
  tone = "light",
  heading,
  subheading,
  submitLabel,
  source = "Website contact form",
  /**
   * "compact" is for the landing pages, where the form shares the fold with
   * the headline and every pixel of height is a pixel of persuasion lost:
   * tighter rows, a three-line message box instead of five, and a smaller
   * disclaimer. The fields themselves are identical — nothing is removed,
   * because a shorter form that drops the phone number is not a shorter form,
   * it is a worse lead.
   */
  density = "comfortable",
}) => {
  const siteSettings = useSiteSettings();
  const disclaimer =
    siteSettings?.smsConsent?.formDisclaimer ||
    "Submitting this form does not create an attorney-client relationship and does not make the firm your lawyer. Please do not send confidential or time-sensitive information through this form.";
  const firmPhone = siteSettings?.contact?.phone || "732-210-6410";

  const [formData, setFormData] = useState(EMPTY);
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState(null); // { type, message }
  const [cooldownUntil, setCooldownUntil] = useState(0);

  const isDark = tone === "dark";
  const isCompact = density === "compact";

  // A landing page renders this component twice — once in the hero and once in
  // the closing section — so the field ids have to be unique per instance or
  // every label points at the first form's inputs.
  const uid = useId();
  const fieldId = (name) => `${uid}-${name}`;

  useEffect(() => {
    try {
      const last = Number(localStorage.getItem("lastEmailSent") || 0);
      if (last && Date.now() - last < COOLDOWN_MS) setCooldownUntil(last + COOLDOWN_MS);
    } catch {
      /* storage can be unavailable in private mode — not fatal */
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 7000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setToast({ type: "error", message: "No internet connection. Please check your network." });
      return;
    }

    if (Date.now() < cooldownUntil) {
      const mins = Math.max(1, Math.ceil((cooldownUntil - Date.now()) / 60000));
      setToast({
        type: "warning",
        message: `You've already sent a message. Please try again in ${mins} minute${mins === 1 ? "" : "s"}, or call us directly.`,
      });
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          smsConsent,
          source,
          consentTimestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Conversion signal for Meta and Google. Without this an ad set
        // optimising for leads has nothing to learn from.
        trackLead({
          source,
          google: {
            adsId: siteSettings?.tracking?.googleAdsId,
            label: siteSettings?.tracking?.googleAdsLabel,
          },
        });
        setToast({
          type: "success",
          message: "Thank you — your message has been sent. We'll be in touch shortly.",
        });
        setFormData(EMPTY);
        setSmsConsent(false);
        try {
          localStorage.setItem("lastEmailSent", String(Date.now()));
        } catch {
          /* ignore */
        }
        setCooldownUntil(Date.now() + COOLDOWN_MS);
      } else {
        setToast({
          type: "error",
          message: `We couldn't send that. Please call ${firmPhone} and we'll help right away.`,
        });
      }
    } catch (error) {
      setToast({
        type: "error",
        message: `Something went wrong. Please call ${firmPhone} and we'll help right away.`,
      });
    } finally {
      setIsSending(false);
    }
  };

  const labelClass = [
    isDark
      ? "block font-sans text-xs font-semibold uppercase tracking-wide text-navy-100"
      : "field-label",
    isCompact ? "mb-1" : "mb-1.5",
  ].join(" ");

  const inputClass = [
    isDark
      ? "w-full rounded-md border border-white/15 bg-white/5 px-4 text-[15px] text-white placeholder:text-navy-200/70 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/25"
      : "field",
    isCompact ? "py-2.5" : "py-3.5",
  ].join(" ");

  return (
    <div className="w-full">
      {heading && (
        <h3
          className={`font-display font-bold ${isCompact ? "text-xl" : "text-2xl"} ${
            isDark ? "text-white" : "text-navy-900"
          }`}
        >
          {heading}
        </h3>
      )}
      {subheading && (
        <p
          className={`mt-1.5 ${isCompact ? "text-[13px]" : "text-sm"} ${
            isDark ? "text-navy-100" : "text-ink-muted"
          }`}
        >
          {subheading}
        </p>
      )}

      <form onSubmit={handleSubmit} className={`flex w-full flex-col ${isCompact ? "gap-3.5" : "gap-5"} ${heading ? (isCompact ? "mt-4" : "mt-6") : ""}`} noValidate={false}>
        <div>
          <label htmlFor={fieldId("name")} className={labelClass}>
            Full name
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className={`grid sm:grid-cols-2 ${isCompact ? "gap-3.5" : "gap-5"}`}>
          <div>
            <label htmlFor={fieldId("phone")} className={labelClass}>
              Mobile number
            </label>
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="(732) 210-6410"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor={fieldId("email")} className={labelClass}>
              Email address
            </label>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* SMS consent sits directly beneath the phone field, per the
            carrier registration requirements. */}
        <SmsConsent
          id={fieldId("sms-consent")}
          checked={smsConsent}
          onChange={setSmsConsent}
          tone={tone}
        />

        <div>
          <label htmlFor={fieldId("message")} className={labelClass}>
            How can we help?
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={isCompact ? 3 : 5}
            required
            placeholder="Briefly describe what happened and when."
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button type="submit" disabled={isSending} className="btn-primary w-full disabled:opacity-70">
          {isSending ? (
            <>
              <FaSpinner className="animate-spin text-sm" aria-hidden="true" /> Sending…
            </>
          ) : (
            submitLabel || "Request My Free Case Review"
          )}
        </button>

        <p
          className={`leading-relaxed ${isCompact ? "text-[10.5px]" : "text-[11px]"} ${
            isDark ? "text-navy-200" : "text-ink-soft"
          }`}
        >
          {disclaimer}
        </p>
      </form>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-[120] w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 animate-slide-up sm:left-6 sm:translate-x-0"
        >
          <div
            className={[
              "flex items-start gap-3 rounded-lg px-4 py-3.5 text-sm shadow-widget",
              toast.type === "success" && "bg-navy-900 text-white",
              toast.type === "error" && "bg-red-700 text-white",
              toast.type === "warning" && "bg-accent-500 text-navy-950",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {toast.type === "success" ? (
              <FaCircleCheck className="mt-0.5 shrink-0 text-accent-400" aria-hidden="true" />
            ) : (
              <FaCircleExclamation className="mt-0.5 shrink-0" aria-hidden="true" />
            )}
            <span className="flex-1">{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Dismiss"
              className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
            >
              <FaXmark />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
