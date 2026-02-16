"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { socialLinks } from "@components/common/mediaButtons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ✅ UPDATED: Uses slugs instead of numeric IDs
  const footerLinks = [
    { href: "/practice/personal-injury", label: "Personal Injury" },
    { href: "/practice/immigration", label: "Immigration" },
    { href: "/practice/workers-compensation", label: "Workers Compensation" },
    { href: "/practice/municipal-court-traffic-matters", label: "Municipal Matters" },
  ];

  const menuLinks = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Attorney Profile" },
    { href: "/about", label: "About" },
  ];

  // ✅ Multiple phones supported
  const phones = [
    { number: "+1 732-210-6410", display: "+1 732-210-6410" },
    // Add second phone here when ready:
    // { number: "+1 555-000-0000", display: "+1 555-000-0000" },
  ];

  // ✅ Multiple addresses supported
  const addresses = [
    { text: "111 Town Square Pl, Jersey City, NJ 07310", mapsUrl: "https://maps.google.com/?q=111+Town+Square+Pl+Jersey+City+NJ+07310" },
    // Add second address here when ready:
    // { text: "123 Main St, Newark, NJ 07101", mapsUrl: "https://maps.google.com/?q=..." },
  ];

  const email = "info@turuchilawfirm.com";

  return (
    <footer className="relative bottom-0 flex flex-col-reverse gap-5 sm:gap-3 w-full bg-[#1c314e] h-auto sm:h-[400px] md:h-[350px] lg:h-[380px] m-0 p-0">
      {/* footer details */}
      <div className="absolute w-full flex flex-col-reverse sm:flex-row justify-around md:items-center bottom-[150px] sm:bottom-[120px] md:bottom-[100px] gap-5 sm:gap-4 pl-8 lg:pl-16">

        {/* Logo & tagline */}
        <div className="w-full flex flex-col gap-5 mb-5 sm:mb-0">
          <Image
            className="w-[150px] sm:w-[100px] lg:w-[150px]"
            src="/assets/images/logo.png"
            width={90}
            height={90}
            alt="Turuchi"
          />
          <p className="text-base sm:text-sm lg:text-base w-5/6 text-white">
            We understand that every case is unique, and working with a trusted law firm in New Jersey provides the guidance and support you need to navigate it with confidence.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex text-white w-full flex-col md:mb-5 lg:mb-10 items-start md:items-center py-6 md:pb-0 lg:items-start gap-5">
          <div className="flex flex-col items-start gap-5">
            <h1 className="font-lora text-xl sm:text-sm lg:text-xl">CONTACT INFORMATION</h1>
            <div className="flex flex-col gap-4 text-white">

              {/* ✅ Multiple Phone Numbers */}
              {phones.map((phone, i) => (
                <Link
                  key={i}
                  href={`tel:${phone.number.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 hover:text-blue-200"
                >
                  <FaPhone />
                  <span className="text-sm">{phone.display}</span>
                </Link>
              ))}

              {/* Email */}
              <Link
                href={`mailto:${email}`}
                className="flex hover:text-blue-200 items-center gap-2"
              >
                <FaEnvelope />
                <span className="text-center mb-1 text-sm">{email}</span>
              </Link>

              {/* ✅ Multiple Addresses */}
              {addresses.map((addr, i) => (
                <Link
                  key={i}
                  href={addr.mapsUrl || ""}
                  target={addr.mapsUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex hover:text-blue-200 justify-start items-start gap-2"
                >
                  <FaLocationDot className="mt-1 flex-shrink-0" />
                  <span className="text-sm">{addr.text}</span>
                </Link>
              ))}

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

        {/* Practice Areas */}
        <div className="flex w-full flex-col gap-5 items-start justify-center text-white md:ml-4">
          <h1 className="font-lora sm:text-sm text-xl">PRACTICE AREAS</h1>
          <div className="flex flex-col items-start text-white gap-4 md:gap-6 font-semibold md:font-normal md:text-base lg:font-semibold">
            {footerLinks.map((link, index) => (
              <Link key={index} href={link.href} className="text-amber-600 hover:text-amber-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex w-full flex-col gap-5 items-start justify-center text-white">
          <h1 className="font-lora md:text-sm text-xl">NAVIGATION</h1>
          <div className="flex flex-col items-start text-white gap-4 md:gap-6 font-semibold md:font-normal md:text-base lg:font-semibold">
            {menuLinks.map((link, index) => (
              <Link key={index} href={link.href} className="text-amber-600 hover:text-amber-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col-reverse md:flex-row w-full bg-[#213147] px-7 gap-3 mt-5 sm:mt-0 md:px-11 lg:px-16 pb-8 justify-between">
        <div>
          <p className="text-white sm:text-base">
            © {currentYear} Turuchi Law Firm. All rights reserved.
          </p>
        </div>
        <div className="lg:pr-5">
          <p className="text-white sm:text-base">
            Built and managed by{" "}
            <a href="https://www.facebook.com/share/14UCpXLsP4/" className="text-blue-200">
              Kymaa Digital Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;