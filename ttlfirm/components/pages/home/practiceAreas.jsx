import ModernPracticeCard from "@components/common/modernPracticeCard";
import Link from "@node_modules/next/link";

const PracticeArea = () => {
  return (
    <div className="relative w-full flex flex-col justify-around items-center gap-8 md:gap-12 z-30 pt-[130px] pb-24 md:pt-32 lg:py-20">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <div className="flex flex-row items-center gap-3">
          <hr className="bg-amber-600 h-[2px] w-14" />
          <h3 className="text-amber-600 text-lg uppercase font-jost inline font-bold">
            What We Do
          </h3>
          <hr className="bg-amber-600 h-[2px] w-14" />
        </div>
        <h1 className="font-lora text-4xl md:text-5xl text-center font-bold">
          Practice Areas
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg">
          Comprehensive legal services tailored to protect your rights and secure your future
        </p>
      </div>

      {/* Practice Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5 md:px-12 lg:px-16 max-w-[1400px]">
        <ModernPracticeCard
          image1={'/assets/images/inju.jpg'}
          title={'Personal Injury'}
          id={1}
          subAreas={['Car Accidents', 'Slip and Fall', 'Dog Bites', 'Wrongful Death', 'Catastrophic Injuries']}
          subtitle={'Our firm represents clients throughout New Jersey who have been injured due to negligence, helping them pursue fair compensation for medical expenses, lost income, and other damages. We handle each case with diligence and personal attention.'}
        />
        
        <ModernPracticeCard
          image1={'/assets/images/immig.jpg'}
          title={'Immigration'}
          id={2}
          subAreas={['Family Immigration', 'Green Cards', 'Citizenship', 'Deportation Defense', 'Asylum']}
          subtitle={'We assist individuals and families across New Jersey with immigration matters, including visas, adjustment of status, citizenship, and removal defense. Our approach is focused on clear guidance and effective legal representation at every stage.'}
        />
        
        <ModernPracticeCard
          image1={'/assets/images/work.jpg'}
          title={"Workers' Compensation"}
          id={3}
          subAreas={['Workplace Injuries', 'Construction Accidents', 'Occupational Illness', 'Disability Claims']}
          subtitle={'One of our goals is to protect your rights throughout the claims process. We stand for injured workers across New Jersey, ensuring they receive the benefits and medical care to which they are entitled under state workers’ compensation laws'}
        />
        
        <ModernPracticeCard
          image1={'/assets/images/munic.jpg'}
          title={'Municipal Court & Traffic Matters'}
          id={4}
          subAreas={['Traffic Violations', 'DWI Defense', 'Disorderly Conduct', 'License Suspension']}
          subtitle={'Let us advocate for you, protect your record, and save you from unnecessary penalties. We represent clients in New Jersey municipal courts for traffic violations and related matters, working to minimize penalties, protect driving records, and resolve cases efficiently.'}
        />
      </div>

      {/* Bottom CTA */}
      <div className="mt-8">
        <Link
          href="/contact"
          className="btn text-center"
        >
          Schedule Free Consultation
        </Link>
      </div>
    </div>
  );
};

export default PracticeArea;