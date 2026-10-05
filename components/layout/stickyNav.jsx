"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { FaXmark, FaPhone, FaChevronDown, FaEnvelope } from "react-icons/fa6";

import { buildSocialLinks } from "@components/common/mediaButtons";
import { useSiteSettings } from "@/lib/siteSettingsContext";
import { MAIN_NAV, LEGAL_LINKS, FIRM, telHref } from "@/lib/siteNav";

/**
 * Primary navigation.
 *
 * Two visual states:
 *  - "over hero"  — transparent, sitting on top of the hero video, offset
 *                   below the navy utility bar on `sm` and up.
 *  - "docked"     — fixed to the top on a solid navy bar once the user has
 *                   scrolled past the hero.
 *
 * The old version toggled on a `scrollY < lastScrollY` comparison that fought
 * itself during momentum scrolling and flickered. This one docks on a simple
 * threshold and hides only when scrolling *down* past it.
 */
const StickyNav = () => {
  const pathname = usePathname();
  const siteSettings = useSiteSettings();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [docked, setDocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const desktopSubmenuTimer = useRef(null);

  const phone = siteSettings?.contact?.phone || FIRM.phoneDisplay;
  const email = siteSettings?.contact?.email || FIRM.email;

  // The menu, the label above the phone number and the header button are all
  // editable in Site Settings. An empty `mainNav` falls back to the built-in
  // menu so the header can never end up blank.
  const navItems = siteSettings?.mainNav?.length ? siteSettings.mainNav : MAIN_NAV;
  const social = buildSocialLinks(siteSettings?.social);
  const legalLinks = siteSettings?.footer?.legalLinks?.length
    ? siteSettings.footer.legalLinks
    : LEGAL_LINKS;
  const header = siteSettings?.header || {};
  const phoneLabel = header.phoneLabel || "Free Case Review";
  const headerCtaText = header.ctaText || "Contact Us";
  const headerCtaLink = header.ctaLink || "/contact";

  /* Portals need the DOM, which doesn't exist during the server render. */
  useEffect(() => setMounted(true), []);

  /* ----------------------------------------------------------- scroll state */
  useEffect(() => {
    let frame = null;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setDocked(y > 120);
        // Only auto-hide well below the fold, and never while the mobile
        // drawer is open.
        setHidden(y > 400 && y > lastY.current && !menuOpen);
        lastY.current = y;
        frame = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  /* --------------------------------------- close the drawer on route change */
  useEffect(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  /* ------------------------- lock body scroll + escape key while drawer open */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Hover intent: a short close delay stops the submenu vanishing when the
     pointer crosses the gap between the trigger and the panel. */
  const openDesktopSubmenu = (label) => {
    clearTimeout(desktopSubmenuTimer.current);
    setOpenSubmenu(label);
  };
  const closeDesktopSubmenu = () => {
    clearTimeout(desktopSubmenuTimer.current);
    desktopSubmenuTimer.current = setTimeout(() => setOpenSubmenu(null), 140);
  };

  return (
    <header
      className={[
        "w-full transition-all duration-300 ease-out",
        docked
          ? "fixed inset-x-0 top-0 z-[75] border-b border-white/10 bg-navy-950/95 shadow-[0_8px_30px_-12px_rgba(6,21,37,.6)] backdrop-blur-md"
          : "absolute inset-x-0 top-0 z-[75] bg-gradient-to-b from-navy-950/70 to-transparent sm:top-11",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <nav aria-label="Primary" className="container-x">
        <div
          className={[
            "flex items-center justify-between gap-4 transition-all duration-300",
            docked ? "h-[76px]" : "h-[88px] lg:h-[108px]",
          ].join(" ")}
        >
          {/* ----------------------------------------------------------- Logo */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="Turuchi Law Firm — home">
            {/* The source is 556x448 — the intrinsic size has to match it or
                Next serves an asset sized for the wrong aspect and the mark
                renders soft. Height is set in CSS; width follows. */}
            <Image
              src="/assets/images/logo.png"
              width={556}
              height={448}
              priority
              alt="The Turuchi Law Firm"
              className={[
                "w-auto transition-all duration-300",
                docked ? "h-14 md:h-[60px]" : "h-[60px] md:h-[68px] lg:h-[80px]",
              ].join(" ")}
            />
          </Link>

          {/* -------------------------------------------------- Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && openDesktopSubmenu(item.label)}
                onMouseLeave={() => item.children && closeDesktopSubmenu()}
              >
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  aria-expanded={item.children ? openSubmenu === item.label : undefined}
                  className={[
                    "flex items-center gap-1.5 rounded-md px-3 py-2 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors xl:text-sm",
                    isActive(item.href)
                      ? "text-accent-400"
                      : "text-white hover:text-accent-400",
                  ].join(" ")}
                >
                  {item.label}
                  {item.children && (
                    <FaChevronDown
                      className={`text-[9px] transition-transform duration-200 ${
                        openSubmenu === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* Submenu */}
                {item.children && openSubmenu === item.label && (
                  <div className="absolute left-1/2 top-full w-[330px] -translate-x-1/2 pt-3">
                    <div className="animate-slide-up overflow-hidden rounded-xl border border-white/10 bg-navy-950 p-2 shadow-widget ring-1 ring-black/20">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-4 py-3 transition-colors hover:bg-white/[.07]"
                        >
                          <span className="block font-sans text-sm font-semibold text-white">
                            {child.label}
                          </span>
                          {child.blurb && (
                            <span className="mt-0.5 block text-xs leading-relaxed text-navy-200">
                              {child.blurb}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ------------------------------------------------- Desktop actions */}
          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <a
              href={telHref(phone)}
              className="group flex items-center gap-3 border-l border-white/20 pl-4 text-left"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500/15 text-accent-400 transition-colors group-hover:bg-accent-500 group-hover:text-navy-950">
                <FaPhone className="text-xs" aria-hidden="true" />
              </span>
              <span className="hidden xl:block">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-navy-200">
                  {phoneLabel}
                </span>
                <span className="block text-sm font-semibold text-white transition-colors group-hover:text-accent-400">
                  {phone}
                </span>
              </span>
            </a>

            <Link href={headerCtaLink} className="btn-primary px-5 py-3 text-xs">
              {headerCtaText}
            </Link>
          </div>

          {/* --------------------------------------------- Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={telHref(phone)}
              aria-label={`Call ${phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-md bg-accent-500 text-navy-950 md:hidden"
            >
              <FaPhone className="text-sm" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white transition-colors hover:border-accent-400 hover:text-accent-400"
            >
              {menuOpen ? <FaXmark className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------------ Mobile drawer
          Rendered through a portal into <body>: this <header> always carries a
          transform for the auto-hide, and a transformed ancestor becomes the
          containing block for fixed-position descendants — which collapsed the
          drawer into the height of the header bar. */}
      {mounted &&
        menuOpen &&
        createPortal(
          <>
          <div
            className="fixed inset-0 z-[120] bg-navy-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-[130] flex w-[86%] max-w-[380px] animate-slide-up flex-col overflow-y-auto overscroll-contain bg-navy-950 lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Image
                src="/assets/images/logo.png"
                width={556}
                height={448}
                alt="Turuchi Law Firm"
                className="h-14 w-auto"
              />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white"
              >
                <FaXmark className="h-5 w-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col px-3 py-4">
              {navItems.map((item) => (
                <li key={item.label} className="border-b border-white/[.07]">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={[
                        "flex-1 px-3 py-4 font-sans text-[15px] font-semibold uppercase tracking-wide transition-colors",
                        isActive(item.href) ? "text-accent-400" : "text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={openSubmenu === item.label}
                        onClick={() =>
                          setOpenSubmenu((cur) => (cur === item.label ? null : item.label))
                        }
                        className="flex h-12 w-12 items-center justify-center text-navy-200"
                      >
                        <FaChevronDown
                          className={`text-xs transition-transform duration-200 ${
                            openSubmenu === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.children && openSubmenu === item.label && (
                    <ul className="pb-3 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-md px-3 py-3 text-sm text-navy-100 transition-colors hover:bg-white/5 hover:text-accent-400"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-white/10 px-5 py-5">
              <Link href={headerCtaLink} className="btn-primary w-full">
                {phoneLabel}
              </Link>
              <a href={telHref(phone)} className="btn-outline w-full">
                <FaPhone className="text-xs" aria-hidden="true" /> {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-2 py-1 text-sm text-navy-200 hover:text-accent-400"
              >
                <FaEnvelope className="text-xs" aria-hidden="true" /> {email}
              </a>

              {/* The Privacy Policy has to be reachable from every page, and on a
                  phone the footer is a long way down. */}
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-4">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-1 text-xs text-navy-200 transition-colors hover:text-accent-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="flex items-center justify-center gap-2 pt-1">
                {social.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-navy-200 transition-colors hover:border-accent-400 hover:text-accent-400"
                    >
                      {link.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </>,
          document.body
        )}
    </header>
  );
};

export default StickyNav;
