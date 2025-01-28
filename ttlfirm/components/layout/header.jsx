
import Nav from "@/components/layout/nav";

import StickyNav from "@/components/layout/stickyNav";

import "aos/dist/aos.css";

const Header = ({children, height1, height2, height3}) => {
 
  return (
    <div className={`relative w-full h-[1260px] sm:h-[600px] md:h-[930px]`}>
      {/* NAVBAR */}
      <Nav />
      {/* STICKY NAV */}
      <StickyNav />
      {/* background opacity */}
      <div
        className={`absolute w-full z-20 bg-black opacity-40 h-[1260px] sm:h-[600px] md:h-[930px] text-center top-0`}
      ></div>
      {/* background image */}
      <img
        src="/assets/images/bg2.jpg"
        className={`absolute w-full object-cover h-[1260px] sm:h-[600px] md:h-[930px] z-10 top-0`}
      ></img>
      {children}
    </div>
  );
};
export default Header;
