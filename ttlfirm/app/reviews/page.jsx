import Script from "next/script";
import { FaStar, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { client } from "@/lib/sanity.client";
import { allReviewsQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import { FIRM } from "@/lib/siteNav";
import { RESULTS_DISCLAIMER } from "@/lib/attorneyBio.mjs";
import PageHeader from "@components/pages/header";
import Reveal from "@components/common/reveal";
import ReviewCard, { Stars } from "@components/common/reviewCard";
import ReviewForm from "@components/pages/reviews/reviewForm";

export const revalidate = 60;

export const metadata = {
  title: "Client Reviews",
  description:
    "What clients say about The Turuchi Law Firm, LLC — verified Google reviews from people the firm has represented in New Jersey personal injury and workers' compensation matters.",
  alternates: { canonical: "https://turuchilawfirm.com/reviews" },
  openGraph: {
    title: "Client Reviews | The Turuchi Law Firm, LLC",
    description: "Reviews from clients the firm has represented across New Jersey.",
    url: "https://turuchilawfirm.com/reviews",
  },
};

async function getData() {
  const [reviews, siteSettings] = await Promise.all([
    client.fetch(allReviewsQuery).catch(() => []),
    client.fetch(siteSettingsQuery).catch(() => ({})),
  ]);
  return { reviews: reviews || [], siteSettings: siteSettings || {} };
}

/**
 * The review page's structured data.
 *
 * AggregateRating is what puts star ratings in a Google result, and it is also
 * the single easiest piece of markup to get into trouble with: it must count
 * reviews that genuinely exist and are visible on this page, nothing more. So
 * it is computed from the reviews actually being rendered, and omitted
 * entirely when there are none — never hardcoded, never padded.
 *
 * Note it describes the FIRM, not a product, because that is what is being
 * reviewed.
 */
function buildReviewSchema(reviews) {
  const rated = reviews.filter((r) => Number(r.rating) > 0);
  if (!rated.length) return null;

  const average = rated.reduce((sum, r) => sum + Number(r.rating), 0) / rated.length;

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": "https://turuchilawfirm.com/#organization",
    name: FIRM.name,
    url: "https://turuchilawfirm.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: average.toFixed(1),
      reviewCount: rated.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: rated
      .filter((r) => r.testimonial?.trim())
      .slice(0, 12)
      .map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: r.testimonial,
      })),
  };
}

const ReviewsPage = async () => {
  const { reviews, siteSettings } = await getData();

  const rated = reviews.filter((r) => Number(r.rating) > 0);
  const average = rated.length
    ? rated.reduce((sum, r) => sum + Number(r.rating), 0) / rated.length
    : 0;

  // The one-tap "write a review" link from the firm's Google Business Profile
  // (Business Profile → Ask for reviews). Until it is set in the Studio, the
  // button falls back to a search for the firm, which still gets someone to
  // the right place — just with one extra tap.
  const googleReviewUrl =
    siteSettings?.reviews?.googleReviewUrl ||
    "https://www.google.com/search?q=The+Turuchi+Law+Firm+LLC";
  const googleProfileUrl =
    siteSettings?.reviews?.googleProfileUrl || googleReviewUrl;

  const schema = buildReviewSchema(reviews);

  return (
    <>
      {schema && (
        <Script
          id="reviews-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <PageHeader
        eyebrow="Client Reviews"
        text="What Our"
        text2="Clients Say"
        description="Every review below was left by someone the firm represented. Nothing here is edited, and the firm's own replies are shown alongside."
        image="/assets/images/bgg.jpg"
        breadcrumbs={[{ label: "Reviews" }]}
      />

      {/* ------------------------------------------------------------ stats */}
      {rated.length > 0 && (
        <section className="border-b border-surface-line bg-surface-alt">
          <div className="container-x py-10">
            <Reveal className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-5">
                <span className="font-display text-5xl font-bold leading-none text-navy-900">
                  {average.toFixed(1)}
                </span>
                <div>
                  <Stars rating={Math.round(average)} />
                  <p className="mt-1.5 text-[14px] text-ink-muted">
                    {rated.length} review{rated.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-primary"
              >
                <FaStar className="text-xs" aria-hidden="true" />
                Leave a Google review
                <FaArrowUpRightFromSquare className="text-[9px]" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- reviews */}
      <section className="bg-white">
        <div className="container-x section-y">
          {reviews.length ? (
            <>
              {/* items-start so each card is the height of its own content — a
                    review with no reply should not be padded out to match one
                    that has a long one. */}
              <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review, i) => (
                  <Reveal key={review._id} delay={Math.min(i, 5) * 60}>
                    <ReviewCard review={review} />
                  </Reveal>
                ))}
              </div>

              {/* Google asks that anyone displaying reviews explains how they
                  are ordered and notes that Google removes fake content. */}
              <p className="mt-10 text-center text-[12px] leading-relaxed text-ink-soft">
                Reviews are shown newest first and are not filtered by rating. Google
                reviews are mirrored from the firm&rsquo;s Google Business Profile, where
                Google checks for and removes fake content when it identifies it.{" "}
                <a
                  href={googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-navy-800 underline underline-offset-2 hover:text-accent-600"
                >
                  See them on Google
                </a>
                .
              </p>
            </>
          ) : (
            <p className="text-center text-[15px] text-ink-muted">
              Reviews are on their way. In the meantime you can read them on{" "}
              <a
                href={googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-navy-800 underline underline-offset-2"
              >
                the firm&rsquo;s Google profile
              </a>
              .
            </p>
          )}

          {/* NJ RPC 7.1 — client testimonials are attorney advertising, and a
              results claim needs this alongside it. */}
          <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-ink-soft">
            {RESULTS_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- leave one */}
      <section className="bg-surface-alt">
        <div className="container-x section-y">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="rule" aria-hidden="true" />
              <span className="eyebrow">Were we your attorneys?</span>
              <span className="rule" aria-hidden="true" />
            </div>
            <h2 className="h-section mt-5">Tell us how it went</h2>
            <p className="lede mt-5">
              A Google review helps the next injured person find the firm, and takes
              about thirty seconds. If you would rather write to us directly, the form
              below comes straight to the office.
            </p>

            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn-primary mt-8"
            >
              <FaStar className="text-xs" aria-hidden="true" />
              Review us on Google
              <FaArrowUpRightFromSquare className="text-[9px]" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={100} className="mx-auto mt-12 max-w-2xl">
            <ReviewForm />
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ReviewsPage;
