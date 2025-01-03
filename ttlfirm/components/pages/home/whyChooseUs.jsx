import NumbersContainer from "@components/common/numbersContainer";

const WhyChooseUs = () => {
  return (
    <div className="relative w-full flex flex-col items-center gap-5 md:px-20 lg:px-24 py-10 md:py-20 ">
    {/* why choose */}
      <div className="w-full flex flex-col md:flex-row gap-3 md:gap-5 sm:items-center sm:justify-center justify-around px-5 md:px-0 ">
        <div className="flex flex-col items-start sm:items-center md:items-start gap-3 sm:w-full md:w-1/3 ">
          <div className=" flex flex-row items-center justify-center gap-3 ">
            <hr className="bg-amber-600 h-[2px] w-14" />
            <h3 className="text-amber-600  uppercase inline font-bold">
              Why Trust us
            </h3>
          </div>
          <h1 className="font-bold  text-white text-3xl font-serif ">
            Why clients choose our legal team
          </h1>
        </div>
        <hr className="hidden md:block bg-gray-600 h-[100px] w-[0.9px] ml-11 mt-10" />
        <div className=" w-full md:w-[60%] text-sm lg:text-base text-gray-200 peer-invalid: md:pl-10 sm:text-center md:text-left  text-balance">
          At Turichi Law Firm, we are committed to providing expert legal
          representation in cases involving accidents, medical malpractice, and
          victim advocacy. Our team is driven by compassion, integrity, and a
          deep understanding of the challenges our clients face. With a proven
          track record of success, we focus on protecting your rights and
          pursuing justice with unwavering determination. Whether you’re seeking
          compensation or resolution, we are here to guide you through every
          step of the legal process and ensure your voice is heard.
        </div>
      </div>
      {/* divider */}
      <hr className="w-[80%] md:w-full flex bg-gray-500 opacity-30 my-6"/>
      <div className="flex flex-col sm:flex-row w-full items-center justify-center gap-7">
      <NumbersContainer title={'1000+'} subtitle={'Clients Consultation'}/>
      <NumbersContainer title={'90+'} subtitle={'Successful cases'}/>
      <NumbersContainer title={'1500+'} subtitle={'Happy clients'}/>
      </div>

    </div>
  );
};

export default WhyChooseUs;
