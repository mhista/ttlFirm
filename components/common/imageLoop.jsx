"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A background that cross-fades through a set of photographs.
 *
 * This is the alternative to a background video: the firm can put three or four
 * good stills into the Studio and get movement in the hero without needing
 * footage of the right shape and resolution. One image and it is simply a
 * still — no timer is started, nothing animates.
 *
 * How it behaves, and why:
 *
 *  - Every image is in the DOM from the start and switched by opacity, not by
 *    swapping a `src`. Swapping the source makes the browser fetch mid-fade and
 *    the first cycle flashes white on a slow connection.
 *  - Only the first image is eager; the rest are lazy. The hero paints on the
 *    first one alone, and the others arrive during the six seconds before they
 *    are needed.
 *  - The timer stops while the tab is hidden. A slideshow running in a
 *    background tab is pure battery cost, and coming back to a half-finished
 *    fade looks broken.
 *  - `prefers-reduced-motion` gets the first image and no timer at all. A
 *    cross-fade every few seconds is exactly the kind of unrequested movement
 *    that setting exists to stop.
 *
 * The slow scale is 8% over the full dwell, which is enough to read as life in
 * the frame and not enough to notice as an effect.
 */
const ImageLoop = ({
  images = [],
  /** Seconds each photograph is held before the fade to the next begins. */
  intervalMs = 6000,
  className = "",
  imgClassName = "",
}) => {
  const list = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (list.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setAnimate(true);

    const dwell = Math.max(2500, intervalMs);
    const tick = () => setIndex((i) => (i + 1) % list.length);

    const start = () => {
      stop();
      timer.current = setInterval(tick, dwell);
    };
    const stop = () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [list.length, intervalMs]);

  if (!list.length) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {list.map((src, i) => {
        const active = i === index;
        return (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            className={[
              "absolute inset-0 h-full w-full object-cover object-center",
              "transition-opacity duration-[1200ms] ease-out",
              active ? "opacity-100" : "opacity-0",
              // The scale is applied to the one on screen and reset on the
              // others, so each photograph starts its drift from the same place
              // rather than continuing where it left off.
              animate ? "transition-[opacity,transform]" : "",
              animate && active ? "scale-105" : "scale-100",
              imgClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              animate
                ? { transitionDuration: `1200ms, ${Math.max(2500, intervalMs) + 1200}ms` }
                : undefined
            }
          />
        );
      })}
    </div>
  );
};

export default ImageLoop;
