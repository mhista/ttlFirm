import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { socialLinks } from "@components/common/mediaButtons";
import Form from "@components/common/form";

const Footer = () => {
  const footerLinks = [
    { href: "#personal_injury", label: "Personal Injury", isDropdown: false },

    { href: "#medmal", label: "Medical Malpractice", isDropdown: false },
    { href: "#estatelit", label: "Estate Litigation", isDropdown: true },
    { href: "#crime", label: "Criminal Defence", isDropdown: true },
    { href: "#car_acc", label: "Car Accident", isDropdown: false },
    { href: "#wrong_death", label: "WroNgful Death", isDropdown: false },
  ];
  return (
    <footer className="relative bottom-0 w-full bg-[#1c314e] h-[1000px] sm:h-[600px] lg:h-[600px] m-0 p-0">
      <Image
        className={`text-white  absolute opacity-5 bottom-0 left-16 lg:left-32 top-20`}
        src="/assets/images/logo.png"
        width={300}
        height={300}
        alt="Turuchi"
      ></Image>
      {/* footer details */}
      <div className="absolute w-full flex flex-col sm:flex-row justify-between md:items-center bottom-5 lg:px-10 gap-4">
        {/* form */}
        <Form />

        {/* informations */}
        <div className="flex flex-col-reverse md:flex-row w-full md:pl-5 lg:pl-10">
          <div className="hidden md:flex w-full flex-col gap-5 item-center md:items-start justify-center text-white">
            <h1 className="font-serif text-xl">PRACTICE AREAS</h1>
            <div className=" flex flex-col items-start text-white uppercase gap-4 md:gap-6 font-semibold md:font-normal md:text-sm lg:font-semibold">
              {footerLinks.map((link, index) => ({
                ...(link.isDropdown ? (
                  <span
                    key={index}
                    className="cursor-pointer hover:text-amber-600"
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    key={index}
                    className="hover:text-amber-600"
                  >
                    {link.label}
                  </Link>
                )),
              }))}
            </div>
          </div>
          <div className="flex text-white w-full  flex-col mb-10 items-center sm:items-start md:items-center pt-6  sm:pr-5 sm:mt-0 lg:items-start gap-5">
            <Image
              className={`sm:w-[100px] md:w[80px] lg:w-[100px]`}
              src="/assets/images/logo.png"
              width={90}
              height={90}
              alt="Turuchi"
            ></Image>
            <div className="flex flex-col items-center sm:items-start gap-5  ">
              <h1 className="font-serif text-xl md:text-sm lg:text-xl">CONTACT INFORMATION</h1>
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
        </div>
      </div>
    </footer>
  );
};
export default Footer;
