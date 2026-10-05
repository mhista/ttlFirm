"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Scroll reveal.
 *
 * A ~40-line IntersectionObserver replaces the AOS dependency that used to do
 * this: AOS ships its own stylesheet, needs a client-side init, re-measures on
 * every resize, and animates by mutating inline styles — all of which fights
 * the App Router. This does the same job with one class toggle.
 *
 * Rules of use:
 *  - reveal once, never on the way back up (a section that re-animates every
 *    scroll pass reads as a glitch, not a flourish)
 *  - reduced-motion visitors get the finished state immediately, handled in
 *    CSS so there is no flash
 *  - if IntersectionObserver is missing, everything is visible — a failed
 *    animation must never hide content on a page that sells legal services
 *
 * <Reveal>            wraps children in a div
 * <Reveal as="li">    when the parent needs a specific child element
 * <Reveal delay={90}> staggers a row of cards
 */
/**
 * `threshold: 0` with a negative bottom margin, rather than a percentage
 * threshold: a section taller than the viewport can never show 15% of itself
 * on a phone, and would sit invisible forever. This fires once ~80px of the
 * element has entered, whatever its height.
 */
export function useInView({ threshold = 0, rootMargin = "0px 0px -80px 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    // Already on screen at mount (above the fold) — show it without waiting
    // for a scroll event that may never come.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

const Reveal = ({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) => {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
