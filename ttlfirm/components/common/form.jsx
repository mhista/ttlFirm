"use client";
import { useEffect, useState } from "react";
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
const Form = ({ tone = "light", heading, subheading, submitLabel, source = "Website contact form" }) => {
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

  const labelClass = isDark
    ? "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wide text-navy-100"
    : "field-label";
  const inputClass = isDark
    ? "w-full rounded-md border border-white/15 bg-white/5 px-4 py-3.5 text-[15px] text-white placeholder:text-navy-200/70 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/25"
    : "field";

  return (
    <div className="w-full">
      {heading && (
        <h3 className={`font-display text-2xl font-bold ${isDark ? "text-white" : "text-navy-900"}`}>
          {heading}
        </h3>
      )}
      {subheading && (
        <p className={`mt-2 text-sm ${isDark ? "text-navy-100" : "text-ink-muted"}`}>{subheading}</p>
      )}

      <form onSubmit={handleSubmit} className={`flex w-full flex-col gap-5 ${heading ? "mt-6" : ""}`} noValidate={false}>
        <div>
          <label htmlFor="lead-name" className={labelClass}>
            Full name
          </label>
          <input
            id="lead-name"
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-phone" className={labelClass}>
              Mobile number
            </label>
            <input
              id="lead-phone"
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
            <label htmlFor="lead-email" className={labelClass}>
              Email address
            </label>
            <input
              id="lead-email"
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
        <SmsConsent checked={smsConsent} onChange={setSmsConsent} tone={tone} />

        <div>
          <label htmlFor="lead-message" className={labelClass}>
            How can we help?
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={5}
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

        <p className={`text-[11px] leading-relaxed ${isDark ? "text-navy-200" : "text-ink-soft"}`}>
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
