"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dianne Russell",
      role: "Business Owner",
      image: "https://via.placeholder.com/150", // Replace with real images
      text: "Working with Turuchi Law Firm was a game-changer for my business. Their team provided expert legal advice that saved me from a potentially damaging lawsuit. They were professional, responsive, and genuinely cared about my case. I can't recommend them highly enough",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Civil Litigation client",
      image: "https://via.placeholder.com/150",
      text: "The attorneys at Turuchi Law Firm were incredibly knowledgeable and compassionate during my legal battle. They walked me through every step of the process and ensured I understood my rights. Thanks to them, I was able to get justice and peace of mind",
    },
    {
      id: 3,
      name: "Jane Eze",
      role: "Real Estate Investor",
      image: "https://via.placeholder.com/150",
      text: "Turuchi Law Firm's attention to detail and dedication to my case was exceptional.  ",
    },
  ];
  return (
    <div className="relative flex flex-col items-center gap-4 py-10 md:py-20 ">
      <div className="flex flex-row items-center justify-center gap-3">
        <hr className="bg-amber-600 h-1 w-14" />
        <h3 className="text-amber-600 text-lg uppercase font-serif inline font-bold">
          What they say
        </h3>
        <hr className="bg-amber-600 h-1 w-14" />
      </div>
      <h2 className=" font-bold text-center text-3xl sm:text-4xl md:text-5xl">What our clients say</h2>
      <div className="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-6xl mx-auto sm:py-10 px-12 sm:px-4">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={true}
          // slidesPerView={1.3} // Show one full slide with parts of adjacent slides
          // spaceBetween={30} // Add space between slides
          centeredSlides={true} // Center the active slide
          loop={true} // Make the carousel infinite
          className="rounded-lg"
          breakpoints={{
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
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col sm:flex-row gap-3 items-center bg-white my-5  p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 h-[455px] sm:h-[250px]">
                <div className=" sm:w-1/4">
                  <Image
                    className="rounded-lg sm:rounded-none relative z-30 w-[270px] sm:w-[250px] h-[200px] object-cover"
                    src="/assets/images/lawyer.jpg"
                    width={500}
                    height={600}
                    alt="law"
                  />
                </div>
                <div className="flex flex-col justify-between sm:justify-normal h-full mt-4 sm:w-3/4 gap-2">
                  <div>
                    <p className="italic text-gray-500 text-sm md:text-base">
                      {testimonial.text}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
