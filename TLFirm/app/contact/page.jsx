import Section2 from "@components/common/section2";

import ContactUs from "@components/pages/home/contactUs";

import PageHeader from "@components/pages/header";

const Contact = () => {
  return (
    <div className="relative">
     <PageHeader text={"Contact"} text2={"Us"}/>
      <Section2>
       <ContactUs/>
      </Section2>
    </div>
  );
};

export default Contact;