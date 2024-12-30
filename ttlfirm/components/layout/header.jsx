import Nav from "@/components/layout/nav";
import Image from "next/image";
import Link from "next/link"; 
import StickyNav from "@/components/layout/stickyNav";


const Header = ({}) => {
  const height = 500;
  return (
    <div className={`relative w-full h-[500]`}>
      {/* NAVBAR */}
      <Nav />
      {/* STICKY NAV */}
      <StickyNav />
      {/* background opacity */}
      <div className={`absolute w-full z-20 bg-black opacity-40 h-[500] text-center top-0`}></div>
      {/* background image */}
      <img
        src="/assets/images/bgg.jpg"
        className={`absolute w-full object-cover h-[500] z-10 top-0`}
      ></img>

      <div className={`text-white absolute flex flex-col items-center justify-center w-full h-[500] z-40 gap-5 top-10 md:top-50`}>
        <h1 className=" font-serif text-5xl  lg:text-7xl w-5/6 md:px-16 text-center">
          We <span className="text-amber-600">Always Find</span> Solutions for
          all legal case
        </h1>
        <p className="text-center w-5/6 md:text-lg md:w-2/4">
          {/* Turuchilaw firm is a leading expert in legal profession. Our team of
          experts provides you with unparalleled legal advice and support. */}
           We
          understand that every case is unique, so we're here to help you
          navigate through it with confidence and support. 

        </p>
        <Link href="#" className="btn">
            Ask For Consultation
        </Link>
       
      </div>

    </div>
  );
};
export default Header;
