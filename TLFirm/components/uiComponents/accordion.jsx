"use client";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Accordion = ({usePadding, title, accordionData}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  

  return (
   <div className={`flex flex-col  w-full ${usePadding? "p-8" : ""}   sm:pt-0 mt-4 md:mt-0 transition-all`}>
    <h1 className=" font-lora  text-3xl mb-5 tracking-widest">
              {title}
            </h1>
            <hr className="w-full h-[0.5px] bg-amber-600 mt-2"/>
    <div className="flex flex-col sm:items-center w-full sm:px-10 md:px-0 transition-all ">
    
      {accordionData.map((item, index) => (
        <div key={index} className="w-full overflow-hidden  py-6">
          {/* Accordion Header */}
          <div
            className={` flex justify-between items-center px-4 py-2 cursor-pointer gap-2  ${
              activeIndex === index ? "bg-gray-50 text-black rounded-t-lg  shadow-sm" : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <span
              className={`transition-all duration-700 ${
                activeIndex !== index ? "text-lg" : ""
              } font-medium font-lora`}
            >
              {item.title}
            </span>
            <span
              className={`text-lg  transform transition-transform duration-700 `}
            >
              {activeIndex === index ? (
                <FaMinus className="opacity-70" />
              ) : (
                <FaPlus className="opacity-70" />
              )}
            </span>
          </div>

          {/* Accordion Content */}
          {activeIndex === index && (
            <div className="transition-all duration-700 shadow-sm rounded-b-lg px-4 py-2 bg-gray-50 text-gray-700">
              {item.content}
            </div>
          )}
          <hr className="w-full h-[0.5px] bg-gray-200 mt-4"/>
        </div>
      ))}
    </div></div>
  );
};

export default Accordion;
