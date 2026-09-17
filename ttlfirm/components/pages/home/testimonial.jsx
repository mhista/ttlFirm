"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { register } from "swiper/element/bundle";
import { FaAngleLeft, FaAngleRight, FaStar, FaQuoteLeft } from "react-icons/fa6";
import { urlFor } from "@/lib/sanity.client";

register();

const StarRating = ({ rating = 5 }) => (
  <div
    className="flex justify-center gap-1"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`text-sm ${i < rating ? "text-accent-500" : "text-surface-line"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const TestimonialCarousel = ({ testimonials = [], content }) => {
  const swiperRef = useRef(null);

  // Google reviews feed this carousel too, and two of the firm's reviewers
  // left a star rating with no words. A slide holding a quotation mark and an
  // empty space is worse than one slide fewer, so textless reviews are skipped
  // here — they still count on /reviews, where the rating is stated in words.
  const slides = testimonials.filter((t) => t.testimonial?.trim());

  useEffect(() => {
    const el = swiperRef.current;
    if (!el || !slides.length) return;

    Object.assign(el, {
      loop: slides.length > 2,
      slidesPerView: 1,
      spaceBetween: 24,
      autoHeight: true,
      autoplay: { delay: 6000, disableOnInteraction: true },
      pagination: { clickable: true },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 24 },
        1280: { slidesPerView: 3, spaceBetween: 28 },
      },
    });
    el.initialize();
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="container-x section-y">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center" data-aos="fade-down">
        <div className="flex items-center justify-center gap-3">
          <span className="rule" aria-hidden="true" />
          <span className="eyebrow">{content?.sectionLabel || "Client Testimonials"}</span>
          <span className="rule" aria-hidden="true" />
        </div>
        <h2 className="h-section mt-5">{content?.heading || "What Our Clients Say"}</h2>
        <p className="lede mt-5">
          {content?.description ||
            "In their own words — clients who trusted the firm with a matter that mattered."}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative mt-12" data-aos="fade-up">
        <swiper-container ref={swiperRef} init="false" class="pb-12">
          {slides.map((t) => (
            <swiper-slide key={t._id} class="h-auto">
              <figure className="flex h-full flex-col rounded-xl border border-surface-line bg-white p-7 shadow-card">
                <FaQuoteLeft className="text-2xl text-accent-500/35" aria-hidden="true" />

                <blockquote className="mt-5 flex-1">
                  <p className="text-[15px] leading-relaxed text-ink-muted">{t.testimonial}</p>
                  {/* Same rule as the review cards: a review captured in part
                      says so and links to the original, rather than passing a
                      fragment off as everything the client wrote. */}
                  {t.truncated && t.sourceUrl && (
                    <a
                      href={t.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-3 inline-block font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-navy-800 transition-colors hover:text-accent-600"
                    >
                      Read the full review on Google
                    </a>
                  )}
                </blockquote>

                <figcaption className="mt-6 border-t border-surface-line pt-5">
                  <StarRating rating={t.rating || 5} />
                  <div className="mt-4 flex items-center gap-3.5">
                    {t.image ? (
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-accent-500/35">
                        <Image
                          src={urlFor(t.image).width(96).height(96).url()}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </span>
                    ) : (
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-bold text-accent-400">
                        {t.name?.charAt(0)}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block truncate font-sans text-sm font-bold text-navy-900">
                        {t.name}
                      </span>
                      {(t.relativeDate || t.role) && (
                        <span className="block truncate text-xs text-ink-soft">
                          {[t.role, t.relativeDate].filter(Boolean).join(" · ")}
                        </span>
                      )}
                      {t.caseType && (
                        <span className="mt-1.5 inline-block rounded-full bg-navy-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy-700">
                          {String(t.caseType).replace(/-/g, " ")}
                        </span>
                      )}
                    </span>
                  </div>
                </figcaption>
              </figure>
            </swiper-slide>
          ))}
        </swiper-container>

        {/* Controls */}
        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => swiperRef.current?.swiper?.slidePrev()}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-line bg-white text-navy-800 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
          >
            <FaAngleLeft />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.swiper?.slideNext()}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-line bg-white text-navy-800 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {content?.disclaimer !== "" && (
        <p className="mt-8 text-center text-xs text-ink-soft">
          {content?.disclaimer ||
            "Testimonials reflect the facts of those particular matters. Prior results do not guarantee a similar outcome."}
        </p>
      )}
    </div>
  );
};

export default TestimonialCarousel;
