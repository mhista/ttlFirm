"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

/**
 * Short "about the firm" block for the homepage / about page.
 * Copy now describes the two practice areas the firm actually runs.
 */
const AboutUs = ({ content }) => {
  const eyebrow = content?.sectionLabel || "Who We Are";
  const heading = content?.heading || "A New Jersey firm built around injured clients";
  const image = content?.image || "/assets/images/lawyer.jpg";

  const paragraphs =
    content?.paragraphs && content.paragraphs.length > 0
      ? content.paragraphs
      : [
          "At The Turuchi Law Firm we represent people who have been hurt — in a crash, on someone else's property, or on the job — and who are now dealing with an insurance company that does this every day and does not have their interests at heart.",
          "Our practice is deliberately focused. Personal injury and workers' compensation are what we do, which means your case is handled by an attorney who knows how these claims are valued, defended and settled, rather than one splitting attention across a dozen unrelated areas of law.",
          "Attorney Turuchi Iheanachor previously worked on the insurance defence side. That experience shapes how every case here is built: for the number the carrier will actually pay, not the one it opens with.",
        ];

  return (
    <div className="container-x section-y">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="relative" data-aos="fade-right">
          <div className="overflow-hidden rounded-xl">
            <Image
              src={image}
              width={720}
              height={840}
              alt="Attorney Turuchi Iheanachor"
              className="h-[380px] w-full object-cover object-top sm:h-[460px] lg:h-[560px]"
            />
          </div>
          <div
            className="pointer-events-none absolute -bottom-5 -right-4 hidden h-32 w-32 rounded-xl border-[6px] border-accent-500/25 lg:block"
            aria-hidden="true"
          />
        </div>

        {/* Copy */}
        <div>
          <div className="flex items-center gap-3">
            <span className="rule" aria-hidden="true" />
            <span className="eyebrow">{eyebrow}</span>
          </div>

          <h2 className="h-section mt-5">{heading}</h2>

          <div className="mt-6 space-y-4">
            {paragraphs.map((text, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-muted md:text-base">
                {text}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/profile" className="btn-navy">
              Meet the Attorney
              <FaArrowRightLong className="text-xs" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn-outline-dark">
              Free Case Review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
