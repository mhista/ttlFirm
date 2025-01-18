"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {register} from "swiper/element/bundle";
import useSwiperRef from "@utils/swiper_navigation_hook";
import { FaAngleLeft, FaAngleRight  } from "react-icons/fa6";
register();
const TestimonialCarousel = () => {
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();

  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
  
    const params = {
      loop: true,
      // pagination:true,
      // navigation: true,
      centeredSlides:true,
      autoplay:true,
      breakpoints:{
        // Small screens (e.g., mobile)
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        // Medium screens (e.g., tablets)
        768: {
          slidesPerView: 1.2,
          spaceBetween: 30,
        },
        // Large screens (e.g., desktops)
        1024: {
          slidesPerView: 1.3,
          spaceBetween: 30,
        },
        // Extra-large screens
        1280: {
          slidesPerView: 1.5,
          spaceBetween: 30,
        },
      }
    };
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);
  const testimonials = [
    {
      id: 1,
      name: "Kimberly Zamora",
      role: "Client",
      image: "https://via.placeholder.com/150", // Replace with real images
      text: "Originally, I had little to no faith in my case but my lawyer, Turuchi assured me that she would fight hard and to be patient. She is so passionate in this line of work and it’s so admirable. She honestly gave me more than a win; she gave me happiness!",
    },
    {
      id: 2,
      name: "John Peterson",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "I cannot thank Turuchi enough for the amazing work she did on my case. She was thorough, professional, and always had my best interests at heart. I wouldn’t hesitate to recommend her to anyone in need of legal assistance!",
    },
    {
      id: 3,
      name: "Sandra Mitchell",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "Turuchi’s attention to detail and expertise were evident from the start. She walked me through every step of the process, and the outcome was better than I could have imagined. I’m so grateful for her support.",
    },
    {
      id: 4,
      name: "Michael Adeyemi",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "Attorney Turuchi was a lifesaver during a very stressful time in my life. She was not only knowledgeable but also incredibly kind and patient. Her dedication to my case made all the difference.",
    },
    {
      id: 5,
      name: "Chloe Ramirez",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "Working with Turuchi was the best decision I made. She explained everything in plain terms, kept me informed, and achieved a great result. She is an excellent lawyer who truly cares about her clients.",
    },
    {
      id: 6,
      name: "Daniel Owens",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "She exceeded all my expectations. Her professionalism and expertise gave me confidence throughout the entire process. I couldn’t have asked for better representation.",
    },
    {
      id: 7,
      name: "Aisha Hassan",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "I was so impressed with Turuchi’s ability to simplify complex legal issues. She was always available to answer my questions and fought tirelessly for the best possible outcome.",
    },
    {
      id: 8,
      name: "Victor Thompson",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "She took my case when I thought I had no hope. Her dedication and thorough research turned everything around. I can’t recommend her highly enough!",
    },
    {
      id: 9,
      name: "Grace Udo",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "Turuchi was exceptional in handling my matter. Her knowledge of the law and ability to strategize were instrumental in achieving a favorable outcome. I’m so grateful for her help!",
    },
    {
      id: 10,
      name: "James Carter",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "She went above and beyond for me. Her professionalism, compassion, and unwavering commitment made the entire process smooth and successful. I’m forever thankful for her support.",
    },
    {
      id: 11,
      name: "Emily Zhang",
      role: "Client",
      image: "https://via.placeholder.com/150",
      text: "From start to finish, Turuchi was incredible. She took the time to understand my situation, communicated clearly, and delivered outstanding results. I highly recommend her to anyone seeking legal help.",
    },
  ];
  
  return (
    <div className="relative flex flex-col items-center gap-4 py-10 md:py-20 ">
      <div className="flex flex-row items-center justify-center gap-3">
        <hr className="bg-amber-600 h-1 w-14" />
        <h3 className="text-amber-600 text-lg uppercase font-lora inline font-bold">
          What they say
        </h3>
        <hr className="bg-amber-600 h-1 w-14" />
      </div>
      <h2 className=" font-bold text-center text-3xl sm:text-4xl md:text-5xl">What our clients say</h2>
      <div className="relative max-w-[350px] sm:max-w-xl md:max-w-3xl lg:max-w-6xl mx-[5px] sm:py-10 px-4 sm:px-4">
        <swiper-container ref={swiperRef} init="false"
        >
          {testimonials.map((testimonial) => (
            <swiper-slide key={testimonial.id}>
              <div className=" flex flex-col sm:flex-row gap-2 sm:gap-3 items-center bg-white my-5  py-8 px-4 rounded-lg shadow transition-transform duration-300 transform hover:scale-105 h-[350px] sm:h-[240px]">
                {/* <div className=" sm:w-1/4">
                  <Image
                    className="rounded-lg sm:rounded-none relative z-30 w-[270px] sm:w-[250px] h-[200px] object-cover"
                    src="/assets/images/lawyer.jpg"
                    width={500}
                    height={600}
                    alt="law"
                  />
                </div> */}
                <div className="flex flex-col justify-between sm:justify-normal h-full mt-4  gap-3 px-5">
                  <div>
                    <p className="italic text-gray-500  md:text-lg">
                      {testimonial.text}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
        <button ref={prevElRef} onClick={
          () => {
          console.log(prevElRef);
            
            swiperRef.current.swiper.slidePrev()}} className="swiper-button-prev absolute  z-50 top-1/2 transform -translate-y-1/2 md:bg-gray-800 text-gray-800 md:text-white p-2.5 rounded-lg md:shadow-lg md:hover:bg-gray-700 transition left-[15px] sm:left-[2px] md:left-[70px] lg:left-[185px]">
        <FaAngleLeft className="text-xl md:text-base"/>

      </button>
      <button ref={nextElRef} onClick={() => swiperRef.current.swiper.slideNext()} className="swiper-button-next  absolute  top-1/2 transform -translate-y-1/2 md:bg-amber-600 text-amber-600 md:text-white p-2.5 rounded-lg md:shadow-lg md:hover:bg-amber-500 transition right-[15px] sm:right-[2px] md:right-[70px]  lg:right-[185px] z-50">
      <FaAngleRight className="text-xl md:text-base"/>

      </button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
