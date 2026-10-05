"use client";
import AmbientVideo from "@components/common/ambientVideo";
import ImageLoop from "@components/common/imageLoop";
import { useFilm } from "@components/common/filmPlayer";

// Three stills from the same shoot, so "Show a wide photo instead" looks like
// a finished hero the moment it is switched on, before anyone has uploaded
// anything. Adding photos in the Studio replaces this list entirely.
const DEFAULT_DESKTOP_IMAGES = [
  "/assets/videos/hero-backdrop-wide.jpg",
  "/assets/videos/hero-backdrop-wide-2.jpg",
  "/assets/videos/hero-backdrop-wide-3.jpg",
];

/**
 * Hero background.
 *
 * There are two masters, because a phone viewport and a desktop viewport want
 * opposite crops of the same shoot:
 *
 *  - Under `lg` — the PORTRAIT loop (9:16). A phone is itself portrait, so it
 *    fills the hero edge to edge with almost no cropping.
 *  - At `lg` and up — the LANDSCAPE loop (3:2), full bleed, no blur, no opacity
 *    trick, under a deliberately light scrim (`.hero-scrim-film` in
 *    global.css). A hero video you cannot see is not a hero video.
 *
 * `desktopMode` decides what desktop gets:
 *
 *    "video"  the landscape loop (default)
 *    "image"  photographs instead — one is a still, several cross-fade on a
 *             timer (imageLoop.jsx). This is the escape hatch for whenever the
 *             wide footage on hand is the wrong shape or too soft for full
 *             bleed: the firm can put three or four good stills in the Studio
 *             and still get a hero with movement in it.
 *
 * Everything to do with reduced motion, Save Data and slow connections lives in
 * ambientVideo.jsx and imageLoop.jsx, so there is one rule rather than four.
 */
const HeroMedia = ({
  // ------------------------------------------------------ phones / tablets
  videoSrc = "/assets/videos/hero-loop.mp4",
  posterSrc = "/assets/videos/hero-poster.jpg",

  // ------------------------------------------------------------- desktop
  desktopMode = "video",
  desktopVideoSrc = "/assets/videos/hero-loop-wide.mp4",
  desktopVideoSmoothLoop = false,
  desktopVideoStart,
  desktopVideoEnd,
  desktopPosterSrc = "/assets/videos/hero-poster-wide.jpg",
  desktopImages,
  desktopImageSeconds = 6,

  /** A single still from the CMS that replaces the background everywhere. */
  imageSrc,
}) => {
  // While the film is open, the background stops: two clips of the same person
  // moving at once, one of them with sound, is confusing.
  const { isOpen: filmOpen } = useFilm();

  const photos = desktopImages?.length ? desktopImages : DEFAULT_DESKTOP_IMAGES;

  const mobileVideo = imageSrc ? null : videoSrc;
  const showDesktopPhotos = Boolean(imageSrc) || desktopMode === "image";

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-navy-950">
      {/* ---------------------------------------------- phones: portrait loop */}
      <div className="absolute inset-0 lg:hidden">
        <AmbientVideo src={mobileVideo} poster={imageSrc || posterSrc} eager paused={filmOpen} />
        <div className="absolute inset-0 hero-scrim-mobile" aria-hidden="true" />
      </div>

      {/* ------------------------------------ desktop: landscape loop or photos */}
      <div className="absolute inset-0 hidden lg:block">
        {showDesktopPhotos ? (
          <ImageLoop
            images={imageSrc ? [imageSrc] : photos}
            intervalMs={Math.max(2500, (Number(desktopImageSeconds) || 6) * 1000)}
          />
        ) : (
          <AmbientVideo
            src={desktopVideoSrc}
            poster={desktopPosterSrc}
            eager
            smoothLoop={desktopVideoSmoothLoop}
            clipStart={desktopVideoStart}
            clipEnd={desktopVideoEnd}
            paused={filmOpen}
          />
        )}
        <div className="absolute inset-0 hero-scrim-film" aria-hidden="true" />
      </div>

      {/* Bottom fade into the next section. */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-950/90 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

export default HeroMedia;
