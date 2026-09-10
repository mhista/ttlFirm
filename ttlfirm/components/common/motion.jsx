"use client";
import { useEffect } from "react";

/**
 * Attribute-driven scroll animation.
 *
 * The markup in this project already carried `data-aos="fade-up"` attributes
 * from the AOS library, but AOS was never initialised — no stylesheet, no
 * `AOS.init()` — so every one of them was inert and the pages sat completely
 * still. Rather than reintroduce a library that ships its own CSS, re-measures
 * on every resize and animates by mutating inline styles (all of which fights
 * the App Router), this mounts one observer for the whole document and keeps
 * the same attribute names, so existing markup animates unchanged:
 *
 *   <div data-aos="fade-up">                 fade + rise
 *   <div data-aos="fade-down">               fade + descend
 *   <div data-aos="fade-left|fade-right">    fade + slide
 *   <div data-aos="zoom-in">                 fade + settle
 *   <div data-aos="fade">                    fade only
 *   <div data-aos="fade-up" data-aos-delay="120">
 *
 * Elements animate once, on the way down only. The MutationObserver picks up
 * anything React renders later — a carousel slide, a filtered list — without
 * needing a refresh call at each site.
 *
 * React components can use <Reveal> (components/common/reveal.jsx) instead;
 * the two share the same timing and the same reduced-motion behaviour.
 */
const MotionRoot = () => {
  useEffect(() => {
    const root = document.documentElement;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      // Show everything immediately and never hide anything again.
      root.classList.remove("js-motion");
      document.querySelectorAll("[data-aos]").forEach((el) => el.classList.add("aos-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("aos-in");
          io.unobserve(entry.target);
        }
      },
      // threshold 0 rather than a percentage: an element taller than the
      // viewport can never reach a percentage threshold on a phone.
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );

    const register = (el) => {
      if (el.dataset.aosBound) return;
      el.dataset.aosBound = "1";
      const delay = Number(el.dataset.aosDelay);
      if (delay) el.style.transitionDelay = `${delay}ms`;
      io.observe(el);
    };

    const scan = (node) => {
      if (node.nodeType !== 1) return;
      if (node.hasAttribute?.("data-aos")) register(node);
      node.querySelectorAll?.("[data-aos]").forEach(register);
    };

    scan(document.body);

    const mo = new MutationObserver((records) => {
      for (const record of records) record.addedNodes.forEach(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: if anything is still hidden after the page has settled —
    // an element inside a container that never reports an intersection, say —
    // reveal it rather than leave copy invisible.
    const failsafe = setTimeout(() => {
      document.querySelectorAll("[data-aos]:not(.aos-in)").forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) el.classList.add("aos-in");
      });
    }, 1200);

    return () => {
      clearTimeout(failsafe);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
};

export default MotionRoot;
