
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
    id: string;
    top: string;
    customerName: string;
    img: string | null;
    smallCardsData?: any[];
};

function CollectionCard({ numberTitle, text, unit, backgroundImage, index, id, smallCardsData, top, customerName, img }: CardProps) {
    const [isScrollingPaused, setIsScrollingPaused] = useState(true); // Initially paused
    const smallCardsContainerRef = useRef<HTMLUListElement | null>(null);

    // Scroll event handler to track scrolling of small cards
    const handleChildScroll = () => {
        const smallCardsContainer = smallCardsContainerRef.current;

        if (smallCardsContainer) {
            // If the child container is scrolled to the bottom, resume scrolling for parent
            if (
                smallCardsContainer.scrollHeight - smallCardsContainer.scrollTop ===
                smallCardsContainer.clientHeight
            ) {
                setIsScrollingPaused(false); // Allow scrolling for parent sections
            }
        }
    };

    // Update isScrollingPaused when index changes
    useEffect(() => {
        if (index === 2) {
            // Initially pause scrolling for all sections when index === 2
            setIsScrollingPaused(true);
        } else {
            setIsScrollingPaused(false);
        }
    }, [index]);

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
                return `${textArray.join(" ")} <span class="underline decoration-wavy">${lastWord}</span>`;
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
            className={`card md:w-10/12 lg:w-10/12 mx-auto ${index === 3 ? 'h-[350px]' : 'h-auto'} ${[1, 4].includes(index) ? 'h-[600px]' : 'h-auto'}`}
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
                    <div className=" pl-2 md:pl-14 py-7 w-full font-[rubik]">
                        <h1
                            className={` sm:text-[30px] md:text-[40px] font-bold  ${[0, 1].includes(index) ? 'text-[#063A4F]' : 'text-white'} ${[3, 4].includes(index) ? 'lg:text-[55px]' : 'lg:text-[65px]'}`}
                        >
                            {numberTitle}
                        </h1>

                        {index === 1 && (
                            <div className="relative">
                                {/* Responsive Image */}
                                <Image
                                    src={img || ''} 
                                    alt="crown"
                                    width={260}
                                    height={260}
                                    className="w-45 h-45  top-0 left-0"

                                />
                                <h3
                                    className="lg:text-[85px] sm:text-[30px] md:text-[60px] font-[Rubik] font-bold text-white lg:mt-[-100px] md:mt-[-50px] pl-5"
                                >
                                    {customerName}
                                </h3>
                            </div>
                        )}

                        <p
                            className={` sm:text-[25px] md:text-[40px] font-bold pb-5 ${index === 3
                                ? 'text-[#F8C47A]'
                                : [2].includes(index)
                                    ? 'text-[#063A4F]'
                                    : 'text-white'
                                }
                                ${index === 3
                                    ? 'lg:text-[55px]' : [0, 1].includes(index)
                                        ? 'lg:text-[60px]'
                                        : 'lg:text-[40px]'}`}

                            dangerouslySetInnerHTML={{ __html: formattedUnitText }}
                        />

                        <p
                            className={`lg:text-[24px] sm:text-base font-normal pb-12 text-white  `}
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                        />
                    </div>
                </div>
                <div
                    className={`hidden md:w-5/12  md:flex ${isScrollingPaused ? 'overflow-hidden' : ''}`}
                    style={{
                        overflowY: isScrollingPaused ? "hidden" : "scroll",
                    }}>
                    {/* If index === 2, render the small cards */}
                    {index === 1 && smallCardsData && (
                        <ul
                            id="small-cards"
                            ref={smallCardsContainerRef} // Ref for the small cards container
                        >
                            <li
                                className="small-card"
                                style={{ maxHeight: "600px", overflowY: "scroll" }}
                                onScroll={handleChildScroll}
                            >
                                <div className="small-card-container">
                                    {smallCardsData.map((smallCard) => (
                                        <div
                                            key={smallCard.id}
                                            className="small-card-content flex justify-center items-center text-center backdrop-blur-lg text-white bg-transparent p-10"
                                            style={{
                                                height: "300px",
                                                margin: "30px",
                                                borderRadius: "40px",
                                            }}
                                        >
                                            <h3 className=" text-base lg:text-3xl  md:text-lg font-bold">{smallCard.text}</h3>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </li >
    );
}

export default CollectionCard;

