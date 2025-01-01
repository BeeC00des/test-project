
"use client";

import { useState, useEffect, useRef } from "react";
import useScrollAnimations from "./scrollAnimation";


// Define the props for the Card component
type CardProps = {
    uppertext:string
    Month: string;
    monthVolume: string;
    text: string;
    backgroundImage: string;
    index: number;
    id: string;
    top: string
};

function DisburseCard({ Month, text, monthVolume, backgroundImage, index, id, uppertext, top }: CardProps) {
    
    useScrollAnimations();

    return (
        <li
            className={`card w-6/12 md:w-10/12 lg:w-10/12 mx-auto ${index === 5 ? 'h-[350px]' : 'h-auto'} ${[1, 4].includes(index) ? 'h-[600px]' : 'h-auto'}`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50px",
                position: 'sticky',
                top: `${top}`
                // height:`${height}`
            }}
        >
            <div className=" card__content block md:flex ">
                <div className="w-full md:w-8/12 lg:py-7 slide-left">
                    <div className=" pl-5 md:pl-14  py-2 w-full font-[rubik] leading-tight">
                      
                        <h1
                            className={`text-[30px] md:text-[60px] font-bold text-[#063A4F]`}
                        >
                            {Month}
                        </h1>
                        <p
                            className={`sm:text-[25px] md:text-[32px] font-normal text-white`}
                       >{text}</p>

                    </div>
                    <div className=" pl-5 md:pl-14 lg:py-10 py-2 w-full font-[rubik] leading-tight">
                        <p className="text-[50px] text-white leading-tight font-semibold">{uppertext}</p>
                        <h1
                            className={`text-[30px] md:text-[60px] font-bold text-[#063A4F]`}
                        >
                            {monthVolume}
                        </h1>

                        <button
                            className={`md:text-[22px] w-8/12 text-left text-sm font-normal py-3 pl-3 pr-12  text-white bg-[#063A4F33] rounded-lg leading-loose  `}
                        >  then 7th of {Month} you rank the in  <span className="text-[#063A4F]">{monthVolume} </span>in one day, wow 💵 </button>
                    </div>
                </div>
               
            </div>
        </li >
    );
}

export default DisburseCard;

