import Form from "@components/common/form";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { socialLinks } from "@components/common/mediaButtons";
import { socialLinks2 } from "@components/common/mediaButttons2";

const ContactUs = () => {
  return (
    <div className="w-full py-7">
     <div className="w-full hidden md:flex flex-col items-center justify-around gap-3 md:mt-7">
     <h1 className="font-lora text-4xl font-medium">Leave us your info</h1>

<h1 className="font-lora text-xl ">and we will get back to you</h1>
     </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-5 md:px-10 gap-6 md:gap-8">
        <div className="w-full flex flex-col items-center sm:items-start gap-8 sm:p-10 md:p-0 md:pb-12 " data-aos="fade-right">
          <h1 className="font-serif text-5xl md:text-6xl opacity-90">
            Free Consultation
          </h1>
          <p className="text-lg text-gray-800">
          Law is a complex matter that can lead to significant problems if disregarded. Allow us to assist you!
          </p>
          <div className="flex flex-col  gap-4 text-black ">
            <Link
              href=""
              className=" flex  items-center gap-2 hover:text-blue-200"
            >
              <FaPhone />
              <span className="text-lg">732-210-6410</span>
            </Link>
            <Link
              href=""
              className=" flex hover:text-blue-200  items-center gap-2"
            >
              <FaEnvelope />
              <span className="text-center mb-1 text-lg">
                info@turuchilawfirm.com
              </span>
            </Link>

            <Link
              href=""
              className=" flex  hover:text-blue-200 justify-start  items-center gap-2"
            >
              <FaLocationDot />
              <span className=" text-lg">
                111 Town Square Pl, Jersey City, NJ 07310
              </span>
            </Link>
          </div>

          <div className="flex justify-between items-start gap-4 pr-4 text-lg text-dark">
            {socialLinks2.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative section1 w-full flex flex-col justify-around items-center gap-5 md:gap-10 z-30 md:py-20" data-aos="fade-left">
          <div className="w-full flex flex-col md:flex-row  flex-wrap  lg:px-0 gap-12 items-center justify-center">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
