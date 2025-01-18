import PracticeContainer from "@components/common/practiceContainer";


const PracticeArea = () => {
  return (
    <div className="relative section1 w-full flex flex-col justify-around items-center gap-5 md:gap-10 z-30 py-20">
        <div className="flex flex-row items-center gap-3">
          <hr className="bg-amber-600 h-[2px] w-14" />
          <h3 className="text-amber-600 text-lg uppercase font-jost inline font-bold">
            What we do
          </h3>
          <hr className="bg-amber-600 h-[2px] w-14" />

      </div>
      <h1 className="font-lora text-4xl pl-10 sm:pl-0">Our legal practice areas</h1>
   <div className="w-full flex flex-col md:flex-row  flex-wrap  lg:px-0 gap-12 items-center justify-center">
   <PracticeContainer image1={'/assets/images/injury.jpg'}  title={'Personal Injury'} aos={"fade-right"} id={1}
    subtitle={'At Turuchi Law Firm, we understand that an accident or injury can be one of the most devastating experiences of your life. The physical pain, emotional trauma,'}/>
    <PracticeContainer image1={'/assets/images/immig.jpg'}  title={'Immigration'} aos={"zoom-in"} id={2}
    subtitle={'Immigration law is one of the most complex and dynamic areas of the legal system. At Turuchi Law Firm, we are passionate about helping individuals, families, and '}/>
    <PracticeContainer image1={'/assets/images/work.jpg'}  title={'Workers Compensation'} aos={"fade-left"} id={3}
    subtitle={'A workplace injury can disrupt your life in ways you never anticipated. From physical pain and mounting medical bills to lost wages and job insecurity, the aftermath'}/>
     <PracticeContainer image1={'/assets/images/muni.jpg'}  title={'Municipal Matters'} aos={"zoom-in"} id={4}
    subtitle={'At Turuchi Law Firm, we provide comprehensive legal services for a wide range of municipal court matters, including traffic violations, speeding tickets,'}/>
   </div>
    </div>
  );
};

export default PracticeArea;
