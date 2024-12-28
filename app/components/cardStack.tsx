


"use client";
import { useState, useEffect, useRef } from "react";
import '../styles/Stacking.css';


// Define the props for the Card component
type CardProps = {
    numberTitle: string;
    unit: string;
    text: string;
    backgroundImage: string;
    index: number;
    id: string;
    smallCardsData?: any[]; // Optional prop for small cards inside a parent card
};

function CardStack({ numberTitle, text, unit, backgroundImage, index, id, smallCardsData }: CardProps) {
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

    return (
        // <ul id="cards" >
        <li
            className="card sm:w-1/2 md:w-10/12 lg:w-12/12 mx-auto"

        >
            <div className="sm:p-5 lg:p-0 card__content md:flex items-start " 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50px",
            }}>
                <div className="w-7/12 slide-left">
                    <div className="pl-14 py-5 lg:w-7/12 text-white">
                        <h1
                            className={`lg:text-[80px] sm:text-[30px] md:text-[60px] font-[rubik] font-extrabold  ${index === 2 ? 'text-white' : 'text-[#063A4F]'
                                } ${index === 6 ? 'pt-16' : 'pt-5'}`}
                        >
                            {numberTitle}
                        </h1>
                        <p className="lg:text-[40px] sm:text-[25px] md:text-[40px] font-[rubik] font-extrabold pb-5">
                            {unit}
                        </p>
                        <p className="lg:text-2xl sm:text-base font-[inter] font-normal pb-12">
                            {text}
                        </p>
                    </div>
                </div>
                <div
                    className={`md:w-5/12 hidden md:flex ${isScrollingPaused ? 'overflow-hidden' : ''}`}
                    style={{
                        overflowY: isScrollingPaused ? "hidden" : "scroll",
                    }}
                >
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
                                            <h3 className="text-3xl font-bold">{smallCard.text}</h3>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </li>
        // </ul>
    );
}

export default CardStack;

