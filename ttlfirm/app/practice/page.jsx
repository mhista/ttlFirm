import PracticeArea from "@components/pages/home/practiceAreas";
import Section2 from "@components/common/section2";
import Section4 from "@components/common/section4";

import Consultation from "@components/pages/home/consult";


const PracticeAreas = () => {
  return (
    <div className="relative">
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