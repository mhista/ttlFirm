"use client";
import { useEffect, useId, useState } from "react";
import { FaCircleCheck, FaCircleExclamation, FaXmark, FaSpinner } from "react-icons/fa6";
import SmsConsent from "@components/common/smsConsent";
import { useSiteSettings } from "@/lib/siteSettingsContext";
import { trackLead } from "@/lib/trackLead";

const EMPTY = {
  firstName: "",
  lastName: "",
  name: "",
  phone: "",
  email: "",
  message: "",
  caseType: "",
  incidentDate: "",
  treatedByDoctor: "",
  preferredLanguage: "",
};

/* Shipped defaults for the intake dropdowns. Site Settings → Lead Form
   replaces either list; these are what renders when it is left empty. */
const DEFAULT_CASE_TYPES = [
  "Car accident",
  "Truck or 18-wheeler accident",
  "Motorcycle accident",
  "Uber, Lyft or rideshare accident",
  "Pedestrian or bicycle accident",
  "Slip, trip or fall",
  "Injured at work",
  "Wrongful death",
  "Other",
];
const DEFAULT_LANGUAGES = ["English", "Spanish", "Other"];
const DOCTOR_OPTIONS = ["Yes", "No", "Not yet"];
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
  /**
   * The long intake used on the landing pages: first and last name apart, case
   * type, date of the incident, whether they have seen a doctor, and the
   * language they would rather be called in. Those answers are what let the
   * firm triage an ad lead before picking up the phone, which is the whole
   * point of a paid landing page. The website's own contact form stays short.
   */
  intake = false,
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

  const leadForm = siteSettings?.leadForm || {};
  const caseTypes = leadForm.caseTypes?.length ? leadForm.caseTypes : DEFAULT_CASE_TYPES;
  const languages = leadForm.languages?.length ? leadForm.languages : DEFAULT_LANGUAGES;

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
          // The notification email and the CRM both want one name field, so
          // the two inputs are joined here rather than everywhere downstream.
          name: intake
            ? [formData.firstName, formData.lastName].filter(Boolean).join(" ").trim()
            : formData.name,
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

  // A native <select> keeps the platform picker — on a phone that is a full
  // height wheel rather than a cramped custom dropdown, which is what the
  // majority of ad traffic is using.
  const selectClass = `${inputClass} appearance-none bg-[length:16px] bg-[right_0.9rem_center] bg-no-repeat pr-10 ${
    isDark ? "select-caret-light" : "select-caret-dark"
  }`;

  const gap = isCompact ? "gap-3.5" : "gap-5";

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
        {intake ? (
          <div className={`grid sm:grid-cols-2 ${gap}`}>
            <div>
              <label htmlFor={fieldId("firstName")} className={labelClass}>
                First name
              </label>
              <input
                id={fieldId("firstName")}
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={fieldId("lastName")} className={labelClass}>
                Last name
              </label>
              <input
                id={fieldId("lastName")}
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                value={formData.lastName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        ) : (
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
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        )}

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
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* ------------------------------------------------------- intake
            Landing pages only. Every one of these is what lets the firm triage
            an ad lead before the call — and the date and the doctor question
            in particular are what separate a claim worth taking from one that
            is already out of time. */}
        {intake && (
          <>
            <div className={`grid sm:grid-cols-2 ${gap}`}>
              <div>
                <label htmlFor={fieldId("caseType")} className={labelClass}>
                  Type of case
                </label>
                <select
                  id={fieldId("caseType")}
                  name="caseType"
                  required
                  value={formData.caseType}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select one</option>
                  {caseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={fieldId("incidentDate")} className={labelClass}>
                  Date of incident
                </label>
                <input
                  id={fieldId("incidentDate")}
                  name="incidentDate"
                  type="date"
                  /* Nothing in the future, and nothing so old it cannot be a
                     live claim — a typo here is otherwise invisible. */
                  max={new Date().toISOString().slice(0, 10)}
                  min="1990-01-01"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className={`grid sm:grid-cols-2 ${gap}`}>
              <div>
                <label htmlFor={fieldId("treatedByDoctor")} className={labelClass}>
                  Seen a doctor?
                </label>
                <select
                  id={fieldId("treatedByDoctor")}
                  name="treatedByDoctor"
                  value={formData.treatedByDoctor}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select one</option>
                  {DOCTOR_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={fieldId("preferredLanguage")} className={labelClass}>
                  Preferred language
                </label>
                <select
                  id={fieldId("preferredLanguage")}
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Select one</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

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
