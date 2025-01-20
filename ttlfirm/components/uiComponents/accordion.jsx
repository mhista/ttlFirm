"use client";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "What types of cases does Turuchi Law Firm handle?",
      content:
        `Beyond personal injury, our firm offers comprehensive legal
                services in immigration law, workers' compensation, municipal
                matters, and a broad spectrum of additional practice areas.`
    },
    {
      title: "How can I schedule a consultation with Turuchi Law Firm?",
      content:
        "Scheduling a consultation with Turuchi Law Firm is easy. You can contact us through our website, call our office directly, or visit us in person. We strive to make the process as smooth and accessible as possible.",
    },
    {
      title: "What makes Turuchi Law Firm stand out?",
      content:
        "At Turuchi Law Firm, we combine compassion with expertise. We are committed to personalized legal representation and have a proven track record of success in obtaining justice for our clients.",
    },
    {
      title: "What are the costs of Turuchi Law Firm's legal services?",
      content:
        "Our legal fees vary depending on the complexity of the case. However, for personal injury cases, we often operate on a contingency fee basis, meaning you pay nothing unless we win your case.",
    },
    {
      title: "Will I work directly with an attorney on my case?",
      content:
        "Yes, at Turuchi Law Firm, we believe in maintaining close communication with our clients. You will have direct access to an experienced attorney who will handle your case and provide you with updates every step of the way.",
    },
  ];

  return (
    <div className="flex flex-col sm:items-center w-full sm:px-10 md:px-0 mt-3 divide-y transition-all ">
      {accordionData.map((item, index) => (
        <div key={index} className=" overflow-hidden mb-2 p-6">
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
        </div>
      ))}
    </div>
  );
};

export default Accordion;
