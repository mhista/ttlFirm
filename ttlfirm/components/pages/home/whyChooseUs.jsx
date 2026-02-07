"use client";
import { useEffect } from "react";
import AOS from "aos";
import Link from "next/link";
import { FaCheckCircle, FaBalanceScale, FaHandshake, FaComments, FaMapMarkerAlt, FaUserTie } from "react-icons/fa";

// Icon mapping
const iconMap = {
  FaBalanceScale,
  FaComments,
  FaMapMarkerAlt,
  FaHandshake,
  FaCheckCircle,
  FaUserTie
};

const FeatureCard = ({ icon: iconName, title, description, delay }) => {
  const Icon = iconMap[iconName] || FaCheckCircle;
  
  return (
    <div
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
            <Icon className="text-white text-xl" />
          </div>
        </div>
        <div>
          <h3 className="text-white font-lora text-xl font-semibold mb-2">
            {title}
          </h3>
          <p className="text-gray-200 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ number, label, delay }) => {
  return (
    <div
      className="text-center"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
        <div className="text-5xl md:text-6xl font-bold text-amber-400 mb-2">
          {number}
        </div>
        <div className="text-gray-200 text-sm uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = ({ content, stats }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Default features if not provided by CMS
  const defaultFeatures = [
    {
      icon: "FaBalanceScale",
      title: "Personalized Legal Strategy",
      description: "Every case is handled with a customized legal strategy shaped by the client's unique circumstances, objectives, and concerns."
    },
    {
      icon: "FaComments",
      title: "Clear, Honest Communication",
      description: "We believe effective representation begins with clear and honest communication."
    },
    {
      icon: "FaMapMarkerAlt",
      title: "Experience with New Jersey Courts",
      description: "Our firm has practical experience representing clients in state, municipal, and federal courts throughout New Jersey."
    },
    {
      icon: "FaHandshake",
      title: "Compassionate Representation",
      description: "We approach every matter with empathy, professionalism, and respect."
    },
    {
      icon: "FaCheckCircle",
      title: "Free Initial Consultation",
      description: "We offer a free initial consultation so prospective clients can speak directly with a knowledgeable New Jersey attorney."
    },
    {
      icon: "FaUserTie",
      title: "Meet Attorney Turuchi Iheanachor",
      description: "With prior experience as an insurance defense attorney, Turuchi brings a strategic advantage to every case."
    }
  ];

  // Use CMS content or defaults
  const sectionLabel = content?.sectionLabel || "Why Trust Us";
  const heading = content?.heading || "Why Clients Choose Our Legal Team";
  const description = content?.description || "We believe in the power of personalized attention and transparent communication. Individuals and families seeking a reliable New Jersey attorney choose our firm because we combine legal knowledge with genuine care and local experience.";
  const features = content?.features && content.features.length > 0 ? content.features : defaultFeatures;
  const ctaText = content?.ctaText || "Learn More About Attorney Turuchi Iheanachor";
  const ctaLink = content?.ctaLink || "/profile";

  // Stats
  const casesHandled = stats?.casesHandled || 500;
  const yearsExperience = stats?.yearsExperience || 8;

  return (
    <div className="relative w-full py-16 md:py-24 px-5 md:px-12 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <div className="flex flex-row items-center justify-center gap-3 mb-4">
            <hr className="bg-amber-600 h-[2px] w-14" />
            <h3 className="text-amber-400 uppercase font-bold tracking-wider">
              {sectionLabel}
            </h3>
            <hr className="bg-amber-600 h-[2px] w-14" />
          </div>
          <h2 className="font-lora text-4xl md:text-5xl font-bold text-white mb-6">
            {heading}
          </h2>
          <p className="text-gray-200 text-lg max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-16 max-w-2xl mx-auto">
          <StatCard number={`${casesHandled}+`} label="Legal Cases Handled" delay="100" />
          <StatCard number={yearsExperience} label="Years Industry Experience" delay="200" />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="600">
          <Link
            href={ctaLink}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;