"use client";
import { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";

/**
 * TailoredCTA Component
 * Matches the WhyChooseUs section design (dark blue background, decorative elements)
 * But without stats and feature cards - just heading, description, and CTA buttons
 * 
 * @param {Object} ctaData - CTA content from Sanity
 * @param {boolean} ctaData.enabled - Show/hide CTA
 * @param {string} ctaData.sectionLabel - Small label above heading (optional)
 * @param {string} ctaData.heading - Main heading
 * @param {string} ctaData.description - Description text (can be long)
 * @param {Array} ctaData.buttons - Array of button objects with text and link
 */
const TailoredCTA = ({ ctaData }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!ctaData?.enabled) return null;

  return (
    <div className="relative w-full py-16 md:py-24 px-5 md:px-12 overflow-hidden bg-[#1c314e]">
      {/* Background Decorations - Same as WhyChooseUs */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10" data-aos="fade-down">
          {/* Optional Section Label */}
          {ctaData.sectionLabel && (
            <div className="flex flex-row items-center justify-center gap-3 mb-4">
              <hr className="bg-amber-600 h-[2px] w-14" />
              <h3 className="text-amber-400 uppercase font-bold tracking-wider text-sm">
                {ctaData.sectionLabel}
              </h3>
              <hr className="bg-amber-600 h-[2px] w-14" />
            </div>
          )}

          {/* Main Heading */}
          <h2 className="font-lora text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {ctaData.heading}
          </h2>

          {/* Description - Can be long */}
          {ctaData.description && (
            <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
              {ctaData.description}
            </p>
          )}
        </div>

        {/* CTA Buttons */}
        {ctaData.buttons && ctaData.buttons.length > 0 && (
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            {ctaData.buttons.map((button, index) => (
              <Link
                key={index}
                href={button.link || '/contact'}
                className={`${
                  index === 0
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border-2 border-white/20'
                } font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TailoredCTA;