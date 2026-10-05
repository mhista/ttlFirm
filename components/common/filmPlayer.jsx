"use client";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  createContext,
  useContext,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { FaPlay, FaXmark } from "react-icons/fa6";

// Shipped defaults. Anything uploaded in Sanity (Homepage → Hero Video &
// Images) is passed down as props and wins over these.
const DEFAULT_FILM = "/assets/videos/turuchi-law-firm-film.mp4";
const DEFAULT_FILM_POSTER = "/assets/videos/film-poster.jpg";
const DEFAULT_LOOP_POSTER = "/assets/videos/hero-poster.jpg";

/* ------------------------------------------------------------------ context
   Lets the hero's "Watch our film" button and the framed card open the same
   modal, each supplying its own source. */
const FilmContext = createContext(null);
export const useFilm = () => useContext(FilmContext) || { open: () => {}, isOpen: false };

export const FilmProvider = ({ children }) => {
  const [source, setSource] = useState(null);

  const open = useCallback((next) => {
    setSource({
      src: next?.src || DEFAULT_FILM,
      poster: next?.poster || DEFAULT_FILM_POSTER,
    });
  }, []);

  const close = useCallback(() => setSource(null), []);

  // `isOpen` is published so the hero can stop its background loop while the
  // film is playing. Two videos of the same person moving at once, one of them
  // with sound, is confusing — and it is wasted decoding besides.
  const value = useMemo(() => ({ open, close, isOpen: Boolean(source) }), [open, close, source]);

  return (
    <FilmContext.Provider value={value}>
      {children}
      <FilmModal source={source} onClose={close} />
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

  const loopPoster = film?.loopPoster || DEFAULT_LOOP_POSTER;

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-navy-950 shadow-widget">
        {/* Paused by default, on purpose. With the wide loop already running
            behind the copy, a second silent clip of the same person playing
            beside it read as two videos competing. This is the still — press
            it and the film opens with sound, and the background stops. It is
            an <img> rather than a paused <video> so the file is never
            downloaded by someone who does not ask for it. */}
        <img
          src={loopPoster}
          alt=""
          aria-hidden="true"
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

/* ------------------------------------------------------------- the portrait
   Her studio photograph with the film behind it.

   The client asked for her picture on both the homepage and the landing pages.
   Rather than adding a photo next to a player — two pictures of the same
   person, side by side — the photograph IS the player: a 4:5 portrait with the
   play control in the corner. You see her face first, which is the point of a
   "meet your attorney" block, and the film is one press away.

   4:5 rather than 9:16 because a studio headshot is framed for print, and
   cropping it to a phone-video shape cuts the shoulders off. */
export const PortraitPlayer = ({
  film,
  src,
  alt = "",
  name,
  role,
  label = "Watch our film",
}) => {
  const { open } = useFilm();
  if (!src) return null;

  return (
    <figure className="relative mx-auto w-full max-w-[380px]">
      <div className="relative overflow-hidden rounded-2xl border border-surface-line bg-navy-950 shadow-card">
        <img src={src} alt={alt || name || ""} className="aspect-[4/5] w-full object-cover" />

        {/* Reads as part of the photograph rather than a badge stuck on it. */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950/85 to-transparent"
          aria-hidden="true"
        />

        {/* Top right, not bottom right: the name and title sit along the
            bottom edge, and at this width they wrap into it. */}
        <button
          type="button"
          onClick={() => open(film)}
          aria-label={label}
          className="group absolute right-4 top-4 flex items-center gap-2.5 rounded-full bg-navy-950/70 py-2 pl-2 pr-4 backdrop-blur-sm transition-colors hover:bg-accent-500"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-navy-950/20">
            <span
              className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring"
              aria-hidden="true"
            />
            <FaPlay
              className="relative ml-0.5 text-[11px] text-white transition-colors group-hover:text-navy-950"
              aria-hidden="true"
            />
          </span>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors group-hover:text-navy-950">
            {label}
          </span>
        </button>

        {(name || role) && (
          <figcaption className="pointer-events-none absolute inset-x-5 bottom-5">
            {name && (
              <span className="block font-display text-[17px] font-semibold leading-tight text-white">
                {name}
              </span>
            )}
            {role && (
              <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-400">
                {role}
              </span>
            )}
          </figcaption>
        )}
      </div>

      <div
        className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-28 w-28 rounded-2xl border-[6px] border-accent-500/30"
        aria-hidden="true"
      />
    </figure>
  );
};

/* ------------------------------------------------------------------ the tile
   A grid-cell-shaped version of the card, for dropping into a row of feature
   cards. "Why Trust Us" runs five features in a three-across grid, which left
   an empty sixth cell; this fills it with the one thing a visitor might
   actually want next, in the same glass frame as its neighbors.

   Deliberately an image and a button, not a player: this sits well down the
   page, and a second autoplaying video below the hero would cost bandwidth on
   a phone for something almost nobody scrolls to with the sound on. */
export const FilmTile = ({
  film,
  label = "Watch our film",
  heading = "See the firm for yourself",
  description = "Two minutes with Turuchi, outside the courthouse where she works.",
  delay,
}) => {
  const { open } = useFilm();
  const poster = film?.poster || DEFAULT_FILM_POSTER;

  return (
    <button
      type="button"
      onClick={() => open(film)}
      data-aos="fade-up"
      data-aos-delay={delay}
      aria-label={`${label} — ${heading}`}
      className="card-glass group relative flex h-full min-h-[248px] flex-col overflow-hidden p-6 text-left lg:p-7"
    >
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-30 transition-transform duration-700 group-hover:scale-110"
      />
      <span
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-900/40"
        aria-hidden="true"
      />

      <span className="relative flex h-11 w-11 items-center justify-center rounded-lg border border-accent-500/30 bg-accent-500/12 transition-colors duration-300 group-hover:bg-accent-500">
        <span className="absolute inset-0 rounded-lg bg-white/15 animate-pulse-ring" aria-hidden="true" />
        <FaPlay className="relative ml-0.5 text-sm text-accent-400 transition-colors duration-300 group-hover:text-navy-950" aria-hidden="true" />
      </span>

      <span className="relative mt-5 block font-display text-xl font-semibold leading-snug text-white">
        {heading}
      </span>
      <span className="relative mt-3 block text-sm leading-relaxed text-navy-100">
        {description}
      </span>
      <span className="relative mt-auto pt-5 block font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-accent-400">
        {label}
      </span>
    </button>
  );
};

export default FilmProvider;
