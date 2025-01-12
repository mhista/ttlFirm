import Image from "next/image";
import Link from "next/link";


const BlogContainer = ()=>{
    return (
        <div className="bg-white flex flex-col items-center z-[60]">
          <div className="z-[60]">
            <Image
              className=" relative z-30  w-[300px]  h-[170px] sm:w-[450px] sm:h-[220px] md:w-[530px]  md:h-[250px]  lg:w-[800px] lg:h-[300px] object-cover hover:opacity-90"
              src="/assets/images/work.jpg"
              width={300}
              height={250}
              alt="law"
            />
          </div>
          <div className="flex flex-col max-w-[300px] sm:max-w-[450px] md:max-w-[530px] lg:max-w-[800px] p-14 gap-4 bg-white">
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="text-2xl font-medium font-lora hover:text-gray-600">
                Unmarried Parents in California – Child Custody Issues
              </h2>
              <p className="mt-3 text-gray-700">
                I neglect my talentsFar far away, behind the word mountains, far
                from the countries Vokalia and Consonantia, there live the blind
                texts. Separated they live in Bookmarksgrove right at the coast
                of the Semantics, a large language ocean. A...
              </p>
            </div>
            <div className="flex flex-col items-start w-full text-gray-500">
              <h5>January 10, 2025</h5>
              <div className="flex flex-wrap w-full flex-row ">
                <span className="flex gap-2 items-center opacity-85 p-3">
                  <div className="h-[3px] w-[3px] rounded-full bg-amber-600"></div>
                  <p className=" ">John Smith</p>
                </span>
                <span className="flex gap-2 items-center opacity-85 p-3">
                  <div className="h-[3px] w-[3px] rounded-full bg-amber-600"></div>
                  <p className=" ">Bankruptcy, Family</p>
                </span>
              </div>
              <Link
                href=""
                className="btn w-32 sm:w-36 text-center hover:text-black z-30 mt-3"
              >
                READ MORE
              </Link>
            </div>
          </div>
        </div>
    )
}

export default BlogContainer;