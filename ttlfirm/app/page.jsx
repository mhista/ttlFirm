import Countdown from "@components/common/countdown";
import Section1 from "@components/common/section1";
import Section2 from "@components/common/section2";
import Section3 from "@components/common/section3";
import Section4 from "@components/common/section4";
import AboutUs from "@components/pages/home/aboutUs";
import Consultation from "@components/pages/home/consult";
import ContactUs from "@components/pages/home/contactUs";
import PracticeArea from "@components/pages/home/practiceAreas";
import TestimonialCarousel from "@components/pages/home/testimonial";
import Header from "@components/layout/header";

import WhyChooseUs from "@components/pages/home/whyChooseUs";
import HomeHero from "@components/pages/home/hero";

const Home = () => {
  const height1 = "1200";
  const height2 = "600";
  const height3 = "800";
  return (
    <div className="relative h-[full]">
          <Header height1={"1200"} height2={height2} height3={height3}>
            <HomeHero height1={1200} height2={height2} height3={height3} />
          </Header>

    <div className="absolute z-[70]  w-[85%] md:w-[50%] justify-center items-center right-[28px] sm:right-[48px] md:right-11 lg:left-10 top-[1270px] sm:top-[650px] md:top-[800px] md:pr-4 bg-zinc-100  flex flex-row shadow-2xl border-amber-600 border-opacity-90 border-t-[3px] gap:3 md:gap-5 rounded-sm">
        <Countdown countToUse={500} subtitle={'Legal Cases Handled'} sign={'+'} timer={10}/>
        <div className="w-[1px] bg-[#1f385b] h-[70px] md:h-[100px] opacity-75 mr-4 md:mr-0"></div>
        <Countdown countToUse={8} subtitle={'Years of Industry Experience'} timer={100}/>

      </div>
      {/* <Section2>
        <AboutUs />
      </Section2>
       */}
      <Section1>
        <PracticeArea/>
      </Section1>
      <Section3>
        <WhyChooseUs/>
      </Section3>

      <Section4>
        <Consultation/>
      </Section4>
      <Section1>
       <TestimonialCarousel />
      </Section1>
      <Section2>
       <ContactUs/>
      </Section2>
    </div>
  );
};

export default Home;
