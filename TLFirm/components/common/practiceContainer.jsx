"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
const Area = ({ title }) => {
  return (
    <span className="flex gap-2 items-center cursor-auto">
      <div className="h-[13px] w-[13px] rounded-full border-2 border-white flex justify-center items-center">
        <div className="h-[5px] w-[5px] rounded-full bg-white"></div>
      </div>
      <p className="text-white ">{title}</p>
    </span>
  );
};
const PracticeContainer = ({ image1, title, subtitle, id, subAreas = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`flex justify-around items-center `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
     
    >
      <Link href={`/practice/${id}`}>
        <div className={`flex flex-col gap-7 `}>
          <div className="relative flex justify-center items-center h-[190px] sm:w-[430px] sm:h-[250px] md:w-[300px] md:h-[190px]">
          <Image
            className="rounded-xl h-[190px] object-cover sm:w-[430px] sm:h-[250px] md:w-[300px] md:h-[190px]"
            src={image1}
            width={300}
            height={250}
            alt="business image"
          /> { subAreas.length != 0 && <>
          <div className="absolute h-[150px] w-[180px] bg-black top-5   opacity-45 rounded-md">
           
          </div>
          <div className="text-white absolute rounded-md">
            {
             subAreas.length !=0 && subAreas.map((iteme, index)=>{
              if (typeof iteme === "string") {
                return (
                  <Area key={index} title={iteme}/>
                )}
              })
            }
          </div></>}
          </div>

          <h1 className="font-lora uppercase font-medium tracking-wider ">{title}</h1>
          <p className="w-[280px] sm:mx-0 sm:w-[300] overflow-hidden text-ellipsis text-pretty text-gray-700">
{subtitle}
</p>
        </div>
        <div
          className={` text-amber-600 mt-5
           flex justify-normal items-start font-jost uppercase tracking-wider text-sm font-medium`}
        >
          Read more{" "}
          <FaArrowRightLong
            className={`mt-1 ${
              isHovered ? "ml-3" : "ml-2"
            } transition-all duration-500`}
          />
        </div>
      </Link>
    </div>
  );
};

export default PracticeContainer;

{
  /* <Image
className=""
src= {  isHovered ?image1: image2}
width={50}
height={50}
alt="business image"
/>
<h1 className="font-bold text-2xl ">{title}</h1>
<hr className={`${isHovered ? "bg-white" :"bg-amber-600"} h-1 w-14`} />
<p className="w-[280px] mx-auto sm:mx-0 sm:w-[300] overflow-hidden text-ellipsis text-pretty">
{subtitle}
</p>
<div
className={`${isHovered ?"text-white":"text-amber-600"} font-semibold flex justify-center items-center`}
>
Read more <FaArrowRightLong className={`mt-1 ${isHovered?"ml-3":"ml-2"} transition-all duration-500`} />
</div> */
}

// ${isHovered ?"text-white bg-amber-600 opacity-70":"text-black bg-white"} h-[290px] w-[300px] sm:w-[350px] shadow-lg  flex flex-col items-start justify-around gap-4 px-3 sm:pr-0 sm-:pl-10  py-8 rounded-lg
