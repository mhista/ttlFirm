"use client";

import Nav from "@/components/layout/nav";
import Image from "next/image";
import Link from "next/link";
import StickyNav from "@/components/layout/stickyNav";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = ({}) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true,});
  }, []);
  const height = 500;
  return (
    <div className={`relative w-full h-[650px] sm:h-[500px] md:h-[750px]`}>
      {/* NAVBAR */}
      <Nav />
      {/* STICKY NAV */}
      <StickyNav />
      {/* background opacity */}
      <div
        className={`absolute w-full z-20 bg-black opacity-40 h-[650px] sm:h-[500px] md:h-[750px] text-center top-0`}
      ></div>
      {/* background image */}
      <img
        src="/assets/images/bg2.jpg"
        className={`absolute w-full object-cover h-[650px] sm:h-[500px] md:h-[750px] z-10 top-0`}
      ></img>
      <div className="w-full relative h-[650px] sm:h-[500px] md:h-[750px] flex flex-col sm:flex-row-reverse justify-center sm:items-center gap-7 md:gap-5 pt-14 sm:pt-16 sm:pl-9 md:pl-0 lg:pl-9 md:px-5">
        <div className=" flex items-end w-[50%] md:w-[full] pl-8 ">
          <Image
            // sm:w-[450px] sm:h-[500px] md:h-[750px] md:w-[260px]  md:h-[300px]  lg:w-[450px] lg:h-[500px]
            className="rounded  z-40 opacity-80  object-cover"
            src="/assets/images/lawyer.jpg"
            width={300}
            height={250}
            alt="law"
            data-aos="zoom-in"
          />
        </div>
        <div
          className={`text-white  flex flex-col items-start justify-center pl-8 w-full gap-5 z-40 md:pt-20 lg:pt-14`}
        >
        {/* Your justice, Our commitment */}
        <h1 className=" font-lora  text-4xl md:text-3xl">
              The Turuchi Law Firm
            </h1>
          <h1
            className="font-lora text-3xl md:text-5xl lg:text-7xl w-5/6 "
            data-aos="fade-up"
          >
            Your Justice <span className="text-amber-600">Our Commitment</span>
          </h1>
          <p className="text-base w-5/6 md:text-lg text-pretty" data-aos="zoom-in-up">
          we are unwavering in our commitment to
                providing exceptional legal representation rooted in compassion,
                diligence, and integrity. Our expertise lies in personal injury
                law, where we relentlessly pursue justice and fair compensation
                for individuals who have suffered harm due to the negligence of
                others. <br/>Beyond personal injury, our firm offers comprehensive legal
                services in immigration law, workers' compensation, municipal matters, and a broad spectrum of additional practice areas.
          </p>
          <Link href={`/contact`} className="btn text-xl" data-aos="zoom-in">
            Schedule a free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
