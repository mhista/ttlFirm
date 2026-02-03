"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong, FaChevronRight } from "react-icons/fa6";

const ModernPracticeCard = ({ image1, title, subtitle, id, subAreas = [] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section with Gradient Overlay */}
      <div className="relative h-[280px] sm:h-[320px] overflow-hidden">
        <Image
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={image1}
          width={500}
          height={320}
          alt={title}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Title on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="font-lora text-white text-2xl md:text-3xl font-bold mb-2">
            {title}
          </h2>
          {subAreas.length > 0 && (
            <p className="text-amber-400 text-sm font-medium">
              {subAreas.length} Services Available
            </p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {subtitle}
        </p>

        {/* Sub-Areas List */}
        {subAreas.length > 0 && (
          <div className="mb-6 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Our Services:
            </p>
            {subAreas.slice(0, 4).map((area, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-amber-600 transition-colors"
              >
                <FaChevronRight className="text-amber-600 text-xs flex-shrink-0" />
                <span>{area}</span>
              </div>
            ))}
            {subAreas.length > 4 && (
              <p className="text-xs text-gray-500 italic pl-5">
                +{subAreas.length - 4} more services
              </p>
            )}
          </div>
        )}

        {/* CTA Button */}
        <Link
          href={`/practice/${id}`}
          className="group/btn inline-flex items-center gap-2 text-amber-600 font-semibold text-sm hover:text-amber-700 transition-all"
        >
          <span>Explore Services</span>
          <FaArrowRightLong
            className={`transition-transform duration-300 ${
              isHovered ? "translate-x-2" : "translate-x-0"
            }`}
          />
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-amber-600/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
    </div>
  );
};

export default ModernPracticeCard;