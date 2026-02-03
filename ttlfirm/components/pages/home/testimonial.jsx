"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { register } from "swiper/element/bundle";
import useSwiperRef from "@utils/swiper_navigation_hook";
import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa6";
import { urlFor } from "@/lib/sanity.client";

register();

const TestimonialCarousel = ({ testimonials = [] }) => {
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    
    const swiperContainer = swiperRef.current;
    const params = {
      loop: testimonials.length > 1,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 1.2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 1.3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 1.5,
          spaceBetween: 30,
        },
      },
    };
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 justify-center mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < rating ? "text-amber-500" : "text-gray-300"
            } text-lg`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center gap-8 py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      {/* Section Header */}
      <div className="text-center px-4" data-aos="fade-down">
        <div className="flex flex-row items-center justify-center gap-3 mb-4">
          <hr className="bg-amber-600 h-1 w-14" />
          <h3 className="text-amber-600 text-sm uppercase font-bold tracking-wider">
            Client Testimonials
          </h3>
          <hr className="bg-amber-600 h-1 w-14" />
        </div>
        <h2 className="font-lora font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Don't just take our word for it. Hear from clients who trusted us with their legal matters.
        </p>
      </div>

      {/* Testimonial Carousel */}
      <div className="relative w-full max-w-[350px] sm:max-w-xl md:max-w-3xl lg:max-w-6xl px-4">
        <swiper-container ref={swiperRef} init="false">
          {testimonials.map((testimonial) => (
            <swiper-slide key={testimonial._id}>
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 my-8 min-h-[300px] flex flex-col">
                {/* Quote Icon */}
                <div className="text-6xl text-amber-600/20 font-serif leading-none mb-4">
                  "
                </div>

                {/* Rating */}
                <StarRating rating={testimonial.rating || 5} />

                {/* Testimonial Text */}
                <div className="flex-1 mb-6">
                  <p className="text-gray-700 text-base md:text-lg italic leading-relaxed text-center">
                    "{testimonial.testimonial}"
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex flex-col items-center gap-4 pt-6 border-t border-gray-100">
                  {/* Client Photo */}
                  {testimonial.image ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-amber-600">
                      <Image
                        src={urlFor(testimonial.image).width(80).height(80).url()}
                        alt={testimonial.image.alt || testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}

                  <div className="text-center">
                    <h4 className="font-bold text-lg text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    {testimonial.caseType && (
                      <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                        {testimonial.caseType.replace('-', ' ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>

        {/* Navigation Buttons */}
        <button
          ref={prevElRef}
          onClick={() => swiperRef.current?.swiper.slidePrev()}
          className="absolute z-50 top-1/2 -translate-y-1/2 left-2 sm:left-0 md:-left-16 bg-white hover:bg-amber-600 text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
          aria-label="Previous testimonial"
        >
          <FaAngleLeft className="text-xl" />
        </button>

        <button
          ref={nextElRef}
          onClick={() => swiperRef.current?.swiper.slideNext()}
          className="absolute z-50 top-1/2 -translate-y-1/2 right-2 sm:right-0 md:-right-16 bg-white hover:bg-amber-600 text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
          aria-label="Next testimonial"
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>

      {/* Trust Badge */}
      <div className="mt-8 text-center" data-aos="fade-up">
        <p className="text-sm text-gray-600 mb-2">Trusted by 500+ clients across New Jersey</p>
        <div className="flex items-center justify-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-amber-500 text-xl" />
            ))}
          </div>
          <span className="text-gray-700 font-semibold">5.0 Average Rating</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;