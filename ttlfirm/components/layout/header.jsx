import Nav from "@/components/layout/nav";
import StickyNav from "@/components/layout/stickyNav";
import HeroMedia from "@components/common/heroMedia";

/**
 * Hero shell: navigation + full-bleed background media + whatever content
 * the page passes in.
 *
 * The previous version hard-coded four different pixel heights
 * (`h-[1250px] sm:h-[660px] ...`) on three stacked absolute layers that had
 * to be kept in sync by hand, and drifted — which is why the sticky nav
 * ended up floating over the middle of the page. Height is now driven by the
 * content with a viewport-based minimum.
 */
const Header = ({ children, videoSrc, posterSrc, imageSrc }) => {
  return (
    <div className="relative isolate flex min-h-[640px] w-full flex-col overflow-hidden bg-navy-950 md:min-h-[88vh] lg:min-h-[760px]">
      <HeroMedia videoSrc={videoSrc} posterSrc={posterSrc} imageSrc={imageSrc} />

      <Nav />
      <StickyNav />

      {children}
    </div>
  );
};

export default Header;
