import Link from "next/link";

const Consultation = ()=>{
    return (<div className="relative w-full flex flex-col items-center gap-7 md:px-20 lg:px-24 py-10 md:py-20 text-white ">
    <div className=" flex flex-row items-center gap-3">
          <hr className="bg-white h-[2px] w-14" />
          <h3 className="text-center text-md uppercase font-lora inline font-bold">
            Free case evaluation
          </h3>
          <hr className="bg-white h-[2px] w-14" />

      </div>
      <p className="text-4xl w-1/2 text-center font-bold">
        Need help with any legal issues? feel free to
      </p>
      <Link href='#' className="btn2 w-40 text-center">
        Consult Us
      </Link>
      <div className="absolute h-[100px] w-[150px] bg-white opacity-20 top-1 right-10"></div>
      <div className="absolute h-[100px] w-[150px] bg-white opacity-20 top-10 right-0"></div>
      <div className="absolute h-[100px] w-[150px] bg-white opacity-20 bottom-0 left-0"></div>
      <div className="absolute h-[50px] w-[50px] bg-white opacity-20 top-24 left-28"></div>



    </div>)
}

export default Consultation;