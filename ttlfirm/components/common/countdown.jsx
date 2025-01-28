"use client";
import React, { useState, useEffect } from "react";
import NumbersContainer from "@components/common/numbersContainer";

const   Countdown = ({countToUse, subtitle, sign, timer}) => {
    const [count, setCount] = useState(1); // Start from 1

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount < countToUse) {
                    return prevCount + 1; // Increment by 1
                } else {
                    clearInterval(interval); // Stop the countdown at 500
                    return prevCount;
                }
            });
        }, timer); // Adjust speed (10ms per increment)

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="flex flex-col items-center w-[50%] justify-center gap-4  text-black rounded-lg py-3 md:py-6" >
        <h2 className="text-3xl lg:text-5xl font-serif font-medium text-[#1f385b]">{count}{sign}</h2>
        <h5 className="text-xs sm:text-sm lg:text-lg text-center text-gray-600 mr-2">{subtitle}</h5>
    </div>

    );
};

export default Countdown;
