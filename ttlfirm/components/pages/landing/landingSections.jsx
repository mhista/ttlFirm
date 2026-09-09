"use client";
import { useState } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import {
  FaCheck,
  FaPhone,
  FaArrowRightLong,
  FaStar,
  FaQuoteLeft,
  FaPlay,
  FaMinus,
  FaPlus,
} from "react-icons/fa6";
import {
  FaCheckCircle,
  FaBalanceScale,
  FaHandshake,
  FaComments,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";

import Form from "@components/common/form";
import { telHref } from "@/lib/siteNav";

const iconMap = {
  FaBalanceScale,
  FaComments,
  FaMapMarkerAlt,
  FaHandshake,
  FaCheckCircle,
  FaUserTie,
};

/* --------------------------------------------------------------------- hero */
export const LpHero = ({ data, phone }) => {
  const bg = data.backgroundImage?.asset?.url;
  const bgVideo = data.backgroundVideo?.asset?.url;

  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-35"
        />
      )}
      {/* Optional and off by default. Ad traffic is overwhelmingly mobile on
          cellular, so this only loads when someone has explicitly chosen it,
          and never for reduced-motion or save-data visitors. */}
      {bgVideo && (
        <video
          src={bgVideo}
          poster={bg}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-35 motion-reduce:hidden"
        />
      )}
      <div className="absolute inset-0 -z-10 hero-scrim-desktop" aria-hidden="true" />

      <div className="container-x grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
        <div className={data.showForm === false ? "lg:col-span-12" : "lg:col-span-7"}>
          {data.eyebrow && (
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent-500" aria-hidden="true" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-accent-400">
                {data.eyebrow}
              </span>
            </div>
          )}

          <h1 className="mt-4 font-display text-[2rem] font-bold leading-[1.08] text-white sm:text-[2.6rem] lg:text-[3.1rem]">
            {data.heading}
          </h1>

          {data.subheading && (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-navy-100 md:text-lg">
              {data.subheading}
            </p>
          )}

          {data.bullets?.length > 0 && (
            <ul className="mt-7 flex flex-col gap-3">
              {data.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500">
                    <FaCheck className="text-[9px] text-navy-950" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-white sm:text-[15px]">{b}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {data.ctaText && (
              <a href={data.ctaLink || "#lead-form"} className="btn-primary w-full sm:w-auto">
                {data.ctaText}
                <FaArrowRightLong className="text-xs" aria-hidden="true" />
              </a>
            )}
            <a href={telHref(phone)} className="btn-outline w-full sm:w-auto">
              <FaPhone className="text-xs" aria-hidden="true" />
              {phone}
            </a>
          </div>
        </div>

        {data.showForm !== false && (
          <div className="lg:col-span-5" id="lead-form">
            <div className="rounded-xl border border-surface-line bg-white p-6 shadow-widget md:p-7">
              <Form
                heading={data.formHeading || "Free case review"}
                subheading={data.formSubheading}
                submitLabel="Get My Free Case Review"
                source={`Landing page — ${data.heading || "hero"}`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- trust bar */
export const LpTrustBar = ({ data }) => {
  const items = data.items?.filter((i) => i?.value || i?.label) || [];
  if (!items.length) return null;

  return (
    <section className="border-y border-white/10 bg-navy-900">
      <div className="container-x grid grid-cols-2 md:grid-cols-4">
        {items.slice(0, 4).map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className={[
              "px-3 py-5 text-center md:py-6",
              i % 2 === 0 ? "border-r border-white/10" : "",
              i < items.length - 2 ? "border-b border-white/10 md:border-b-0" : "",
              i === 1 ? "md:border-r md:border-white/10" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="font-display text-2xl font-bold text-accent-400 sm:text-3xl">
              {item.value}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-navy-200 sm:text-[11px]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------ proof points */
export const LpProofPoints = ({ data }) => (
  <section className="bg-white">
    <div className="container-x section-y">
      <div className="mx-auto max-w-3xl text-center">
        {data.eyebrow && (
          <div className="flex items-center justify-center gap-3">
            <span className="rule" aria-hidden="true" />
            <span className="eyebrow">{data.eyebrow}</span>
            <span className="rule" aria-hidden="true" />
          </div>
        )}
        {data.heading && <h2 className="h-section mt-5">{data.heading}</h2>}
        {data.description && <p className="lede mt-5">{data.description}</p>}
      </div>

      {data.items?.length > 0 && (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => {
            const Icon = iconMap[item.icon] || FaCheckCircle;
            return (
              <div key={item.title || i} className="card p-6 lg:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-500/12">
                  <Icon className="text-lg text-accent-600" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </section>
);

/* ------------------------------------------------------------------- steps */
export const LpSteps = ({ data }) => (
  <section className="bg-surface-alt">
    <div className="container-x section-y">
      <div className="mx-auto max-w-3xl text-center">
        {data.eyebrow && (
          <div className="flex items-center justify-center gap-3">
            <span className="rule" aria-hidden="true" />
            <span className="eyebrow">{data.eyebrow}</span>
            <span className="rule" aria-hidden="true" />
          </div>
        )}
        {data.heading && <h2 className="h-section mt-5">{data.heading}</h2>}
      </div>

      {data.steps?.length > 0 && (
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {data.steps.map((step, i) => (
            <li key={step.title || i} className="rounded-xl border border-surface-line bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-bold text-accent-400">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  </section>
);

/* ------------------------------------------------------------ testimonials */
export const LpTestimonials = ({ data }) => {
  const items = data.testimonials?.filter(Boolean) || [];
  if (!items.length) return null;

  return (
    <section className="bg-white">
      <div className="container-x section-y">
        <div className="mx-auto max-w-3xl text-center">
          {data.eyebrow && (
            <div className="flex items-center justify-center gap-3">
              <span className="rule" aria-hidden="true" />
              <span className="eyebrow">{data.eyebrow}</span>
              <span className="rule" aria-hidden="true" />
            </div>
          )}
          {data.heading && <h2 className="h-section mt-5">{data.heading}</h2>}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t._id} className="flex flex-col rounded-xl border border-surface-line bg-white p-7 shadow-card">
              <FaQuoteLeft className="text-2xl text-accent-500/35" aria-hidden="true" />
              <blockquote className="mt-5 flex-1">
                <p className="text-[15px] leading-relaxed text-ink-muted">{t.testimonial}</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-surface-line pt-5">
                <div className="flex justify-center gap-1" role="img" aria-label={`${t.rating || 5} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${i < (t.rating || 5) ? "text-accent-500" : "text-surface-line"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-3 text-center font-sans text-sm font-bold text-navy-900">{t.name}</p>
                {t.role && <p className="text-center text-xs text-ink-soft">{t.role}</p>}
              </figcaption>
            </figure>
          ))}
        </div>

        {data.disclaimer && (
          <p className="mt-8 text-center text-xs text-ink-soft">{data.disclaimer}</p>
        )}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------- video
   Click-to-play by default: the file is only downloaded when a visitor asks
   for it, so the page still loads fast for the majority who won't. */
export const LpVideo = ({ data, phone }) => {
  const [playing, setPlaying] = useState(Boolean(data.autoplay));

  const src = data.video?.asset?.url || "/assets/videos/turuchi-law-firm-film.mp4";
  const poster = data.poster?.asset?.url || "/assets/videos/film-poster.jpg";
  const portrait = data.orientation !== "landscape";

  return (
    <section className="bg-navy-900">
      <div className="container-x section-y">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Copy */}
          <div className="lg:col-span-6">
            {data.eyebrow && (
              <div className="flex items-center gap-3">
                <span className="rule" aria-hidden="true" />
                <span className="eyebrow-on-dark">{data.eyebrow}</span>
              </div>
            )}
            {data.heading && <h2 className="h-section-on-dark mt-4">{data.heading}</h2>}
            {data.description && <p className="lede-on-dark mt-5">{data.description}</p>}

            {data.bullets?.length > 0 && (
              <ul className="mt-7 flex flex-col gap-3">
                {data.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500">
                      <FaCheck className="text-[9px] text-navy-950" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-white sm:text-[15px]">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {data.ctaText && (
              <a href={data.ctaLink || "#lead-form"} className="btn-primary mt-8 w-full sm:w-auto">
                {data.ctaText}
                <FaArrowRightLong className="text-xs" aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Player */}
          <div className="lg:col-span-6">
            <div
              className={`relative mx-auto overflow-hidden rounded-2xl border border-white/15 bg-navy-950 shadow-widget ${
                portrait ? "max-w-[330px]" : "max-w-full"
              }`}
            >
              {playing ? (
                <video
                  src={src}
                  poster={poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className={`w-full ${portrait ? "aspect-[9/16]" : "aspect-video"} object-cover`}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Play video"
                  className="group relative block w-full"
                >
                  <img
                    src={poster}
                    alt=""
                    aria-hidden="true"
                    className={`w-full ${portrait ? "aspect-[9/16]" : "aspect-video"} object-cover`}
                  />
                  <span className="absolute inset-0 bg-navy-950/25" aria-hidden="true" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3.5">
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-500">
                      <span className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" aria-hidden="true" />
                      <FaPlay className="relative ml-1 text-lg text-white transition-colors group-hover:text-navy-950" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-navy-950/70 px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      Watch
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------------------------------------------- FAQ */
export const LpFaq = ({ data }) => {
  const [open, setOpen] = useState(0);
  const items = data.items?.filter((i) => i?.question) || [];
  if (!items.length) return null;

  return (
    <section className="bg-surface-alt">
      <div className="container-x section-y">
        <div className="mx-auto max-w-3xl">
          <h2 className="h-section text-center">{data.heading || "Common questions"}</h2>

          <div className="mt-10 divide-y divide-surface-line border-y border-surface-line">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={`font-sans text-[15px] font-semibold md:text-base ${
                        isOpen ? "text-accent-600" : "text-navy-900"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                        isOpen
                          ? "border-accent-500 bg-accent-500 text-navy-950"
                          : "border-surface-line text-navy-700"
                      }`}
                    >
                      {isOpen ? <FaMinus className="text-[10px]" /> : <FaPlus className="text-[10px]" />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink-muted">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------------------------------------------------- rich text */
export const LpRichText = ({ data }) => (
  <section className="bg-white">
    <div className="container-x section-y">
      <div className="mx-auto max-w-prose2">
        {data.eyebrow && (
          <div className="flex items-center gap-3">
            <span className="rule" aria-hidden="true" />
            <span className="eyebrow">{data.eyebrow}</span>
          </div>
        )}
        {data.heading && <h2 className="h-section mt-4">{data.heading}</h2>}
        <div className="legal-doc mt-6 max-w-none">
          {data.body?.length > 0 && <PortableText value={data.body} />}
        </div>
      </div>
    </div>
  </section>
);

/* --------------------------------------------------------------------- CTA */
export const LpCta = ({ data, phone }) => (
  <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
    <div className="container-x section-y text-center">
      <h2 className="h-section-on-dark mx-auto max-w-3xl">{data.heading}</h2>
      {data.description && <p className="lede-on-dark mx-auto mt-5 max-w-2xl">{data.description}</p>}

      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {data.ctaText && (
          <a href={data.ctaLink || "#lead-form"} className="btn-primary w-full sm:w-auto">
            {data.ctaText}
            <FaArrowRightLong className="text-xs" aria-hidden="true" />
          </a>
        )}
        {data.showPhone !== false && (
          <a href={telHref(phone)} className="btn-outline w-full sm:w-auto">
            <FaPhone className="text-xs" aria-hidden="true" />
            {phone}
          </a>
        )}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------- form */
export const LpForm = ({ data }) => (
  <section className="bg-surface-alt" id="lead-form">
    <div className="container-x section-y">
      <div className="mx-auto max-w-2xl text-center">
        {data.eyebrow && (
          <div className="flex items-center justify-center gap-3">
            <span className="rule" aria-hidden="true" />
            <span className="eyebrow">{data.eyebrow}</span>
            <span className="rule" aria-hidden="true" />
          </div>
        )}
        {data.heading && <h2 className="h-section mt-5">{data.heading}</h2>}
        {data.description && <p className="lede mt-5">{data.description}</p>}
      </div>

      <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-surface-line bg-white p-6 shadow-card md:p-8">
        <Form
          heading={data.formHeading || "Request a free case review"}
          subheading={data.formSubheading}
          submitLabel="Get My Free Case Review"
          source={`Landing page — ${data.heading || "form section"}`}
        />
      </div>
    </div>
  </section>
);

export const SECTION_COMPONENTS = {
  lpHero: LpHero,
  lpTrustBar: LpTrustBar,
  lpProofPoints: LpProofPoints,
  lpSteps: LpSteps,
  lpTestimonials: LpTestimonials,
  lpVideo: LpVideo,
  lpFaq: LpFaq,
  lpRichText: LpRichText,
  lpCta: LpCta,
  lpForm: LpForm,
};
