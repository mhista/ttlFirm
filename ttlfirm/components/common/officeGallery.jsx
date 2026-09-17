import Image from "next/image";
import { FaLocationDot, FaArrowUpRightFromSquare } from "react-icons/fa6";
import Reveal from "@components/common/reveal";
import { getOffices } from "@/lib/siteNav";

/**
 * Photographs of the office building.
 *
 * The client's note was specific: "I want to add pictures of the exterior of
 * my office to the website. Do not pin it to Google, I am just adding it as a
 * photo." So this is exactly that — images on the page, no Maps embed, no
 * Business Profile upload, nothing that would create a location listing. The
 * only Google link is the ordinary directions link the address rows already
 * carry, which is a link out, not a pin.
 *
 * It exists because a firm whose address is not yet on Google has nothing else
 * to prove it is a real place. A photograph of the building does that work.
 *
 * Both photos render on every breakpoint; the layout is a 12-column split that
 * stacks under `md`. The wide crop is used on phones, where a tall portrait
 * shot of a tower wastes most of the screen.
 */

const DEFAULT_PHOTOS = [
  {
    src: "/assets/images/office-gateway-street.jpg",
    alt: "3 Gateway Center, Newark — street view of the entrance on Raymond Boulevard",
    width: 1600,
    height: 1903,
  },
  {
    src: "/assets/images/office-gateway-tower.jpg",
    alt: "3 Gateway Center, Newark — the tower seen from Gateway Plaza",
    width: 1400,
    height: 1867,
  },
];

const OfficeGallery = ({ contact, heading, description, photos }) => {
  const offices = getOffices(contact);
  const primary = offices[0];
  const shots = photos?.length ? photos : DEFAULT_PHOTOS;

  return (
    <section className="bg-navy-950 text-white">
      <div className="container-x section-y">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* ----------------------------------------------------------- copy */}
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="rule" aria-hidden="true" />
              <span className="eyebrow text-accent-400">Our office</span>
            </div>

            <h2 className="h-section mt-5 text-white">
              {heading || "Come and see us at 3 Gateway Center"}
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-navy-200 md:text-base">
              {description ||
                "The firm sits on the 12th floor of 3 Gateway Center in downtown Newark, a few minutes' walk from Newark Penn Station and directly off the Raymond Boulevard entrance. There is public parking in the Gateway complex."}
            </p>

            {primary && (
              <div className="mt-8 flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-5">
                <FaLocationDot
                  className="mt-1 shrink-0 text-sm text-accent-500"
                  aria-hidden="true"
                />
                <div>
                  {primary.lines.map((line) => (
                    <span key={line} className="block text-[15px] text-navy-100">
                      {line}
                    </span>
                  ))}
                  <a
                    href={primary.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-accent-400 transition-colors hover:text-white"
                  >
                    Get directions
                    <FaArrowUpRightFromSquare className="text-[9px]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </Reveal>

          {/* --------------------------------------------------------- photos */}
          <Reveal className="lg:col-span-7" delay={120}>
            <div className="grid gap-4 sm:grid-cols-2">
              {shots.slice(0, 2).map((photo) => (
                <figure
                  key={photo.src}
                  className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 sm:aspect-[3/4]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-navy-400">
              3 Gateway Center · Newark, New Jersey
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default OfficeGallery;
