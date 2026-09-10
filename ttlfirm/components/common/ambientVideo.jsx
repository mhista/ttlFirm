"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A muted, looping video used purely as a background layer.
 *
 * Shared by the homepage hero and the landing page heroes so there is one place
 * that decides when a background video is allowed to play:
 *
 *  - never for `prefers-reduced-motion`
 *  - never on Save Data, or on a connection reporting 2G / slow-2G — ad traffic
 *    is overwhelmingly mobile on cellular, and a background flourish is not
 *    worth a megabyte of someone's data plan
 *  - never before the element is on screen, so a hero further down a landing
 *    page costs nothing until it is reached
 *
 * The still is always rendered underneath. The video fades in over it once it
 * can actually play, which means a slow or failed load degrades to the poster
 * instead of to a black box.
 *
 * ----------------------------------------------------------------- LOOPING
 *
 * The file shipped with the site was cut to loop seamlessly. Anything uploaded
 * through the Studio will not have been: it will be the whole film, with a hard
 * cut back to the first frame every time it reaches the end, and very likely
 * with a title card or a dark stretch somewhere in it.
 *
 * `smoothLoop` handles that in the browser, so nobody has to re-encode
 * anything:
 *
 *  - `clipStart` / `clipEnd` play only a chosen stretch of the file. The good
 *    fifteen seconds of a two-minute film can be used without touching it.
 *  - Two video elements share the source. As the visible one approaches the end
 *    of the clip, the other is seeked back to the start, started, and faded in
 *    over it. What would be a hard cut becomes a dissolve, which is what makes
 *    a background loop stop announcing itself.
 *
 * The second element only decodes during the ~0.9s handover, and `smoothLoop`
 * is off by default — the shipped file does not need it.
 */
const FADE_MS = 900;

const AmbientVideo = ({
  src,
  poster,
  /** Extra classes for the <video> and the still — usually opacity and filters. */
  videoClassName = "",
  stillClassName = "",
  /** Skip the in-view wait for a hero that is above the fold anyway. */
  eager = false,
  /** Cross-fade the loop point instead of cutting. For arbitrary uploads. */
  smoothLoop = false,
  /** Play only this stretch of the file, in seconds. */
  clipStart = 0,
  clipEnd,
  /** Stop while something else is playing — the film modal, for one. */
  paused = false,
}) => {
  const hostRef = useRef(null);
  const videoRefs = [useRef(null), useRef(null)];
  const frame = useRef(0);
  const swapping = useRef(false);

  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(eager);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);

  const start = Math.max(0, Number(clipStart) || 0);
  const manual = smoothLoop || start > 0 || Number(clipEnd) > 0;

  /* ------------------------------------------------------------ permission */
  useEffect(() => {
    if (!src) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = connection?.saveData === true;
    const slowNetwork = ["slow-2g", "2g"].includes(connection?.effectiveType);

    if (reducedMotion || saveData || slowNetwork) return;
    setAllowed(true);
  }, [src]);

  /* --------------------------------------------------------------- in view */
  useEffect(() => {
    if (eager || visible) return;
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, visible]);

  /* ------------------------------------------------------------ play/pause
     One effect owns which element is running, so a resume can never leave the
     hidden one decoding in the background.

     `autoplay muted playsInline` is what actually starts this in almost every
     browser; the explicit play() is a nudge for the ones that need it after a
     route change. If it is refused (a low-power-mode iPhone, a strict autoplay
     policy) the still stays on top rather than the video being unmounted — the
     browser may well start it a moment later on its own.

     `paused` comes from the film modal: two clips of the same person moving at
     once, one of them with sound, is confusing, and it is wasted decoding. */
  useEffect(() => {
    if (!allowed || !visible) return;

    videoRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;

      if (paused) {
        if (!el.paused) el.pause();
        return;
      }
      if (i === active) {
        el.play().catch(() => setReady(false));
        return;
      }
      // Mid-handover the outgoing element has to keep running — it is still on
      // screen, fading out. The loop's own timer stops it when the fade ends.
      if (!swapping.current && !el.paused) el.pause();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowed, visible, paused, active]);

  const endOf = useCallback(
    (el) => {
      const wanted = Number(clipEnd);
      const duration = Number.isFinite(el?.duration) ? el.duration : 0;
      if (wanted > 0 && (!duration || wanted < duration)) return wanted;
      return duration;
    },
    [clipEnd]
  );

  /* ------------------------------------------------------- the loop itself */
  useEffect(() => {
    if (!manual || !allowed || !visible || paused) return;

    const watch = () => {
      frame.current = requestAnimationFrame(watch);

      const current = videoRefs[active].current;
      if (!current || current.paused || swapping.current) return;

      const end = endOf(current);
      if (!end || current.currentTime < end - FADE_MS / 1000) return;

      const next = videoRefs[active === 0 ? 1 : 0].current;
      if (!next) {
        current.currentTime = start; // no partner: fall back to a plain jump
        return;
      }

      swapping.current = true;
      try {
        next.currentTime = start;
      } catch {
        /* seeking before metadata — the next frame will retry */
      }
      next
        .play()
        .then(() => setActive((i) => (i === 0 ? 1 : 0)))
        .catch(() => {
          current.currentTime = start;
          swapping.current = false;
        });

      window.setTimeout(() => {
        current.pause();
        try {
          current.currentTime = start;
        } catch {
          /* ignore */
        }
        swapping.current = false;
      }, FADE_MS);
    };

    frame.current = requestAnimationFrame(watch);
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manual, allowed, visible, paused, active, start, endOf]);

  /* Seek to the clip start once metadata is in, for whichever element it is. */
  const onLoadedMetadata = (i) => () => {
    if (!manual || !start) return;
    const el = videoRefs[i].current;
    if (el && el.currentTime < start) {
      try {
        el.currentTime = start;
      } catch {
        /* ignore */
      }
    }
  };

  const showVideo = Boolean(src) && allowed && visible;
  const layers = manual ? [0, 1] : [0];

  return (
    <div ref={hostRef} className="absolute inset-0">
      {poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            ready ? "opacity-0" : "opacity-100"
          } ${stillClassName}`}
        />
      )}

      {showVideo &&
        layers.map((i) => (
          <video
            key={i}
            ref={videoRefs[i]}
            src={src}
            poster={poster}
            autoPlay={i === 0}
            muted
            loop={!manual}
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onLoadedMetadata={onLoadedMetadata(i)}
            onCanPlay={() => i === 0 && setReady(true)}
            onPlaying={() => setReady(true)}
            className={[
              "absolute inset-0 h-full w-full object-cover object-center",
              // Written out rather than interpolated from FADE_MS: Tailwind
              // scans source text, so a template literal produces no class.
              // Keep the two in step if either changes.
              "transition-opacity duration-[900ms]",
              manual
                ? active === i && ready
                  ? "opacity-100"
                  : "opacity-0"
                : ready
                  ? "opacity-100"
                  : "opacity-0",
              videoClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
    </div>
  );
};

export default AmbientVideo;
