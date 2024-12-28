
"use client";
import { relative } from "path";
import { useState, useEffect, useRef } from "react";
// import '../globals.css'

// Define the props for the Card component
type CardProps = {
    numberTitle: string;
    unit: string;
    text: string;
    backgroundImage: string;
    index: number;
    id: string;
    top:string;
    // height:string; ,height
    smallCardsData?: any[]; // Optional prop for small cards inside a parent card
};

function Card({ numberTitle, text, unit, backgroundImage, index, id, smallCardsData,top }: CardProps) {
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
            return text; // If there's no last word, return text as it is
        };

        // Apply the function and set the formatted text
        setFormattedText(styleLastWord(text));
    }, [text]);

    return (
        <li
            className={`card w-10/12 lg:w-12/12 mx-auto ${index === 5 ? 'border-2 border-red-600' : 'border-none'}`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50px",
                position:'sticky',
                top: `${top}`,
                // height:`${height}`
            }}
        >
            {/* sm:p-5 p-0 */}
            <div className=" card__content block md:flex ">
                <div className="w-full md:w-7/12  slide-left">
                    <div className=" pl-2 md:pl-14 py-5 w-full text-white font-[rubik]">
                        <h1
                            className={`lg:text-[80px] sm:text-[30px] md:text-[60px]  font-extrabold  ${[0, 1].includes(index) ? 'text-[#063A4F]' : 'text-white'}  ${index === 6 ? 'pt-16' : 'pt-5'}`}
                        >
                            {numberTitle}
                        </h1>
                        <p className={`lg:text-[60px] sm:text-[25px] md:text-[40px]  font-extrabold pb-5 ${[3, 4].includes(index) ? 'text-[#063A4F]' : 'text-white'}   ${index === 5 ? 'text-[#F8C47A]' : 'text-white'} `}>
                            {unit}
                        </p>

                        {/* General text display */}
                        {/* <p className="lg:text-[24px] sm:text-base font-normal pb-12">
                            {text}
                        </p> */}
                        <p
                            className={`lg:text-[24px] sm:text-base font-normal pb-12 ` }
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
                    {index === 2 && smallCardsData && (
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
                                            <h3 className=" text-base lg:text-3xl font-bold">{smallCard.text}</h3>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </li>
    );
}

export default Card;

