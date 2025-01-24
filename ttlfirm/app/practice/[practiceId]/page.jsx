"use client";
import PracticeArea from "@components/pages/home/practiceAreas";
import Section2 from "@components/common/section2";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Section4 from "@components/common/section4";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

import Consultation from "@components/pages/home/consult";
import { demoProducts } from "@models/practice_areas";
import PageHeader from "@components/pages/header";
import ImageSection from "@components/pages/profile/imageSection";

import Accordion from "@components/uiComponents/accordion";


const SinglePractice = () => {
  const router = usePathname();
  const id = router.split("/").at(-1);
  // demoProducts.js
  // demoProducts.js
  const title = "";
  const accordionData = [
    {
      title: "MORE MONEY (MAXIMIZING YOUR COMPENSATION)",
      content:
        "When I take on your case, insurance companies often assign a new adjuster with a higher settlement range because they know the exposure just went up.",
    },
    {
      title: "CASH FLOW",
      content:
        "If possible, I’ll help you access additional funds from your insurance while you’re receiving treatment and waiting for your settlement.",
    },
    {
      title: "HANDLING MEDICAL BILLS",
      content:
        "Once your treatment is complete, I’ll collect all your medical bills, records, and liens to make sure they’re handled properly.",
    },
    {
      title: "WINNING YOUR SETTLEMENT",
      content:
        "I’ll build a strong case to get the insurance company to offer their highest settlement. I’ll also guide you on whether their offer is the right one for you.",
    },
    {
      title: "KEEPING MORE IN YOUR POCKET",
      content:
        "If your bills are high, I’ll negotiate to reduce them so you can keep more of your settlement.",
    },
    {
      title: "TAKING CARE OF PAYMENTS",
      content:
        "When your case is resolved, I’ll manage the payment of all bills and liens to take that stress off your plate.",
    },
    {
      title: "GETTING YOU PAID",
      content:
        "The best part! I’ll send your share of the settlement directly to you as quickly as possible.",
    },
    
  ];
  
  console.log(demoProducts[id - 1]);

  return (
    <div className="w-full flex flex-col">
    <PageHeader text={demoProducts[id - 1].name} subAreas={demoProducts[id - 1].subAreas} image={demoProducts[id - 1].image}/>

      <Section2>
        <div className="w-full flex flex-col md:flex-row-reverse justify-center items-center md:items-start md:justify-around md:pl-5">
          <div className="flex flex-col w-full md:w-[70%]  p-8 sm:p-16 justify-center md:items-start md:justify-around items-center mt-6  md:mt-8 sm:gap-7 md:px-0 ">
            {/* <div>
              <Image
                className="relative z-30  w-[300px]  h-[170px] sm:w-[450px] sm:h-[220px] md:w-[530px]  md:h-[250px]  lg:w-[800px] lg:h-[300px] object-cover hover:opacity-90"
                src={demoProducts[id - 1].image}
                width={300}
                height={250}
                alt="business image"
              />
            </div> */}
            <div className="flex flex-col   gap-4  md:p-0 sm:mt-0 ">
              <div className="flex flex-col gap-5 sm:p-10 sm:pb-0 md:p-0">
                {/* <div className="flex flex-col gap-8">
                <hr className="bg-amber-600 h-[2px] w-14" />
                <h3 className="uppercase sp  inline font-semibold text-lg opacity-70 font-jost">
                  Who We Are
                </h3>
              </div> */}
                <h1 className=" font-lora  text-4xl">
                  {demoProducts[id - 1].name}
                </h1>

                <div className="flex flex-col gap-3 text-lg md:pr-10">
                  <p className="text-pretty text-gray-500">
                    {demoProducts[id - 1].detail}
                  </p>
                  <p className="text-pretty text-gray-500">
                    {demoProducts[id - 1].detail2}
                  </p>
                  <div>
                    {Array.isArray(demoProducts[id - 1].detail3) ? (
                      demoProducts[id - 1].detail3.map((item, index) => (
                        <p key={index} className="text-pretty text-gray-500">
                          {item}
                        </p>
                      ))
                    ) : (
                      <p className="text-pretty text-gray-500">
                        {demoProducts[id - 1].detail3}
                      </p>
                    )}
                  </div>
                  <p className="text-pretty text-gray-500">
                    {demoProducts[id - 1].detail4}
                  </p>
                  <p className="text-pretty text-gray-500">
                    {demoProducts[id - 1].detail5}
                  </p>{demoProducts[id - 1].useFaq && (<Accordion title={title} accordionData = {accordionData} usePadding={false}/>)}
                    <p className="text-pretty text-gray-500">
                    With me on your side, you’ll get the care, support, and results you deserve while I handle the rest.
                    </p>
                </div>
                
              </div>
            </div>
          </div>
          <div className="w-full p-8  md:w-[30%]">
          <div className="w-full flex flex-col gap-5 md:mt-12">
            <h1 className="font-lora text-2xl font-medium">Practice Areas</h1>
            {  demoProducts.map((item, index) => (<div className="w-full flex flex-col gap-4" key={index}>
            <hr className="w-full h-[1.5px] bg-amber-600 opacity-20" />

            <Link   href={`/practice/${item.id}`} className={`hover:ml-4 hover:text-amber-600 hover:opacity-80 flex flex-row  transition-all duration-300 gap-3 font-josh items-center font-medium text-base`}>
                <FaArrowRightLong
                  className={` text-xs`}
                />
                        <span >{item.name}</span>
              </Link>
            
            </div>))
              
            }
          </div>
          </div>
        </div>
      </Section2>
      <Section4>
        <Consultation />
      </Section4>
    </div>
  );
};

export default SinglePractice;
