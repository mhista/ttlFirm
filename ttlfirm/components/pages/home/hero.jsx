"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";
import AOS from "aos";
const HomeHero = ({height1 = "1200", height2="550", height3})=>{
    useEffect(() => {
        AOS.init({ duration: 1000, once: true,});
      }, []);
    return (
        <div className={`w-full relative h-[1290px] sm:h-[660px] md:h-[800px] lg:h-[930px] flex flex-col-reverse sm:flex-row-reverse items-start justify-center sm:items-center gap-7 md:gap-8 lg:gap-4 pt-20 sm:pt-[120px] md:pt-[100px] lg:pt-[120px] px-5 sm:pl-9 md:pl-0 lg:pl-9 md:px-5 lg:px-7`}>
        <div className=" flex flex-col items-center justify-center  w-full md:w-[full] md:pr-10 gap-5">
          <Image
            // sm:w-[450px] sm:h-[500px] md:h-[800px] md:w-[260px]  md:h-[300px]  lg:w-[450px] lg:h-[500px]
            className="rounded  z-40 opacity-80  object-cover"
            src="/assets/images/lawyer.jpg"
            width={470}
            height={250}
            alt="law"
            data-aos="zoom-in"
          />
    
          <Link href={'/profile'} className="z-40 font-lora border p-2   text-xl sm:text-base text-white md:text-2xl">
          Turuchi S. Iheanachor, Esq. <span className="text-xl">+</span>
            </Link>
            <div className="block sm:hidden z-40">
          <Link href={`/contact`} className="block sm:hidden btn text-xl" data-aos="zoom-in">
            Schedule a free Consultation
          </Link>
          </div>
        </div>
        <div
          className={`text-white  flex flex-col items-start justify-center md:pl-8  w-full gap-5 z-40 md:pt-20 lg:mt-[-150px]`}
        >
        {/* Your justice, Our commitment */}
        <h1 className=" font-lora  text-3xl sm:text-2xl md:text-2xl">
              The Turuchi Law Firm, LLC
            </h1>
          <h1
            className="font-lora text-2xl sm:text-xl md:text-4xl lg:text-6xl w-5/6 "
            data-aos="fade-up"
          >
            Your Justice <span className="text-amber-600">Our Commitment</span>
          </h1>
          <p className="text-base sm:text-sm w-5/6 sm:w-full lg:w-5/6 md:text-base lg:text-lg text-pretty text-justify" data-aos="zoom-in-up">
          We are unwavering in our commitment to
                providing exceptional legal representation rooted in compassion,
                diligence, and integrity. Our expertise lies in personal injury
                law, where we relentlessly pursue justice and fair compensation
                for individuals who have suffered harm due to the negligence of
                others. Beyond personal injury, our firm offers comprehensive legal
                services in immigration law, workers' compensation, municipal court matters, and a broad spectrum of additional practice areas.
          </p>
          
          <Link href={`/contact`} className="hidden w-full sm:block lg:w-4/6   btn" data-aos="zoom-in">
            Schedule a free Consultation
          </Link>
          
        </div>
      </div>
    )
}

export default HomeHero;