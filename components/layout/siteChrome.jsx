"use client";
import { usePathname } from "next/navigation";
import Footer from "@components/layout/footer";
import ScrollToTop from "@components/common/scrollToTop";
import TextUsWidget from "@components/common/textUsWidget";

/**
 * The furniture that appears on every website page — footer, back-to-top and
 * the Text Us widget.
 *
 * Campaign landing pages under /lp/ deliberately carry none of it: they have
 * one job and every extra link is a way out. A nested layout can't remove a
 * parent layout's output in the App Router, so the root layout renders this
 * and it opts itself out by path.
 */
const CHROME_FREE_PREFIXES = ["/lp/"];

const SiteChrome = () => {
  const pathname = usePathname() || "";
  if (CHROME_FREE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <>
      <Footer />
      <ScrollToTop />
      <TextUsWidget />
    </>
  );
};

export default SiteChrome;
