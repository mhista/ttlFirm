import Image from "next/image";
import Link from "next/link";
import { socialLinks2 } from "@components/common/mediaButttons2";
const ImageSection = ({image})=>{
    return (
        <div className="z-[60] ">
        <Image
          className="rounded relative  w-[300px]  h-[450px] sm:w-[450px] sm:h-[630px] md:w-[260px]  md:h-[350px]  lg:w-[700px] lg:h-[700px] object-cover z-[60]"
          src={image}
          width={300}
          height={250}
          alt="law"
        />
        {/* name and profession */}
        <div className="flex flex-col gap-7 mt-5">
          <div className="flex flex-col gap-2"> 
            <h1 className="font-lora text-2xl font-medium">Turuchi S. Iheanachor, Esq.</h1>
            <h5 className="text-gray-500">Founder & Managing Attorney</h5>
          </div>
          <div className=" flex flex-col gap-3">
            <span className="flex gap-3 opacity-85">
              <h6 className="font-bold">Email</h6>
              <p>info@turuchilawfirm.com</p>
            </span>
            <span className="flex gap-3 opacity-85">
              <h6 className="font-bold">Phone</h6>
              <p>732-210-6410</p>
            </span>
          </div>
          {/* social links */}
          <div className="flex gap-5 items-center text-lg">
                  {socialLinks2.map((link, index) => (
                    <Link key={index} href={link.href}>
                      {link.icon}
                    </Link>
                  ))}
                </div>
        </div>
      </div>
    )
}

export default ImageSection;