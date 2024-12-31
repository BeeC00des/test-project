"use client";

import { useState, useEffect, useRef } from "react";
import useScrollAnimations from "./scrollAnimation";
import Image from "next/image";


// Define the props for the Card component
type CardProps = {
    numberTitle: string;
    unit: string;
    text: string;
    backgroundImage: string;
    index: number;
    top: string;
};

function DisbursementCard({ numberTitle, text, unit, backgroundImage, index,top }: CardProps) {

    const [formattedText, setFormattedText] = useState<string>("");

    useEffect(() => {
        const styleLastWord = (text: string) => {
            if (!text) {
                return ''; // Return empty string if text is undefined or null
            }

            const textArray = text.split(' '); // Split text into words
            const lastWord = textArray.pop(); // Get the last word

            if (lastWord) {
                // Return the rest of the text and apply a span to the last word
                return `${textArray.join(' ')} <span class="underline decoration-wavy">${lastWord}</span>`;
            }
            return text;
        };


        setFormattedText(styleLastWord(text));
    }, [text]);

    const [formattedUnitText, setFormattedUnitText] = useState<string>("");

    useEffect(() => {
        const styleLastWord = (text: string) => {
            if (!text) {
                return ""; // Return empty string if text is undefined or null
            }

            const textArray = text.split(" "); // Split text into words
            const lastWord = textArray.pop(); // Get the last word

            if (lastWord) {
                // Return the rest of the text and apply a span to the last word
                return `${textArray.join(" ")} <span class="underline decoration-wavy text-[60px]">${lastWord}</span>`;
            }
            return text;
        };

        // Check if the current index is 3 or 4
        if (index == 2) {
            setFormattedUnitText(styleLastWord(unit));
        } else {
            setFormattedUnitText(unit); // Use the text as-is for other indices
        }
    }, [unit, index]); // Dependencies include `unit` and `index`



    useScrollAnimations();

    return (
        <li
        className={`card w-10/12 lg:w-10/12 mx-auto ${index === 4 ? 'h-[350px]' : 'h-auto'} ${[1, 4].includes(index) ? 'h-[600px]' : 'h-auto'}`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50px",
                position: 'sticky',
                top: `${top}`,
                // height:`${height}`
            }}
        >
            <div className=" card__content block md:flex ">
                <div className="w-full md:w-7/12  slide-left">
                    <div className=" pl-4 md:pl-14 lg:py-7 py-2 w-full font-[rubik]">
                        <h1
                            className={` card-header-text sm:text-[30px] md:text-[40px] font-bold 
                                 ${[0, 1].includes(index) ? 'text-[#063A4F]' : 'text-white'} 
                                 ${[3, 4].includes(index) ? 'lg:text-[60px]' : 'lg:text-[50px]'}
                                 ${[3, 4].includes(index) ? 'font-semibold' : ''} 
                                 ${[3, 4].includes(index) ? 'pt-5' : 'pt-0'}`}
                        >
                            {numberTitle}
                        </h1>
                        <p
                            className={` card-text sm:text-[25px] md:text-[35px] font-bold ${index === 4
                                ? 'text-[#F8C47A]'
                                : [2].includes(index)
                                    ? 'text-[#063A4F]'
                                    : 'text-white'
                                }
                                ${index === 4
                                    ? 'lg:text-[55px]' : [0, 1].includes(index)
                                        ? 'lg:text-[45px]'
                                        : 'lg:text-[40px]'}`}

                            dangerouslySetInnerHTML={{ __html: formattedUnitText }}
                        />

                        <p
                            className={`lg:text-[24px] text-base font-normal lg:py-7 py-2 text-white  `}
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                        />
                    </div>
                </div>
            </div>
        </li >
    );
}

export default DisbursementCard;



