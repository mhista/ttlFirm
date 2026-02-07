"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import { useEffect } from "react";
import AOS from "aos";

const HomeHero = ({ content, height1 = "1200", height2 = "550", height3 }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Use CMS content or fallbacks
  const heading = content?.heading || "Trusted New Jersey Law firm delivering the best legal outcomes";
  const headingHighlight = content?.headingHighlight || "New Jersey";
  const description = content?.description || "We are a dedicated law firm in New Jersey committed to providing exceptional legal representation...";
  const ctaText = content?.ctaText || "Schedule a free Consultation";
  const ctaLink = content?.ctaLink || "/contact";
  const heroImage = content?.heroImage ? urlFor(content.heroImage).url() : "/assets/images/lawyer.jpg";
  const heroImageAlt = content?.heroImage?.alt || "Attorney";
  const attorneyLinkText = content?.attorneyLinkText || "Turuchi S. Iheanachor, Esq.";

  // Split heading to highlight specific text
  const renderHeading = () => {
    if (headingHighlight && heading.includes(headingHighlight)) {
      const parts = heading.split(headingHighlight);
      return (
        <>
          {parts[0]}
          <span className="text-amber-600">{headingHighlight}</span>
          {parts[1]}
        </>
      );
    }
    return heading;
  };

  return (
    <div
      className={`w-full relative h-[1290px] sm:h-[660px] md:h-[800px] lg:h-[930px] flex flex-col-reverse sm:flex-row-reverse items-start justify-center sm:items-center gap-7 md:gap-8 lg:gap-4 pt-20 sm:pt-[120px] md:pt-[100px] lg:pt-[120px] px-5 sm:pl-9 md:pl-0 lg:pl-9 md:px-5 lg:px-7`}
    >
      <div className="flex flex-col items-center justify-center w-full md:w-[full] md:pr-10 gap-5">
        <Image
          className="rounded z-40 opacity-80 object-cover"
          src={heroImage}
          width={470}
          height={250}
          alt={heroImageAlt}
          data-aos="zoom-in"
          priority
        />

        <Link
          href={"/profile"}
          className="z-40 font-lora border p-2 text-xl sm:text-base text-white md:text-2xl hover:text-amber-600 transition"
        >
          {attorneyLinkText} <span className="text-xl">+</span>
        </Link>
        
        <div className="block sm:hidden z-40">
          <Link
            href={ctaLink}
            className="block sm:hidden btn text-xl"
            data-aos="zoom-in"
          >
            {ctaText}
          </Link>
        </div>
      </div>
      
      <div
        className={`text-white flex flex-col items-start justify-center md:pl-8 w-full gap-5 z-40 md:pt-20 lg:mt-[-150px]`}
      >
        <h1
          className="font-lora text-2xl sm:text-2xl md:text-4xl uppercase font-bold"
          data-aos="fade-up"
        >
          {renderHeading()}
        </h1>
        
        <p
          className="text-base sm:text-sm w-5/6 sm:w-full lg:w-5/6 md:text-base lg:text-lg text-pretty text-justify"
          data-aos="zoom-in-up"
        >
          {description}
        </p>

        <Link
          href={ctaLink}
          className="hidden w-full sm:block lg:w-4/6 btn"
          data-aos="zoom-in"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default HomeHero;