import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { socialLinks } from "@components/common/mediaButtons";
import Form from "@components/common/form";

const Footer = () => {
  const footerLinks = [
    { href: "#personal_injury", label: "Personal Injury", isDropdown: false },
    { href: "#immig", label: "Immigration", isDropdown: false },
    { href: "#work", label: "Workers Compensation", isDropdown: true },
    { href: "#municipal", label: "Municipal Matters", isDropdown: true },
   
  ];
  const menuLinks = [
    { href: "/", label: "Home", isDropdown: false },

    { href: "/profile", label: "Attorney Profile", isDropdown: false },
    { href: "/about", label: "About", isDropdown: false },
    { href: "/blog", label: "Blog", isDropdown: false },
    // { href: "#videos", label: "Videos", isDropdown: false },
  ];
  return (
    <footer className="relative bottom-0 w-full bg-[#1c314e] h-[760px] sm:h-[300px] md:h-[320px] lg:h-[350px] m-0 p-0">
      {/* <div className={`absolute w-full z-20 bg-black opacity-40 h-[500] text-center top-0`}></div> */}
      {/* <Image
        className={`text-white  absolute opacity-5 bottom-0 left- top-20`}
        src="/assets/images/logo.png"
        width={300}
        height={300}
        alt="Turuchi"
      ></Image> */}
      {/* footer details */}
      <div className="absolute w-full flex flex-col-reverse sm:flex-row justify-around md:items-center bottom-5 gap-6 sm:gap-4 pl-8 lg:pl-16">
        {/* form */}  
        {/* <Form /> */}
        <div className="w-full flex flex-col gap-5">
        <Image
              className={`w-[150px] sm:w-[100px] lg:w-[150px]`}
              src="/assets/images/logo.png"
              width={90}
              height={90}
              alt="Turuchi"
            ></Image>
            <p className="text-base sm:text-sm lg:text-base w-5/6  text-white">
            {/* Turuchilaw firm is a leading expert in legal profession. Our team of
          experts provides you with unparalleled legal advice and support. */}
            We understand that every case is unique, so we're here to help you
            navigate through it with confidence and support.
          </p>
        </div>
        {/* informations */}
        <div className="flex text-white w-full  flex-col md:mb-5 lg:mb-10 items-start md:items-center py-6 md:pb-0 lg:items-start gap-5">
           
            <div className="flex flex-col items-start gap-5">
              <h1 className="font-lora text-xl sm:text-sm lg:text-xl">CONTACT INFORMATION</h1>
              <div className="flex flex-col  gap-4 text-white ">
                <Link
                  href=""
                  className=" flex  items-center gap-2 hover:text-blue-200"
                >
                  <FaPhone />
                  <span className="text-sm">732-210-6410</span>
                </Link>
                <Link
                  href=""
                  className=" flex hover:text-blue-200  items-center gap-2"
                >
                  <FaEnvelope />
                  <span className="text-center mb-1 text-sm">
                    info@turuchilawfirm.com
                  </span>
                </Link>
                
                <Link
                  href=""
                  className=" flex  hover:text-blue-200 justify-start  items-center gap-2"
                >
                  <FaLocationDot />
                  <span className=" text-sm">
                  111 Town Square Pl,
                  Jersey City, NJ 07310
                  </span>
                </Link>

              </div>
              
              <div className="flex justify-between items-center gap-4 pr-4 text-lg">
                {socialLinks.map((link, index) => (
                  <Link key={index} href={link.href}>
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className=" flex w-full flex-col gap-5 item-center md:items-start justify-center text-white md:ml-4">
            <h1 className="font-lora sm:text-sm text-xl">PRACTICE AREAS</h1>
            <div className=" flex flex-col items-start text-white  gap-4 md:gap-6 font-semibold md:font-normal md:text-base lg:font-semibold">
              {footerLinks.map((link, index) => ({
                ...(link.isDropdown ? (
                  <span
                    key={index}
                    className="cursor-pointer text-amber-600"
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    key={index}
                    className="text-amber-600"
                  >
                    {link.label}
                  </Link>
                )),
              }))}
            </div>
          </div>
          <div className="hidden md:flex w-full flex-col gap-5 item-center md:items-start justify-center text-white">
          <h1 className="font-lora md:text-sm text-xl">NAVIGATION</h1>
          <div className=" flex flex-col items-start text-white  gap-4 md:gap-6 font-semibold md:font-normal md:text-base lg:font-semibold">

          {menuLinks.map((link, index) => ({
            ...(link.isDropdown ? (
              <span key={index} className="cursor-pointer text-amber-600">
                {link.label}
              </span>
            ) : (
              <Link
                href={link.href}
                key={index}
                className="text-amber-600"
              >
                {link.label}
              </Link>
            )),
          }))}
          </div>
          </div>
        </div>
    </footer>
  );
};
export default Footer;
