"use client";
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
const PracticeContainer = ({image1, image2, title, subtitle}) => {
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={`flex justify-around items-center `} onMouseEnter={()=> setIsHovered(true)} onMouseLeave={()=> setIsHovered(false)}>
  <Link href="#">
  <div className={`${isHovered ?"text-white bg-amber-600 opacity-70":"text-black bg-white"} h-[290px] w-[300px] sm:w-[350px] shadow-lg  flex flex-col items-start justify-around gap-4 pl-3 sm-:pl-10  py-8`}>
        <Image
          className=""
          src= {  isHovered ?image1: image2}
          width={50}
          height={50}
          alt="business image"
        />
        <h1 className="font-bold text-2xl ">{title}</h1>
        <hr className={`${isHovered ? "bg-white" :"bg-amber-600"} h-1 w-14`} />
        <p className="w-[280px] mx-auto overflow-hidden text-ellipsis text-pretty">
          {subtitle}
        </p>
        <div
          className={`${isHovered ?"text-white":"text-amber-600"} font-semibold flex justify-center items-center`}
        >
          Read more <FaArrowRightLong className={`mt-1 ${isHovered?"ml-3":"ml-2"} transition-all duration-500`} />
        </div>
      </div>
  </Link>
    </div>
  );
};

export default PracticeContainer;