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
  const [selectedLink, setSelectedLink] = useState('Home');

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
              currentScrollY > 250 &&
              (currentScrollY < lastScrollY ||
                currentScrollY + windowHeight < bodyHeight),
            isScrollingUp: currentScrollY < lastScrollY && currentScrollY > 250,
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

    { href: "/practice", label: "Practice Areas", isDropdown: false },
    { href: "/profile", label: "Attorney Profile", isDropdown: false },
    { href: "/about", label: "About", isDropdown: false },
    { href: "#", label: "Blog", isDropdown: true },
    // { href: "#videos", label: "Videos", isDropdown: false },
  ];
  return (
    <div
      className={`
        transition-all w-full duration-[400ms] z-[75] ${
          scrollState.isSticky
            ? "fixed bg-[#1c314e] top-0  ease-in-out"
            : " absolute bg-transparent sm:top-10 sm:bg-gradient-to-b sm:from-black sm:to-transparent ease-in"
        }`}
    >
      {/* <div className="bg-black absolute w-full h-24 opacity-50 z-10 backdrop-blur-sm"></div> */}
      <nav className=" w-full h-15 flex justify-between items-center  px-10 py-3.5 z-50">
        {/* LOGO */}
        <Link href="/">
          <Image
            className={`text-white cursor-pointer ${
              scrollState.isSticky ? "w-[58px] md:w-[70px]" : "md:w-28 pt-2"
            }`}
            src="/assets/images/logo.png"
            width={65}
            height={65}
            alt="Turuchi law firm logo"
          ></Image>
        </Link>
        {/* MENU */}
        <div className="hidden md:flex justify-between items-center text-white uppercase gap-4 md:gap-6 font-semibold md:font-normal lg:font-medium md:text-sm lg:text-base">
          {menuLinks.map((link, index) => ({
            ...(link.isDropdown ? (
              <span key={index} className={`${selectedLink === link.label ? "text-yellow-600" : "text-white"} cursor-pointer hover:text-amber-600`} 
              onClick={() => {
                setSelectedLink(link.label);
              }}
              >
                {link.label}
              </span>
            ) : (
              <Link
                href={link.href}
                key={index}
                className={`${selectedLink === link.label ? "text-yellow-600" : "text-white"}  hover:text-amber-600`}
                onClick={() => {
                setSelectedLink(link.label);
              }}
              >
                {link.label}
              </Link>
            )),
          }))}
        </div>
        <Link href={`/contact`} className="btn hidden md:flex">
          Contact us
        </Link>
        <div className="relative md:hidden">
          {!toggleDropdown ? (
            <FiMenu
              className={`md:hidden w-8 h-8 text-white hover:cursor-pointer hover:text-yellow-600 transition-all duration-[400ms]`}
              onClick={() => {
                setToggleDropdown((prev) => !prev)
              }}
            />
          ) : (
            <FaXmark
              className="md:hidden w-8 h-8 text-white hover:cursor-pointer hover:text-yellow-600 transition-all duration-[400ms]"
              onClick={() => {
                setToggleDropdown((prev) => !prev)
              }}
            />
          )}
          {toggleDropdown && (
            <div className="dropdown min-w-[300px] text-white uppercase gap-6 font-semibold transition-all duration-[400ms] ease-in">
              {menuLinks.map((link, index) => ({
                ...(link.isDropdown ? (
                  <span
                    key={index}
                    className={`${selectedLink === link.label ? "text-yellow-600" : "text-white"} cursor-pointer hover:text-amber-600`} 
                    onClick={() => {
                      setSelectedLink(link.label);
                      setToggleDropdown((prev) =>!prev)
                    }}
                  >
                    {link.label}
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    key={index}
                    className={`${selectedLink === link.label ? "text-yellow-600" : "text-white"} cursor-pointer hover:text-amber-600`} 
                    onClick={() => {
                      setSelectedLink(link.label);
                      setToggleDropdown((prev) => !prev)
                    }}
                  >
                    {link.label}
                  </Link>
                )),
              }))}
              <hr className="w-full bg-gray-300"></hr>
              <div className="w-full text-white flex items-center justify-between">
                <Link href={`/contact`} className="btn rounded-lg text-white"
                onClick={()=>
                  setToggleDropdown((prev) =>!prev)
                
                }
                >
                  Contact us
                </Link>
                <div className="flex justify-between items-center gap-4 pr-4 text-lg">
                  {socialLinks.map((link, index) => (
                    <Link key={index} href={link.href}
                    onClick={()=>
                  setToggleDropdown((prev) =>!prev)
                
                }
                    >
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
