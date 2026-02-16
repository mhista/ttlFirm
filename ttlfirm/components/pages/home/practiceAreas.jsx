import ModernPracticeCard from "@components/common/modernPracticeCard";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";

const fallbackImages = [
  '/assets/images/inju.jpg',
  '/assets/images/immig.jpg',
  '/assets/images/work.jpg',
  '/assets/images/munic.jpg',
];

// ✅ Receives practiceAreas as a prop — works in both sync and async parent pages
const PracticeArea = ({ practiceAreas = [] }) => {
  return (
    <div className="relative w-full flex flex-col justify-around items-center gap-8 md:gap-12 z-30 pt-[130px] pb-24 md:pt-32 lg:py-20">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <div className="flex flex-row items-center gap-3">
          <hr className="bg-amber-600 h-[2px] w-14" />
          <h3 className="text-amber-600 text-lg uppercase font-jost inline font-bold">
            What We Do
          </h3>
          <hr className="bg-amber-600 h-[2px] w-14" />
        </div>
        <h1 className="font-lora text-4xl md:text-5xl text-center font-bold">
          Practice Areas
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg">
          Comprehensive legal services tailored to protect your rights and secure your future
        </p>
      </div>

      {/* Practice Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5 md:px-12 lg:px-16 max-w-[1400px]">
        {practiceAreas.map((area, index) => {
          const imageUrl = area.image
            ? urlFor(area.image).width(500).height(320).url()
            : fallbackImages[index] ?? '/assets/images/inju.jpg';

          const subAreaNames = area.subServices?.map((s) => s.title) ?? [];

          return (
            <ModernPracticeCard
              key={area._id}
              image1={imageUrl}
              title={area.name}
              slug={area.slug.current}
              subAreas={subAreaNames}
              subtitle={area.excerpt ?? ''}
            />
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8">
        <Link href="/contact" className="btn text-center">
          Schedule Free Consultation
        </Link>
      </div>
    </div>
  );
};

export default PracticeArea;