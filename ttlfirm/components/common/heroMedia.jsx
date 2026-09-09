"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Hero background.
 *
 * The firm's film is shot PORTRAIT (9:16). That plays two different ways:
 *
 *  - Under `lg`, the viewport is itself portrait, so the film fills the hero
 *    edge to edge with almost no cropping. It is the background.
 *  - At `lg` and up, cropping a 9:16 source into a ~2:1 hero would show a
 *    narrow horizontal band of the middle of the frame — so the background
 *    there is a still from the same footage, heavily scrimmed, and the film
 *    itself is presented in a framed vertical player beside the copy
 *    (see components/common/filmPlayer.jsx).
 *
 * The video is skipped entirely for reduced-motion, save-data and 2G.
 */
const HeroMedia = ({
  videoSrc = "/assets/videos/hero-loop.mp4",
  posterSrc = "/assets/videos/hero-poster.jpg",
  backdropSrc = "/assets/videos/hero-backdrop.jpg",
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
    el.play().catch(() => setShowVideo(false));
  }, [showVideo]);

  const still = imageSrc || posterSrc;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-navy-950">
      {/* ---------------------------------------------- mobile / tablet: film */}
      <div className="absolute inset-0 lg:hidden">
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
        <div className="absolute inset-0 hero-scrim-mobile" aria-hidden="true" />
      </div>

      {/* ------------------------------------------------ desktop: still + ink */}
      <div className="absolute inset-0 hidden lg:block">
        <img
          src={backdropSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 hero-scrim-desktop" aria-hidden="true" />
      </div>

      {/* Bottom fade into the next section. */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/95 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

export default HeroMedia;
