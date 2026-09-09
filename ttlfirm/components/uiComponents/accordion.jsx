"use client";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Accordion = ({ usePadding, title, accordionData = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!accordionData.length) return null;

  return (
    <div className={`w-full ${usePadding ? "p-6 sm:p-8" : ""}`}>
      {title && (
        <>
          <h2 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">{title}</h2>
          <span className="mt-4 block h-px w-12 bg-accent-500" aria-hidden="true" />
        </>
      )}

      <div className={`divide-y divide-surface-line ${title ? "mt-6" : ""}`}>
        {accordionData.map((item, index) => {
          const open = activeIndex === index;
          return (
            <div key={item.title || index}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setActiveIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent-600"
              >
                <span
                  className={`font-sans text-[15px] font-semibold leading-snug md:text-base ${
                    open ? "text-accent-600" : "text-navy-900"
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    open
                      ? "border-accent-500 bg-accent-500 text-navy-950"
                      : "border-surface-line text-navy-700"
                  }`}
                >
                  {open ? <FaMinus className="text-[10px]" /> : <FaPlus className="text-[10px]" />}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink-muted">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
