
"use client";

// import { useState, useEffect, useRef } from "react";
import useScrollAnimations from "./scrollAnimation";


// Define the props for the Card component
type CardProps = {
    uppertext:string
    numberVolume: string;
    numberValue: string;
    text: string;
    backgroundImage: string;
    index: number;
    id: string;
    top: string;
    cardText:string;
    cardUpperText:string
    cardSupText:string
};

function TransactionCard({ numberVolume, text,  numberValue, backgroundImage, index, id, uppertext, top, cardText, cardUpperText, cardSupText }: CardProps) {
   
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
                <div className="w-full md:w-6/12 lg:py-7 slide-left">
                    <div className=" pl-5 md:pl-14  py-2 w-full font-[rubik] leading-tight">
                        <p className="text-[24px] text-white leading-tight">{uppertext}</p>
                        <h1
                            className={`text-[30px] md:text-[60px] font-bold text-[#063A4F]`}
                        >
                            {numberValue}
                        </h1>
                        <p
                            className={`sm:text-[25px] md:text-[35px] font-bold text-white`}
                       >{text}</p>

                    </div>
                    <div className=" pl-5 md:pl-14 lg:py-10 py-2 w-full font-[rubik] leading-tight">
                        <p className="text-[30px] text-white font-thin leading-tight">{cardSupText}</p>
                        <h1
                            className={`text-[30px] md:text-[60px] font-bold text-[#063A4F]`}
                        >
                            {numberVolume}
                        </h1>
                        <p
                            className={`sm:text-[25px] md:text-[35px] font-bold text-white pb-3`}
                       > {cardUpperText} </p>

                        <button
                            className={`md:text-[24px] text-sm font-normal py-3 px-4  text-white bg-[#063A4F33] rounded-full  `}
                        > {cardText} </button>
                    </div>
                </div>
               
            </div>
        </li >
    );
}

export default TransactionCard;

