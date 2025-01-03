import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="relative section1 w-full flex flex-col md:flex-row justify-around items-center md:gap-10 py-16 px-8 lg:pl-12">
      <div className="relative  md:pl-7 pb-7 ">
        <Image
          className="relative z-30 md:w-[400px] md:h-[400px] object-cover"
          src="/assets/images/laws.jpg"
          width={500}
          height={600}
          alt="law"
        />
        <div className="absolute h-14 w-14 bg-amber-600 bottom-3 z-20 -left-3 md:left-3 opacity-25"></div>
      </div>
      <div className=" w-full md:w-1/2 flex justify-around sm:items-center md:items-start md:justify-start flex-col gap-4 z-30">
        <div className="flex flex-row items-center gap-3">
          <hr className="bg-amber-600 h-1 w-14" />
          <h3 className="text-amber-600 uppercase font-serif inline font-bold">
            Who We Are
          </h3>
        </div>
        <h1 className="font-bold text-2xl  lg:text-4xl">Know about Turuchi Law Firm</h1>
        <div className="text-sm lg:text-base text-gray-600 sm:pl-16 md:pl-0 lg:pr-16 text-balance">
          At Turichi Law Firm, we are committed to providing expert legal
          representation in cases involving accidents, medical malpractice, and
          victim advocacy. Our team is driven by compassion, integrity, and a
          deep understanding of the challenges our clients face. With a proven
          track record of success, we focus on protecting your rights and
          pursuing justice with unwavering determination. Whether you’re seeking
          compensation or resolution, we are here to guide you through every
          step of the legal process and ensure your voice is heard.
        </div>
        <Link href=""  className="btn w-32 sm:w-36 text-center hover:text-black z-30">
            READ MORE
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
