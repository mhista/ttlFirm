"use client";
import { useEffect, useRef, useState, createContext, useContext, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaPlay, FaXmark } from "react-icons/fa6";

// Shipped defaults. Anything uploaded in Sanity (Homepage → Hero Video &
// Images) is passed down as props and wins over these.
const DEFAULT_FILM = "/assets/videos/turuchi-law-firm-film.mp4";
const DEFAULT_FILM_POSTER = "/assets/videos/film-poster.jpg";
const DEFAULT_LOOP = "/assets/videos/hero-loop.mp4";
const DEFAULT_LOOP_POSTER = "/assets/videos/hero-poster.jpg";

/* ------------------------------------------------------------------ context
   Lets the hero's "Watch our film" button and the framed card open the same
   modal, each supplying its own source. */
const FilmContext = createContext(null);
export const useFilm = () => useContext(FilmContext) || { open: () => {} };

export const FilmProvider = ({ children }) => {
  const [source, setSource] = useState(null);

  const open = useCallback((next) => {
    setSource({
      src: next?.src || DEFAULT_FILM,
      poster: next?.poster || DEFAULT_FILM_POSTER,
    });
  }, []);

  return (
    <FilmContext.Provider value={{ open }}>
      {children}
      <FilmModal source={source} onClose={() => setSource(null)} />
    </FilmContext.Provider>
  );
};

/* -------------------------------------------------------------------- modal
   The full film, sound on, native controls. It is portrait, so the dialog is
   sized against viewport height rather than width. */
const FilmModal = ({ source, onClose }) => {
  const videoRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!source) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    const el = videoRef.current;
    if (el) {
      el.currentTime = 0;
      el.muted = false;
      el.volume = 1;
      // Autoplay with sound can be refused; the controls are right there.
      el.play().catch(() => {});
    }

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      if (el) el.pause();
    };
  }, [source, onClose]);

  if (!mounted || !source) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="The Turuchi Law Firm — film"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-950/92 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={source.src}
          poster={source.poster}
          controls
          playsInline
          preload="metadata"
          className="max-h-[82vh] w-auto max-w-full rounded-xl bg-black shadow-widget"
        />
        <button
          type="button"
          onClick={onClose}
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/10"
        >
          <FaXmark aria-hidden="true" /> Close
        </button>
      </div>
    </div>,
    document.body
  );
};

/* --------------------------------------------------------------- play button
   Used in the hero action row. */
export const WatchFilmButton = ({ className = "", label = "Watch our film", film }) => {
  const { open } = useFilm();
  return (
    <button
      type="button"
      onClick={() => open(film)}
      className={`group inline-flex min-h-[48px] items-center gap-3 ${className}`}
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/35 transition-colors group-hover:border-accent-400 group-hover:bg-accent-500">
        <span className="absolute inset-0 rounded-full bg-white/15 animate-pulse-ring" aria-hidden="true" />
        <FaPlay className="relative ml-0.5 text-[11px] text-white transition-colors group-hover:text-navy-950" aria-hidden="true" />
      </span>
      <span className="text-left font-sans text-sm font-semibold uppercase tracking-wider text-white transition-colors group-hover:text-accent-400">
        {label}
      </span>
    </button>
  );
};

/* ----------------------------------------------------------------- the card
   Desktop-only framed vertical player. The firm's footage is 9:16, so it gets
   a portrait frame rather than being cropped to a strip inside a wide hero. */
export const FilmCard = ({ film, label = "Watch our film" }) => {
  const { open } = useFilm();
  const videoRef = useRef(null);

  const loopSrc = film?.loop || DEFAULT_LOOP;
  const loopPoster = film?.loopPoster || DEFAULT_LOOP_POSTER;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-950 shadow-widget">
        <video
          ref={videoRef}
          src={loopSrc}
          poster={loopPoster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="aspect-[9/16] w-full object-cover"
        />

        {/* Soft vignette so the play control always has something to sit on. */}
        <div className="pointer-events-none absolute inset-0 bg-navy-950/25" />

        {/* Centred, so it never collides with the Text Us widget pinned to the
            bottom-right corner of the viewport. */}
        <button
          type="button"
          onClick={() => open(film)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3.5 p-6 text-center"
          aria-label="Watch the full film"
        >
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-500">
            <span className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" aria-hidden="true" />
            <FaPlay className="relative ml-1 text-lg text-white transition-colors group-hover:text-navy-950" aria-hidden="true" />
          </span>
          <span className="rounded-full bg-navy-950/70 px-3.5 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {label}
          </span>
        </button>
      </div>

      <div
        className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-28 w-28 rounded-2xl border-[6px] border-accent-500/30"
        aria-hidden="true"
      />
    </div>
  );
};

export default FilmProvider;
