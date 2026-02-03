"use client";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaCalendarCheck } from "react-icons/fa6";

const Consultation = () => {
  return (
    <div className="relative w-full overflow-hidden py-16 md:py-24 px-5 md:px-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <div className="flex flex-row items-center justify-center gap-3 mb-4">
            <hr className="bg-amber-400 h-[2px] w-14" />
            <h3 className="text-amber-400 text-sm uppercase font-bold tracking-wider">
              Free Case Evaluation
            </h3>
            <hr className="bg-amber-400 h-[2px] w-14" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-lora leading-tight">
            Confide in a Trusted Law Firm in New Jersey
          </h2>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We will review your situation and answer your questions. Then we'll provide 
            legal options tailored to your needs.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FaPhone className="text-white text-2xl" />
            </div>
            <h4 className="text-white font-semibold text-lg mb-2">Call Us</h4>
            <a href="tel:+17322106410" className="text-amber-400 hover:text-amber-300 transition">
              (732) 210-6410
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h4 className="text-white font-semibold text-lg mb-2">Email Us</h4>
            <a href="mailto:info@turuchilawfirm.com" className="text-amber-400 hover:text-amber-300 transition text-sm">
              info@turuchilawfirm.com
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FaCalendarCheck className="text-white text-2xl" />
            </div>
            <h4 className="text-white font-semibold text-lg mb-2">Schedule</h4>
            <p className="text-gray-300 text-sm">Free Consultation</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up">
          <Link
            href="/contact"
            className="group relative px-8 py-4 bg-amber-600 text-white font-semibold rounded-lg overflow-hidden hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            <span className="relative z-10">Schedule Free Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>

          <a
            href="tel:+17322106410"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
          >
            Call Now: (732) 210-6410
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-300">Cases Handled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">8</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">7</div>
              <div className="text-sm text-gray-300">NJ Counties Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-300">Free Consultation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;