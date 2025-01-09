import PracticeContainer from "@components/common/practiceContainer";


const PracticeArea = () => {
  return (
    <div className="relative section1 w-full flex flex-col justify-around items-center gap-5 md:gap-10 z-30 py-20">
        <div className="flex flex-row items-center gap-3">
          <hr className="bg-amber-600 h-1 w-14" />
          <h3 className="text-amber-600 text-2xl uppercase font-lora inline font-bold">
            What we do
          </h3>
          <hr className="bg-amber-600 h-1 w-14" />

      </div>
      <h1 className="font-bold text-3xl  lg:text-4xl">Our legal practice areas</h1>
   <div className="w-full flex flex-col md:flex-row  flex-wrap  lg:px-0 gap-5 items-center justify-center">
   <PracticeContainer image1={'/assets/images/biz.png'} image2={'/assets/images/biz2.png'} title={'Business Law'}
    subtitle={'lorem Ipsum is simply dummy text of the printing and typesettin industry that remains essentially unchanged after Print License Version'}/>
    <PracticeContainer image1={'/assets/images/car1.png'} image2={'/assets/images/car2.png'} title={'Personal Injury'}
    subtitle={'lorem Ipsum is simply dummy text of the printing and typesettin industry that remains essentially unchanged after Print License Version'}/>
    <PracticeContainer image1={'/assets/images/court.png'} image2={'/assets/images/court2.png'} title={'Estate Litigation'}
    subtitle={'lorem Ipsum is simply dummy text of the printing and typesettin industry that remains essentially unchanged after Print License Version'}/>
   </div>

    </div>
  );
};

export default PracticeArea;
