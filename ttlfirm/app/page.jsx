import Section1 from "@components/common/section1";
import Section2 from "@components/common/section2";
import Section3 from "@components/common/section3";
import Section4 from "@components/common/section4";
import AboutUs from "@components/pages/home/aboutUs";
import Consultation from "@components/pages/home/consult";
import PracticeArea from "@components/pages/home/practiceAreas";
import TestimonialCarousel from "@components/pages/home/testimonial";
import WhyChooseUs from "@components/pages/home/whyChooseUs";

const Home = () => {
  return (
    <div className="relative h-[full]">
      <Section1>
        <AboutUs />
      </Section1>
      <Section2>
        <PracticeArea/>
      </Section2>
      <Section3>
        <WhyChooseUs/>
      </Section3>

      <Section4>
        <Consultation/>
      </Section4>
      <Section2>
       <TestimonialCarousel />
      </Section2>
    </div>
  );
};

export default Home;
