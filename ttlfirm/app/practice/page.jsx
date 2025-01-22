import PracticeArea from "@components/pages/home/practiceAreas";
import Section2 from "@components/common/section2";
import Section4 from "@components/common/section4";

import Consultation from "@components/pages/home/consult";
import PageHeader from "@components/pages/header";


const PracticeAreas = () => {
  return (
    <div className="relative">
    <PageHeader text={"Our Practice"} text2={"Areas"} subAreas={["Personal Injury", "Immigration", "Worker's Compensation", "Municipal Matters"]}/>

      <Section2>
        <PracticeArea />
      </Section2>
      <Section4>
        <Consultation/>
      </Section4>
    </div>
  );
};

export default PracticeAreas;