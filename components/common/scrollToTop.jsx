"use client";
import { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa6";

/**
 * Back-to-top control.
 * Anchored bottom-LEFT so it no longer sits underneath the Text Us widget,
 * and rendered as a real <button> so it is reachable by keyboard.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setIsVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 left-4 z-[80] flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-navy-900 text-white shadow-widget transition-all duration-300 hover:bg-navy-800 sm:bottom-6 sm:left-6 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <FaAngleUp className="text-lg" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
