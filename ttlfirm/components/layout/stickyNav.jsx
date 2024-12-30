"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { socialLinks } from "@components/common/mediaButtons";

import _ from "lodash";

const StickyNav = ({ isSticky = false }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // handle scrolling
  const [scrollState, setScrollState] = useState({
    isSticky: false,
    isScrollingUp: false,
  });
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollState((prevState) => ({
            isSticky:
              currentScrollY > 100 &&
              (currentScrollY < lastScrollY ||
                currentScrollY + windowHeight < bodyHeight),
            isScrollingUp: currentScrollY < lastScrollY && currentScrollY > 100,
          }));
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    const throttledScroll = _.throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [lastScrollY]);

  const menuLinks = [
    { href: "/", label: "Home", isDropdown: false },

    { href: "#practice", label: "Practice Areas", isDropdown: false },
    { href: "#firm", label: "Our Team", isDropdown: true },
    { href: "#result", label: "Results", isDropdown: true },
    { href: "#blog", label: "Blog", isDropdown: false },
    { href: "#videos", label: "Videos", isDropdown: false },
  ];
  return (
    <div
      className={`
        transition-all w-full duration-[400ms] z-[60] ${
          scrollState.isSticky
            ? "fixed bg-[#1c314e] top-0  ease-in-out"
            : " absolute bg-transparent sm:top-10 sm:bg-gradient-to-b sm:from-black sm:to-transparent ease-in"
        }`}
    >
      {/* <div className="bg-black absolute w-full h-24 opacity-50 z-10 backdrop-blur-sm"></div> */}
      <nav className=" w-full h-15 flex justify-between items-center  px-8 py-3.5 z-50">
        {/* LOGO */}
        <Link href="/">
          <Image
            className={`text-white cursor-pointer ${
              scrollState.isSticky ? "" : "md:w-20 pt-2"
            }`}
            src="/assets/images/logo.png"
            width={59}
            height={59}
            alt="Turuchi"
          ></Image>
        </Link>
        {/* MENU */}
        <div className="hidden md:flex justify-between items-center text-white uppercase gap-4 md:gap-6 font-semibold md:font-medium">
          {menuLinks.map((link, index) => ({
            ...(link.isDropdown ? (
              <span key={index} className="cursor-pointer hover:text-amber-600">
                {link.label}
              </span>
            ) : (
              <Link
                href={link.href}
                key={index}
                className="hover:text-amber-600"
              >
                {link.label}
              </Link>
            )),
          }))}
        </div>
        <Link href="" className="btn hidden md:flex">
          Contact us
        </Link>
        <div className="relative md:hidden">
          {!toggleDropdown ? (
            <FiMenu
              className="md:hidden w-8 h-8 text-white hover:cursor-pointer hover:text-yellow-600 transition-all duration-[400ms]"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
          ) : (
            <FaXmark
              className="md:hidden w-8 h-8 text-white hover:cursor-pointer hover:text-yellow-600 transition-all duration-[400ms]"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
          )}
          {toggleDropdown && (
            <div className="dropdown min-w-[300px] text-white uppercase gap-6 font-semibold transition-all duration-[400ms] ease-in">
              {menuLinks.map((link, index) => ({
                ...(link.isDropdown ? (
                  <span
                    key={index}
                    className="cursor-pointer hover:text-amber-600"
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    key={index}
                    className="hover:text-amber-600"
                  >
                    {link.label}
                  </Link>
                )),
              }))}
              <hr className="w-full bg-gray-300"></hr>
              <div className="w-full text-white flex items-center justify-between">
                <Link href="" className="btn rounded-lg text-white">
                  Contact us
                </Link>
                <div className="flex justify-between items-center gap-4 pr-4 text-lg">
                  {socialLinks.map((link, index) => (
                    <Link key={index} href={link.href}>
                      {link.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default StickyNav;
