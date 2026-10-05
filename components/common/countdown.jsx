"use client";
import CountUp from "@components/common/countUp";

/**
 * Legacy wrapper.
 *
 * The old <Countdown countToUse={500} sign="+" subtitle="…" timer={10} /> API
 * is kept so nothing that still imports it breaks, but the counting itself now
 * comes from <CountUp>, and the styling matches the rest of the design system
 * instead of the old hard-coded #0F3057 / w-[50%].
 *
 * New code should use <CountUp value="500+" /> directly.
 */
const Countdown = ({ countToUse, subtitle, sign = "", timer }) => (
  <div className="flex flex-col items-center justify-center gap-2 px-3 py-5 text-center md:py-6">
    <CountUp
      value={`${countToUse}${sign}`}
      className="font-display text-3xl font-bold text-navy-900 lg:text-5xl"
    />
    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted sm:text-sm">
      {subtitle}
    </span>
  </div>
);

export default Countdown;
