"use client";
import React, { useState, useEffect } from "react";
import { FaAngleUp  } from "react-icons/fa6";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Track scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  return (
    <> {isVisible && (<div 
          onClick={scrollToTop}
    className="fixed bottom-5 right-5 bg-amber-600 rounded-lg p-3 shadow-lg z-[80]"
    >
     
        <FaAngleUp
          className=" z-20 font-semibold text-xl text-[#1f385b]"
        />
    </div>
      )}

    </>
  );
};

export default ScrollToTop;
