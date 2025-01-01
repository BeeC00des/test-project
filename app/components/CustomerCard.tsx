
"use client";

import { useState, useEffect, useRef } from "react";
import useScrollAnimations from "./scrollAnimation";
import Image from "next/image";


// Define the props for the Card component
type CardProps = {
    backgroundImage: string;
    index: number;
    id: string;
    top: string;
    customerName: string;
    img: string | null;
    smallCardsData?: any[];
    text: string,
};

function CustomerCard({backgroundImage, index, text, id, smallCardsData, top, customerName, img }: CardProps) {
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
            }}
        >
            <div className=" card__content block md:flex ">
                <div className="w-full md:w-5/12  slide-left">
                    <div className=" pl-5 md:pl-14 lg:py-10 py-2 w-full font-[rubik]">
                            <div className="relative">
                                {/* Responsive Image */}
                                <Image
                                    src={img || ''} 
                                    alt="crown"
                                    width={260}
                                    height={260}
                                    className="md:w-45 md:h-45 top-0 left-0 hidden md:flex"

                                />
                                <h3
                                    className="card-text sm:text-[30px] md:text-[60px] font-[Rubik] font-semibold text-white md:mt-[-85px] mt-[-40px] mt-[40px] pl-5"
                                >
                                    {customerName}
                                </h3>
                            </div>

                        <p
                            className={` card-text sm:text-[25px] md:text-[35px] font-bold ${index === 5
                                ? 'text-[#F8C47A]'
                                : [3, 4].includes(index)
                                    ? 'text-[#063A4F]'
                                    : 'text-white'
                                }
                                ${index === 5
                                    ? 'lg:text-[55px]' : [0, 1].includes(index)
                                        ? 'lg:text-[60px]'
                                        : 'lg:text-[40px]'}`}

                            dangerouslySetInnerHTML={{ __html: formattedText }}
                        />

                    </div>
                </div>
                <div
                    className={`hidden md:w-7/12 md:flex ${isScrollingPaused ? 'overflow-hidden' : ''}`}
                    style={{
                        overflowY: isScrollingPaused ? "hidden" : "scroll",
                    }}>
                    {/* If index === 2, render the small cards */}
                    {smallCardsData && (
                        <ul
                            id="small-cards"
                            ref={smallCardsContainerRef} // Ref for the small cards container
                        >
                            <li
                                className="small-card"
                                // style={{ maxHeight: "600px", }}
                                onScroll={handleChildScroll}
                            >
                                <div className="small-card-container">
                                    {smallCardsData.map((smallCard) => (
                                        <div
                                            key={smallCard.id}
                                            className="small-card-content flex justify-center items-center text-left backdrop-blur-lg text-white bg-transparent p-10"
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

export default CustomerCard;

