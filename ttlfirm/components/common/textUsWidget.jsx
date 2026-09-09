"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaXmark, FaCommentDots, FaSpinner, FaCircleCheck } from "react-icons/fa6";
import SmsConsent from "@components/common/smsConsent";

const EMPTY = { name: "", phone: "", message: "" };

/**
 * "Want to schedule a consultation? Text us!" — the bottom-right widget the
 * client asked for after ramlawnj.com.
 *
 * Submissions currently post to /api/email so no enquiry is lost while the
 * RingCentral A2P 10DLC registration is pending. When that is approved, swap
 * the fetch target in `submit()` for the messaging endpoint — nothing else in
 * this component needs to change.
 *
 * Hidden on the legal pages so it never covers the policy text a carrier
 * reviewer is reading.
 */
const HIDE_ON = ["/privacy-policy", "/terms-and-conditions", "/disclaimer"];

const TextUsWidget = () => {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [teaserOpen, setTeaserOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [smsConsent, setSmsConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const firstFieldRef = useRef(null);

  /* Appear after a moment so it doesn't compete with the hero. */
  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 2500);
    const teaser = setTimeout(() => {
      try {
        if (!sessionStorage.getItem("textUsTeaserDismissed")) setTeaserOpen(true);
      } catch {
        setTeaserOpen(true);
      }
    }, 4500);
    return () => {
      clearTimeout(show);
      clearTimeout(teaser);
    };
  }, []);

  useEffect(() => {
    if (panelOpen) firstFieldRef.current?.focus();
  }, [panelOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setPanelOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const dismissTeaser = () => {
    setTeaserOpen(false);
    try {
      sessionStorage.setItem("textUsTeaserDismissed", "1");
    } catch {
      /* ignore */
    }
  };

  if (HIDE_ON.includes(pathname)) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Please fill in your name, mobile number and message.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: "",
          message: form.message,
          smsConsent,
          source: "Text Us widget",
          consentTimestamp: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("send failed");
      setSent(true);
      setForm(EMPTY);
      setSmsConsent(false);
    } catch {
      setError("We couldn't send that. Please call 732-210-6410 and we'll help right away.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className={`fixed bottom-5 right-4 z-[110] flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* ------------------------------------------------------------- Panel */}
      {panelOpen && (
        <div
          role="dialog"
          aria-label="Send us a text"
          className="w-[min(92vw,380px)] animate-slide-up overflow-hidden rounded-xl bg-white shadow-widget"
        >
          <div className="flex items-center justify-between bg-navy-900 px-5 py-4">
            <div>
              <p className="font-display text-lg font-bold text-white">Send us a text</p>
              <p className="mt-0.5 text-xs text-navy-200">
                Add your details and we&rsquo;ll respond by text.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-navy-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <FaXmark />
            </button>
          </div>

          {sent ? (
            <div className="px-5 py-8 text-center">
              <FaCircleCheck className="mx-auto text-3xl text-accent-500" aria-hidden="true" />
              <p className="mt-4 font-display text-lg font-semibold text-navy-900">
                Message received
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Thank you. Someone from the firm will get back to you shortly. If it&rsquo;s
                urgent, call{" "}
                <a href="tel:+17322106410" className="link-accent">
                  732-210-6410
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setPanelOpen(false);
                }}
                className="btn-outline-dark mt-6 w-full"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="max-h-[70vh] overflow-y-auto px-5 py-5">
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="tw-name" className="field-label">
                    First and last name
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="tw-name"
                    className="field"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="tw-phone" className="field-label">
                    Mobile number
                  </label>
                  <input
                    id="tw-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    className="field"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor="tw-message" className="field-label">
                    Message
                  </label>
                  <textarea
                    id="tw-message"
                    rows={3}
                    className="field resize-none"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                </div>

                <SmsConsent checked={smsConsent} onChange={setSmsConsent} id="tw-consent" />

                {error && (
                  <p role="alert" className="text-xs font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-70">
                  {sending ? (
                    <>
                      <FaSpinner className="animate-spin text-sm" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------ Teaser */}
      {!panelOpen && teaserOpen && (
        <div className="relative flex max-w-[290px] animate-slide-up items-center gap-3 rounded-xl bg-white py-3 pl-3 pr-9 shadow-widget">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900">
            <FaCommentDots className="text-lg text-accent-400" aria-hidden="true" />
          </span>
          <button
            type="button"
            onClick={() => {
              setPanelOpen(true);
              dismissTeaser();
            }}
            className="text-left text-sm font-medium leading-snug text-navy-900"
          >
            Want to schedule a consultation? Text us!
          </button>
          <button
            type="button"
            onClick={dismissTeaser}
            aria-label="Dismiss"
            className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-[10px] text-white"
          >
            <FaXmark />
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------ Trigger */}
      {!panelOpen && (
        <div className="relative">
          <span
            className="absolute inset-0 rounded-full bg-accent-500/45 animate-pulse-ring"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={() => {
              setPanelOpen(true);
              dismissTeaser();
            }}
            className="relative flex min-h-[52px] items-center gap-2.5 rounded-full bg-accent-500 px-6 py-3.5 font-sans text-sm font-bold text-navy-950 shadow-widget transition-all duration-300 hover:bg-accent-400 active:translate-y-px"
          >
            <FaCommentDots className="text-base" aria-hidden="true" />
            Text us!
          </button>
        </div>
      )}
    </div>
  );
};

export default TextUsWidget;
