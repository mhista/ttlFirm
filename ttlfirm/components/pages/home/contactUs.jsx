"use client";
import Form from "@components/common/form";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { socialLinks2 } from "@components/common/mediaButttons2";

const ContactUs = ({ contact, social, content, formSettings }) => {
  // Use CMS data or defaults
  const phone = contact?.phone || "732-210-6410";
  const email = contact?.email || "info@turuchilawfirm.com";
  const address = contact?.address || {};
  const addressString = `${address.street || '111 Town Square Pl'}, ${address.city || 'Jersey City'}, ${address.state || 'NJ'} ${address.zipCode || '07310'}`;
  
  const heading = content?.heading || "Consult a Reliable New Jersey Law Firm";
  const description = content?.description || "Confide in a trusted law firm in New Jersey. We will review your situation and answer your questions.";

  const handlePhoneCall = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="w-full py-7">
      <div className="w-full hidden md:flex flex-col items-center justify-around gap-3 md:mt-7">
        <h1 className="font-lora text-4xl font-medium">
          {formSettings?.heading || "Leave us your info and we will get back to you"}
        </h1>
      </div>
      
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-5 md:px-10 gap-6 md:gap-8">
        <div className="w-full flex flex-col sm:items-start gap-8 sm:p-10 md:p-0 md:pb-12">
          <h1 className="font-serif text-5xl md:text-6xl opacity-90">
            {heading}
          </h1>
          <p className="text-lg text-gray-800">
            {description}
          </p>
          
          <div className="flex flex-col gap-4 text-black">
            <Link
              onClick={handlePhoneCall}
              href=""
              className="flex items-center gap-2 hover:text-blue-200"
            >
              <FaPhone />
              <span className="text-lg">{phone}</span>
            </Link>
            <Link
              href={`mailto:${email}`}
              className="flex hover:text-blue-200 items-center gap-2"
            >
              <FaEnvelope />
              <span className="text-center mb-1 text-lg">{email}</span>
            </Link>
            <Link
              href=""
              className="flex hover:text-blue-200 justify-start items-center gap-2"
            >
              <FaLocationDot />
              <span className="text-lg">{addressString}</span>
            </Link>
          </div>

          <div className="flex items-start gap-4 pr-4 text-lg text-dark">
            {socialLinks2.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="relative section1 w-full flex flex-col justify-around items-center gap-5 md:gap-10 z-30 md:py-20">
          <div className="w-full flex flex-col md:flex-row flex-wrap lg:px-0 gap-12 items-center justify-center">
            <Form formSettings={formSettings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;