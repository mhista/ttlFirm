"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Background media for the hero.
 *
 * - Renders the poster image immediately, so there is never an empty navy
 *   box while the video buffers.
 * - Loads the video only after mount, and skips it entirely when the visitor
 *   has asked for reduced motion or is on a metered/slow connection — a
 *   personal-injury site gets a lot of mobile traffic on cellular data.
 * - `playsInline` + `muted` are what allow autoplay on iOS at all.
 */
const HeroMedia = ({
  videoSrc = "/assets/video/hero-placeholder.mp4",
  posterSrc = "/assets/video/hero-poster.jpg",
  imageSrc,
}) => {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (imageSrc || !videoSrc) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = connection?.saveData === true;
    const slowNetwork = ["slow-2g", "2g"].includes(connection?.effectiveType);

    if (reducedMotion || saveData || slowNetwork) return;
    setShowVideo(true);
  }, [videoSrc, imageSrc]);

  useEffect(() => {
    if (!showVideo) return;
    const el = videoRef.current;
    if (!el) return;
    // Some browsers reject the autoplay promise; the poster stays up and
    // nothing breaks.
    el.play().catch(() => setShowVideo(false));
  }, [showVideo]);

  const still = imageSrc || posterSrc;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-navy-950">
      {/* Poster / still */}
      <img
        src={still}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />

      {showVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
        />
      )}

      {/* Scrim: navy on the left where the copy sits, opening up on the right
          so the imagery still reads. Flat and heavier on small screens. */}
      <div className="absolute inset-0 hero-scrim-mobile md:hidden" aria-hidden="true" />
      <div className="absolute inset-0 hidden hero-scrim md:block" aria-hidden="true" />
      {/* Bottom fade into the next section. */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/90 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

export default HeroMedia;
