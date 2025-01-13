"use client";

import Nav from "@/components/layout/nav";
import Image from "next/image";
import Link from "next/link";
import StickyNav from "@/components/layout/stickyNav";
import { useEffect } from "react";
import AOS from 'aos';
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
import { once } from "lodash";


const Header = ({}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 , once: true});
  }, []);
  const height = 500;
  return (
    <div className={`relative w-full h-[600px] sm:h-[500px] md:h-[600px]`}>
      {/* NAVBAR */}
      <Nav />
      {/* STICKY NAV */}
      <StickyNav />
      {/* background opacity */}
      <div
        className={`absolute w-full z-20 bg-black opacity-40 h-[600px] sm:h-[500px] md:h-[600px] text-center top-0`}
      ></div>
      {/* background image */}
      <img
        src="/assets/images/bgg.jpg"
        className={`absolute w-full object-cover h-[600px] sm:h-[500px] md:h-[600px] z-10 top-0`}
      ></img>
      <div className="w-full relative h-[600px] sm:h-[500px] md:h-[600px] flex flex-col sm:flex-row justify-center sm:items-center gap-7 pt-9 sm:pt-16 sm:pl-9 md:pl-0 lg:pl-9">
        <div className=" flex items-start w-[50%] pl-8 md:h-[200px]" >
          <Image
            // sm:w-[450px] sm:h-[500px] md:h-[600px] md:w-[260px]  md:h-[300px]  lg:w-[450px] lg:h-[500px]
            className="rounded  z-40 opacity-80  object-cover"
            src="/assets/images/lawyer.jpg"
            width={300}
            height={250}
            alt="law"
            data-aos="zoom-in"
          />
        </div>
        <div
          className={`text-white  flex flex-col items-start justify-center pl-8 w-full gap-5 z-40 md:pt-20`}
        >
          <h1 className="font-lora text-3xl md:text-5xl lg:text-7xl w-5/6 " data-aos="fade-up">
            Turuchi <span className="text-amber-600">Law firm</span>
          </h1>
          <p className="text-sm w-5/6 md:text-lg " data-aos="zoom-in-up">
            {/* Turuchilaw firm is a leading expert in legal profession. Our team of
          experts provides you with unparalleled legal advice and support. */}
            We understand that every case is unique, so we're here to help you
            navigate through it with confidence and support.
          </p>
          <Link href="#" className="btn" data-aos="zoom-in">
            Ask For Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
