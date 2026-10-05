"use client";
import { useId, useState } from "react";
import { FaStar, FaCheck } from "react-icons/fa6";

/**
 * Leave a review, on the firm's own site.
 *
 * Nothing here decides who is shown the Google link — that button sits above
 * this form and is shown to everyone, before anyone has picked a rating.
 * Filtering by rating and only sending the happy ones to Google is review
 * gating, which Google prohibits and which reads as dishonest the moment
 * anyone notices it.
 *
 * What arrives here is stored unapproved and emailed to the firm; it does not
 * appear on the site until someone has read it. The form says so, because a
 * person who writes five paragraphs and then sees nothing appear will
 * reasonably assume it was lost.
 */
const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

const CASE_TYPES = [
  { value: "personal-injury", label: "Personal injury" },
  { value: "workers-comp", label: "Workers' compensation" },
  { value: "general", label: "Something else" },
];

const ReviewForm = () => {
  const uid = useId();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const shown = hovered || rating;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);

    if (!rating) {
      setError("Please choose a star rating.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          review: data.get("review"),
          caseType: data.get("caseType"),
          website: data.get("website"), // honeypot
          rating,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-xl border border-surface-line bg-white p-8 text-center shadow-card">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-500">
          <FaCheck className="text-navy-950" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-navy-900">Thank you</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
          Your review has gone to the firm. It will appear on this page once someone
          has read it — usually within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-surface-line bg-white p-6 shadow-card md:p-8"
    >
      {/* ---------------------------------------------------------- rating */}
      <fieldset>
        <legend className="font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-navy-900">
          Your rating
        </legend>
        <div
          className="mt-3 flex items-center gap-2"
          onMouseLeave={() => setHovered(0)}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setRating(value);
                setError("");
              }}
              onMouseEnter={() => setHovered(value)}
              onFocus={() => setHovered(value)}
              onBlur={() => setHovered(0)}
              aria-pressed={rating === value}
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              className="rounded p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            >
              <FaStar
                className={`text-2xl transition-colors ${
                  value <= shown ? "text-accent-500" : "text-surface-line"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
          <span className="ml-2 text-[14px] text-ink-muted" aria-live="polite">
            {RATING_LABELS[shown] || ""}
          </span>
        </div>
      </fieldset>

      {/* ----------------------------------------------------------- name */}
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${uid}-name`}
            className="block font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-navy-900"
          >
            Your name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className="mt-2 w-full rounded-md border border-surface-line bg-white px-4 py-3 text-[15px] text-navy-900 outline-none transition-colors focus:border-accent-500"
          />
          <p className="mt-1.5 text-[12px] text-ink-soft">
            Shown with your review. First name and last initial is fine.
          </p>
        </div>

        <div>
          <label
            htmlFor={`${uid}-email`}
            className="block font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-navy-900"
          >
            Email <span className="font-normal normal-case tracking-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            maxLength={200}
            autoComplete="email"
            className="mt-2 w-full rounded-md border border-surface-line bg-white px-4 py-3 text-[15px] text-navy-900 outline-none transition-colors focus:border-accent-500"
          />
          <p className="mt-1.5 text-[12px] text-ink-soft">
            Never published. Only so the firm can thank you.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------- case type */}
      <div className="mt-5">
        <label
          htmlFor={`${uid}-case`}
          className="block font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-navy-900"
        >
          What did we help you with?
        </label>
        <select
          id={`${uid}-case`}
          name="caseType"
          defaultValue="personal-injury"
          className="mt-2 w-full rounded-md border border-surface-line bg-white px-4 py-3 text-[15px] text-navy-900 outline-none transition-colors focus:border-accent-500"
        >
          {CASE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* ---------------------------------------------------------- review */}
      <div className="mt-5">
        <label
          htmlFor={`${uid}-review`}
          className="block font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-navy-900"
        >
          Your review
        </label>
        <textarea
          id={`${uid}-review`}
          name="review"
          rows={6}
          maxLength={5000}
          className="mt-2 w-full rounded-md border border-surface-line bg-white px-4 py-3 text-[15px] leading-relaxed text-navy-900 outline-none transition-colors focus:border-accent-500"
        />
        <p className="mt-1.5 text-[12px] text-ink-soft">
          What the process was like is more use to the next person than &ldquo;great
          lawyer&rdquo; — but write whatever you like. Please don&rsquo;t include details of
          your case you would rather keep private; this page is public.
        </p>
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="mt-5 text-[14px] font-medium text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-navy mt-7 w-full justify-center disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit my review"}
      </button>

      <p className="mt-4 text-[12px] leading-relaxed text-ink-soft">
        Reviews are read by the firm before they appear here. Submitting one does not
        create an attorney-client relationship, and nothing you write here is
        confidential.
      </p>
    </form>
  );
};

export default ReviewForm;
