import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import {socialLinks} from "@components/common/mediaButtons";

const Nav = () => {
 

  

  return (
    <nav className="w-full z-50 absolute">
      <div className="hidden sm:flex justify-between px-20  items-center p-6 h-4 bg-amber-600">
        <div className="flex justify-between items-center gap-4">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.icon}
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center gap-7 text-white px-4">
          <Link
            href=""
            className=" flex justify-between items-center gap-2 hover:text-blue-200"
          >
            <FaPhone />
            <span className="text-sm">732-210-6410</span>
          </Link>
          <Link
            href=""
            className=" flex justify-between hover:text-blue-200  items-center gap-2"
          >
            <FaEnvelope />
            <span className="text-center mb-1 text-sm">
              info@turuchilawfirm.com
            </span>
          </Link>
        </div>
      </div>
     
    </nav>
  );
};

export default Nav;
