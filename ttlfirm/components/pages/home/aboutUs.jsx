import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="relative section1 w-full flex flex-col md:flex-row justify-around items-center md:gap-10 lg:gap-5 py-16 px-8 md:px-0 lg:pl-24">
      <div className="flex w-full flex-col md:flex-row sm:items-center sm:justify-center relative  md:pl-7 pb-7 md:gap-7">
        <Image
          className="relative z-30  md:h-[300px] object-cover md:w-[300px] lg:h-[400px] lg:w-[400px] rounded-lg"
          src="/assets/images/laws.jpg"
          width={500}
          height={600}
          alt="law"
        />
          <div className="hidden lg:block lg:absolute h-14 w-14 bg-amber-600 bottom-3 z-20 -left-3 md:left-3 opacity-25"></div>
          
        <div className="flex flex-col  gap-4 md:gap-3  w-full mt-10 sm:mt-0 md:pr-7 lg:mx-24 ">
          <div className="flex flex-col gap-5 sm:p-10 sm:pb-0 md:p-0">
            <div className="flex flex-col gap-8">
              <hr className="bg-amber-600 h-[2px] w-14" />
              <h3 className="uppercase sp  inline font-semibold text-lg opacity-70 font-jost">
                Who We Are
              </h3>
            </div>
            <h1 className=" font-lora  text-4xl md:text-3xl">
              Know about Turuchi Law Firm
            </h1>

            <div className="flex flex-col gap-3 text-lg">
              <p className="text-pretty text-gray-500 md:text-sm lg:text-base">
                At Turuchi Law Firm, we are unwavering in our commitment to
                providing exceptional legal representation rooted in compassion,
                diligence, and integrity. Our expertise lies in personal injury
                law, where we relentlessly pursue justice and fair compensation
                for individuals who have suffered harm due to the negligence of
                others. <br/>Beyond personal injury, our firm offers comprehensive legal
                services in immigration law, workers' compensation, municipal ...
              </p>
            </div>
            <Link
          href=""
          className="btn w-32 sm:w-36 text-center hover:text-black z-30"
        >
          READ MORE
        </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AboutUs;
