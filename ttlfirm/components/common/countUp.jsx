"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "@components/common/reveal";

/**
 * Counts a statistic up when it scrolls into view.
 *
 * Takes the finished string the CMS holds — "500+", "$0", "24/7", "98%" — and
 * animates only the first run of digits in it, so an editor never has to think
 * about prefixes and suffixes. Everything around the number passes through
 * untouched.
 *
 * The old version counted with setInterval from 1, at a fixed millisecond
 * step: 500 cases took five seconds at 10ms and the number was still climbing
 * long after the visitor had scrolled past. This runs on requestAnimationFrame
 * for a fixed duration regardless of how large the number is, eases out so it
 * settles rather than stopping dead, and only starts once the strip is
 * actually on screen.
 *
 * It renders the FINAL figure on the server and only drops to zero in a layout
 * effect — before the browser paints, so there is no flash. That ordering
 * matters: if the bundle never runs, the visitor sees "500+", not "0+". A
 * headline statistic must never depend on JavaScript.
 */
const DURATION = 1400;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// useLayoutEffect warns when it runs during server rendering; it never does.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const CountUp = ({ value, duration = DURATION, className = "" }) => {
  const raw = String(value ?? "");
  const match = raw.match(/\d[\d,]*/);

  // Starts as soon as the figure appears. A stricter threshold left a visible
  // "0+" sitting at the bottom of the hero on a short desktop window.
  const [ref, inView] = useInView({ rootMargin: "0px 0px -24px 0px" });
  const [display, setDisplay] = useState(raw);
  const frame = useRef(0);

  useIsomorphicLayoutEffect(() => {
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (Number(match[0].replace(/,/g, "")) === 0) return; // "$0" has nowhere to climb
    setDisplay(raw.replace(match[0], "0"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  useEffect(() => {
    if (!match || !inView) return;

    const target = Number(match[0].replace(/,/g, ""));
    const grouped = match[0].includes(",");
    const settle = () => setDisplay(raw); // land on the CMS string exactly

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !target) {
      settle();
      return;
    }

    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const n = Math.round(easeOut(t) * target);
      setDisplay(raw.replace(match[0], grouped ? n.toLocaleString("en-US") : String(n)));
      if (t < 1) frame.current = requestAnimationFrame(step);
      else settle();
    };
    frame.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame.current);
    // `match` is derived from `raw`, so `raw` is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, raw, duration]);

  return (
    <span ref={ref} className={className}>
      {/* Screen readers get the final figure, never the ticking one. */}
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{raw}</span>
    </span>
  );
};

export default CountUp;
