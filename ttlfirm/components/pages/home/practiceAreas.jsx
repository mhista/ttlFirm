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
   <PracticeContainer image1={'/assets/images/injury.jpg'}  title={'Personal Injury'}
    subtitle={'lorem Ipsum is simply dummy text of the printing and typesettin industry that remains essentially unchanged after Print License Version'}/>
    <PracticeContainer image1={'/assets/images/immig.jpg'}  title={'Immigration'}
    subtitle={'lorem Ipsum is simply dummy text of the printing and typesettin industry that remains essentially unchanged after Print License Version'}/>
    <PracticeContainer image1={'/assets/images/work.jpg'}  title={'Workers Compensation'}
    subtitle={'lorem Ipsum is simply dummy text of the printing and typesettin industry that remains essentially unchanged after Print License Version'}/>
     <PracticeContainer image1={'/assets/images/muni.jpg'}  title={'Municipal Matters'}
    subtitle={'lorem Ipsum is simply dummy text of the printing and typesettin industry that remains essentially unchanged after Print License Version'}/>
   </div>

    </div>
  );
};

export default PracticeArea;
