import { FaStar, FaArrowUpRightFromSquare } from "react-icons/fa6";

/**
 * One review.
 *
 * Google publishes display requirements for anyone showing reviews from a
 * Business Profile, and they are not optional decoration — this card meets
 * them deliberately:
 *
 *  - the reviewer is named, and the name links to their Google contributions
 *  - the age is shown the way Google words it ("3 weeks ago"), not as a date
 *  - a translated review says so
 *  - a review that was captured in part says so, and links to the full one
 *
 * The last of those matters most. Several of the firm's reviews were read off
 * Google's collapsed view, which cuts long text at "… More". Printing that
 * fragment as though it were the whole review would misrepresent what the
 * client wrote, so the card is explicit about it and sends the reader to the
 * original.
 *
 * `tone="dark"` is for the navy bands.
 */

const GoogleMark = () => (
  // Google's own four colours. Drawn inline rather than loaded, because the
  // published artifact and the site both have to work without third-party
  // requests.
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.4 5.4 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
    />
  </svg>
);

export const Stars = ({ rating = 5, className = "" }) => (
  <div
    className={`flex gap-0.5 ${className}`}
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`text-[13px] ${i < rating ? "text-accent-500" : "text-black/15"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

const ReviewCard = ({ review, tone = "light", showReply = true }) => {
  if (!review) return null;

  const isDark = tone === "dark";
  const isGoogle = review.source === "google";
  const hasText = Boolean(review.testimonial?.trim());

  const shell = isDark
    ? "border-white/10 bg-white/5"
    : "border-surface-line bg-white shadow-card";
  const bodyText = isDark ? "text-navy-100" : "text-ink-muted";
  const nameText = isDark ? "text-white" : "text-navy-900";
  const metaText = isDark ? "text-navy-300" : "text-ink-soft";

  return (
    <figure className={`flex flex-col rounded-xl border p-6 ${shell}`}>
      {/* ------------------------------------------------------------ head */}
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-sans text-[13px] font-bold ${
            isDark ? "bg-white/10 text-accent-400" : "bg-navy-50 text-navy-700"
          }`}
        >
          {initials(review.name)}
        </span>

        <div className="min-w-0 flex-1">
          <p className={`truncate font-sans text-[15px] font-semibold ${nameText}`}>
            {review.name}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <Stars rating={review.rating} />
            {review.relativeDate && (
              <span className={`text-[12px] ${metaText}`}>{review.relativeDate}</span>
            )}
            {isGoogle && (
              <span className={`inline-flex items-center gap-1 text-[12px] ${metaText}`}>
                <GoogleMark />
                Google
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ body */}
      {hasText ? (
        <blockquote className={`mt-4 text-[15px] leading-relaxed ${bodyText}`}>
          {review.testimonial}
        </blockquote>
      ) : (
        <p className={`mt-4 text-[14px] italic ${metaText}`}>
          Rated {review.rating} out of 5 — no written review.
        </p>
      )}

      {/* ----------------------------------------------------------- notes */}
      <div className="mt-4 space-y-1.5">
        {review.translatedFrom && (
          <p className={`text-[11px] ${metaText}`}>
            Translated by Google from {review.translatedFrom}.
          </p>
        )}

        {review.truncated && review.sourceUrl && (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`inline-flex items-center gap-1.5 font-sans text-[12px] font-bold uppercase tracking-[0.1em] transition-colors ${
              isDark ? "text-accent-400 hover:text-white" : "text-navy-800 hover:text-accent-600"
            }`}
          >
            Read the full review on Google
            <FaArrowUpRightFromSquare className="text-[8px]" aria-hidden="true" />
          </a>
        )}
      </div>

      {/* ----------------------------------------------------------- reply */}
      {showReply && review.ownerReply && (
        <div
          className={`mt-5 rounded-lg border-l-2 p-4 ${
            isDark ? "border-accent-500 bg-white/5" : "border-accent-500 bg-surface-alt"
          }`}
        >
          <p
            className={`font-sans text-[11px] font-bold uppercase tracking-[0.14em] ${
              isDark ? "text-accent-400" : "text-navy-700"
            }`}
          >
            Response from the firm
          </p>
          <p className={`mt-2 text-[14px] leading-relaxed ${bodyText}`}>{review.ownerReply}</p>
        </div>
      )}
    </figure>
  );
};

export default ReviewCard;
