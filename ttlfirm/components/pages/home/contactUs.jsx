"use client";
import Form from "@components/common/form";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import { socialLinks2 } from "@components/common/mediaButttons2";

// ✅ Multiple phones and addresses — edit these arrays to add more
const phones = [
  { number: "+17322106410", display: "732-210-6410" },
  { number: "+8482286402", display: "848-228-6402" }, // Uncomment to add second number
];

const addresses = [
  {
    text: "111 Town Square Pl, Jersey City, NJ 07310",
    mapsUrl: "https://maps.google.com/?q=111+Town+Square+Pl+Jersey+City+NJ+07310",
  },
  {
    text: "30 Knightsbridge Road, Suite 525, Piscataway, New Jersey 08854",
   mapsUrl: "https://maps.google.com/?q=30+Knightsbridge+Road+Suite+525+Piscataway+NJ+08854",
  },
];

const email = "info@turuchilawfirm.com";

const ContactUs = () => {
  return (
    <div className="w-full py-7">
      <div className="w-full hidden md:flex flex-col items-center justify-around gap-3 md:mt-7">
        <h1 className="font-lora text-4xl font-medium">
          Leave us your info and we will get back to you
        </h1>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between px-5 md:px-10 gap-6 md:gap-8">
        {/* Left: Contact Info */}
        <div className="w-full flex flex-col sm:items-start gap-8 sm:p-10 md:p-0 md:pb-12">
          <h1 className="font-serif text-5xl md:text-6xl opacity-90">
            Consult a Reliable New Jersey Law Firm
          </h1>
          <p className="text-lg text-gray-800">
            Confide in a trusted law firm in New Jersey. We will review your
            situation and answer your questions. Then we'll provide legal
            options tailored to your needs.
          </p>

          <div className="flex flex-col gap-4 text-black">
            {/* ✅ Multiple Phone Numbers */}
            {phones.map((phone, i) => (
              <Link
                key={i}
                href={`tel:${phone.number}`}
                className="flex items-center gap-2 hover:text-blue-700"
              >
                <FaPhone />
                <span className="text-lg">{phone.display}</span>
              </Link>
            ))}

            {/* Email */}
            <Link
              href={`mailto:${email}`}
              className="flex hover:text-blue-700 items-center gap-2"
            >
              <FaEnvelope />
              <span className="text-center mb-1 text-lg">{email}</span>
            </Link>

            {/* ✅ Multiple Addresses */}
            {addresses.map((addr, i) => (
              <Link
                key={i}
                href={addr.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex hover:text-blue-700 justify-start items-start gap-2"
              >
                <FaLocationDot className="mt-1 flex-shrink-0" />
                <span className="text-lg">{addr.text}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-start gap-4 pr-4 text-lg text-dark">
            {socialLinks2.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="relative section1 w-full flex flex-col justify-around items-center gap-5 md:gap-10 z-30 md:py-20">
          <div className="w-full flex flex-col md:flex-row flex-wrap lg:px-0 gap-12 items-center justify-center">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;