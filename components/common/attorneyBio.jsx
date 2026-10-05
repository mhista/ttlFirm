"use client";
import { useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { ATTORNEY_BIO, RESULTS_DISCLAIMER } from "@/lib/attorneyBio.mjs";

/**
 * The attorney's biography.
 *
 * Five paragraphs is the right length for a bio and the wrong length for a
 * homepage section, so the first two are shown and the rest sit behind "Read
 * more". Collapsed by height rather than unmounted, which means the whole bio
 * is in the page source: Google reads all of it, and so does anyone who opens
 * it. On a page where the bio IS the content — the attorney profile — pass
 * `collapseAfter={0}` and nothing is hidden.
 *
 * `tone="dark"` is for the navy landing page band.
 */
const AttorneyBio = ({ paragraphs, collapseAfter = 2, tone = "light", disclaimer }) => {
  const [open, setOpen] = useState(false);
  const panelId = `${useId()}-bio`;

  const body = paragraphs?.length ? paragraphs : ATTORNEY_BIO;
  const isDark = tone === "dark";
  const note = disclaimer === null ? null : disclaimer || RESULTS_DISCLAIMER;

  const shouldCollapse = collapseAfter > 0 && body.length > collapseAfter;
  const visible = shouldCollapse ? body.slice(0, collapseAfter) : body;
  const hidden = shouldCollapse ? body.slice(collapseAfter) : [];

  const paragraphClass = `text-[15px] leading-relaxed md:text-base ${
    isDark ? "text-navy-100" : "text-ink-muted"
  }`;

  return (
    <div>
      <div className="space-y-4">
        {visible.map((text) => (
          <p key={text.slice(0, 40)} className={paragraphClass}>
            {text}
          </p>
        ))}
      </div>

      {shouldCollapse && (
        <>
          <div
            id={panelId}
            inert={!open}
            className={`grid transition-all duration-300 ease-out ${
              open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-4">
                {hidden.map((text) => (
                  <p key={text.slice(0, 40)} className={paragraphClass}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className={`mt-5 inline-flex items-center gap-2 font-sans text-[13px] font-bold uppercase tracking-[0.14em] transition-colors ${
              isDark ? "text-accent-400 hover:text-white" : "text-navy-800 hover:text-accent-600"
            }`}
          >
            {open ? "Show less" : "Read her full bio"}
            <FaChevronDown
              className={`text-[9px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </>
      )}

      {note && (
        <p
          className={`mt-6 text-[11px] leading-relaxed ${
            isDark ? "text-navy-300/80" : "text-ink-soft"
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
};

export default AttorneyBio;
