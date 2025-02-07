import Accordion from "@components/uiComponents/accordion";
import Image from "next/image";
import Section4 from "@components/common/section4";
import ImageSection from "@components/pages/profile/imageSection";

import Consultation from "@components/pages/home/consult";
import Link from "next/link";
import PageHeader from "@components/pages/header";
const AboutUs = () => {
  const title = "Frequently Asked Questions";
  const accordionData = [
    {
      title: "What type of cases does Turuchi Law Firm handle?",
      content: `Beyond personal injury, our firm offers comprehensive legal
              services in immigration law, workers' compensation, municipal court
              matters, and a broad spectrum of additional practice areas.`,
    },
    {
      title: "How can I schedule a consultation with Turuchi Law Firm?",
      content:
        "Scheduling a consultation with Turuchi Law Firm is easy. You can contact us through our website, call our office directly, or make an appointment to visit us in person. We strive to make the process as smooth and accessible as possible.",
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
    <div className="z-[60] bg-white">
      <PageHeader text={"About"} text2={"Us"} />

      <div className="relative w-full flex flex-col md:flex-row justify-center md:items-start md:justify-around items-center pt-6 md:py-8 md:gap-7 md:px-7 z-[60] bg-white">
        <ImageSection image={"/assets/images/main.jpg"} />

        <div className="md:w-full">
          <div className="sm:p-16 md:p-0 w-full mb-10">
            <div className="flex flex-col gap-4 p-8  sm:pt-0">
              <h1 className=" font-lora text-2xl font-medium">Who We Are</h1>

              <p className="text-pretty text-gray-500">
                At The Turuchi Law Firm, we are unwavering in our commitment to
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
                Whether you're dealing with a recent accident, navigating
                immigration complexities, pursuing workers' compensation, or
                addressing municipal issues, our dedicated attorney will guide
                you with precision and care.
              </p>
              <p className="text-pretty text-gray-500">
                At The Turuchi Law Firm, we believe in the power of personalized
                attention and transparent communication. We work tirelessly to
                understand your unique circumstances, crafting tailored
                strategies that align with your best interests. With a steadfast
                focus on achieving favorable outcomes, we stand as your trusted
                legal partner, committed to protecting your rights and securing
                a brighter future for you and your loved ones.
              </p>
            </div>
          </div>
          <Accordion
            title={title}
            accordionData={accordionData}
            usePadding={true}
          />
        </div>
      </div>
      <Section4>
        <Consultation />
      </Section4>
    </div>
  );
};

export default AboutUs;
