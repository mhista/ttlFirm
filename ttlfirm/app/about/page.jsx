import Accordion from "@components/uiComponents/accordion";
import Image from "next/image";
import Section4 from "@components/common/section4";

import Consultation from "@components/pages/home/consult";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="z-[60] bg-white">
    <div className="relative flex flex-col md:pl-8 mb-8 z-[60] bg-white">
      <div className="flex flex-col p-8 sm:p-16 md:flex-row-reverse justify-center md:items-start md:justify-around items-center mt-6  md:mt-8 sm:gap-7 md:px-0 ">
        <div className="relative w-full flex items-end justify-center  md:w-1/2">
          <Image
            className="rounded relative z-30 w-[250px]  h-[350px] sm:w-[450px] sm:h-[500px] md:w-[260px]  md:h-[300px]  lg:w-[450px] lg:h-[500px] object-cover md:mt-9"
            src="/assets/images/laws.jpg"
            width={300}
            height={250}
            alt="law"
          />
          <Image
            // sm:w-[450px] sm:h-[500px] md:w-[260px]  md:h-[300px]  lg:w-[450px] lg:h-[500px]
            className="rounded absolute z-30 w-[120px]  h-[150px] -bottom-5 left-5 object-cover "
            src="/assets/images/lawyer.jpg"
            width={300}
            height={250}
            alt="law"
          />
        </div>
        <div className="flex flex-col md:w-1/2  gap-4  md:p-8 mt-10 sm:mt-0 ">
          <div className="flex flex-col gap-5 sm:p-10 sm:pb-0 md:p-0">
            <div className="flex flex-col gap-8">
              <hr className="bg-amber-600 h-[2px] w-14" />
              <h3 className="uppercase sp  inline font-semibold text-lg opacity-70 font-jost">
                Who We Are
              </h3>
            </div>
            <h1 className=" font-lora  text-4xl">
              Know about Turuchi Law Firm
            </h1>

            <div className="flex flex-col gap-3 text-lg">
              <p className="text-pretty text-gray-500">
                At Turuchi Law Firm, we are unwavering in our commitment to
                providing exceptional legal representation rooted in compassion,
                diligence, and integrity. Our expertise lies in personal injury
                law, where we relentlessly pursue justice and fair compensation
                for individuals who have suffered harm due to the negligence of
                others.
              </p>
              <p className="text-pretty text-gray-500">
                Beyond personal injury, our firm offers comprehensive legal
                services in immigration law, workers' compensation, municipal
                matters, and a broad spectrum of additional practice areas.
                Whether you’re navigating the complexities of immigration,
                seeking workers’ rights, or resolving municipal concerns, our
                dedicated attorney will guide you with precision and care.
              </p>
              <p className="text-pretty text-gray-500">
                At Turuchi Law Firm, we believe in the power of personalized
                attention and transparent communication. We work tirelessly to
                understand your unique circumstances, crafting tailored
                strategies that align with your best interests. With a steadfast
                focus on achieving favorable outcomes, we stand as your trusted
                legal partner, committed to protecting your rights and securing
                a brighter future for you and your loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  gap-4 p-8 sm:p-16  sm:pt-0 md:flex-row justify-center md:items-start md:justify-around items-center md:mr-7 md:p-0  md:my-0 sm:gap-7 md:gap-14">
        <div className="relative w-full flex items-end justify-center md:w-full">
          <Image
            className="rounded relative z-30 w-[250px]  h-[350px] sm:w-[450px] sm:h-[500px] md:w-[300px]  md:h-[300px]  lg:w-[450px] lg:h-[500px] object-cover "
            src="/assets/images/lawyer2.jpg"
            width={300}
            height={250}
            alt="law"
          />
          <Image
            // sm:w-[450px] sm:h-[500px] md:w-[260px]  md:h-[300px]  lg:w-[450px] lg:h-[500px]
            className="rounded absolute z-30 w-[120px]  h-[150px] -bottom-5 -right-5 object-cover "
            src="/assets/images/laws.jpg"
            width={300}
            height={250}
            alt="law"
          />
        </div>
        <Accordion />
      </div>
     
    </div>
    <Section4>
        <Consultation/>
      </Section4>
    </div>
  );
};

export default AboutUs;
