
import Nav from "@/components/layout/nav";

import StickyNav from "@/components/layout/stickyNav";
import Image from "next/image";
import Link from "next/link";

import "aos/dist/aos.css";

const PageHeader = ({text, text2, image}) => {
 
  return (
    <div className={`relative w-full h-[350px] sm:h-[300px] md:h-[400px]`}>
      {/* NAVBAR */}
      <Nav />
      {/* STICKY NAV */}
      <StickyNav />
      {/* background opacity */}
      <div
        className={`absolute w-full z-20 bg-black opacity-40 h-[350px] sm:h-[300px] md:h-[400px] text-center top-0`}
      ></div>
      {/* background image */}
      <img
        src="/assets/images/bgg.jpg"
        className={`absolute w-full object-cover h-[350px] sm:h-[300px] md:h-[400px] z-10 top-0`}
      ></img>
    <div className={`w-full relative h-[350px] sm:h-[300px] md:h-[400px] flex flex-col-reverse sm:flex-row-reverse items-center justify-center sm:items-center md:gap-8 pt-20 sm:pt-[100px]  sm:pl-9 md:pl-0 lg:pl-9 md:px-5`}>
        
        <div
          className={`text-white  flex flex-col sm:flex-row items-center justify-center md:pl-8  w-full z-40 md:pt-20 lg:pt-14`}
        >
        {/* Your justice, Our commitment */}
        <h1 className="flex items-center justify-center font-lora text-5xl sm:text-5xl md:text-6xl lg:text-7xl w-full z-40 text-pretty pl-10 sm:pl-0">
              {text}<span className="text-amber-300 opacity-80 ml-3"> {text2}</span>
            </h1>
        </div>
      </div>
    </div>
  );
};
export default PageHeader;
