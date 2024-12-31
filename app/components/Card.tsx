
"use client";

import { useState, useEffect, useRef, UIEventHandler } from "react";
import useScrollAnimations from "./scrollAnimation";
import Image from "next/image";
import throttle from 'lodash.throttle';


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

function Card({ numberTitle, text, unit, backgroundImage, index, id, smallCardsData, top, customerName, img }: CardProps) {
    const [isScrollingPaused, setIsScrollingPaused] = useState(true); // Initially paused
    const smallCardsContainerRef = useRef<HTMLUListElement | null>(null);

    const preventBodyScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Scroll event handler to track scrolling of small cards
    const handleChildScroll: UIEventHandler<HTMLLIElement> = (e) => {
        // e.stopPropagation();
        // e.preventDefault();
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
                return `${textArray.join(" ")} <span class="underline decoration-wavy md:text-[60px] text-[20px]">${lastWord}</span>`;
            }
            return text;
        };

        // Check if the current index is 3 or 4
        if ([3, 4].includes(index)) {
            setFormattedUnitText(styleLastWord(unit));
        } else {
            setFormattedUnitText(unit); // Use the text as-is for other indices
        }
    }, [unit, index]); // Dependencies include `unit` and `index`

    const [isParentStuck, setIsParentStuck] = useState(false);
    const [isInnerScrollComplete, setIsInnerScrollComplete] = useState(false);
    const parentCardRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        // Observer for parent card
        if (parentCardRef.current) {
            // const observer = new IntersectionObserver(
            //     ([entry]) => {
            //         const stickyTop = parseInt(window.getComputedStyle(parentCardRef.current).top)
            //         const currentTop = entry.boundingClientRect.top;
            //         console.log("🚀 ~ useEffect ~ currentTop:", {currentTop, stickyTop})
            //         // setIsParentStuck(currentTop < 385);
            //         setIsParentStuck(stickyTop === 150);
            //     },
            //     {
            //         threshold: [1],
            //      }
            // );
            // observer.observe(parentCardRef.current);
            const handleMainScroll = (e) => {
                if (!parentCardRef.current) return;
                if (index === 5) {
                    const stickyElementStyle = window.getComputedStyle(parentCardRef.current);
                    const stickyElementTop = parseInt(stickyElementStyle.top, 10);
                    const currentTop = parentCardRef.current.getBoundingClientRect().top;

                    const oldHeight = document.querySelector('ul#cards')?.computedStyleMap().get('height')
                    console.log("🚀 ~ handleMainScroll ~ oldHeight:", oldHeight)
                    if (currentTop <= stickyElementTop) {
                        console.log("🚀 ~ handleMainScroll ~ inside true og")
                        if (oldHeight.value === 4000) {
                            console.log("🚀 ~ handleMainScroll ~ inside true")
                            document.querySelectorAll('li.card').forEach((item, index) => {
                                item.style.position = 'absolute';
                                //item.style.top = 'unset !important';
                                // item.style.bottom = `${index * 50}px !important`;
                                item.style.left = '50%';
                                item.style.transform = 'translateX(-50%)';
                            })
                            document.querySelector('ul#cards').style.height = '900px'
                            window.scrollBy({
                                top: -800
                            })
                        }
                        // window.scrollBy({
                        //     top: 2700
                        // })
                    } else {
                        if (oldHeight.value === 900) {
                            document.querySelectorAll('li.card').forEach((item, index) => {
                                item.style.position = 'sticky';
                                //item.style.top = 'unset !important';
                                // item.style.bottom = `${index * 50}px !important`;
                                item.style.left = '0';
                                item.style.transform = 'none';
                            })
                            document.querySelector('ul#cards').style.height = '4000px'
                            // window.scrollBy({
                            //     top: -500
                            // })
                        }
                        
                    }

                    return;
                }
                if (!smallCardsContainerRef.current || index !== 2) return;
                const stickyElementStyle = window.getComputedStyle(parentCardRef.current);
                const stickyElementTop = parseInt(stickyElementStyle.top, 10);
                const currentTop = parentCardRef.current.getBoundingClientRect().top;

                if (currentTop <= stickyElementTop) {
                    preventBodyScroll(e);
                    e.preventDefault();
                    window.document.body.style.overflow = 'hidden';
                    // window.document.getElementById('bg-main').style.overflow = 'hidden';
                    const container = smallCardsContainerRef.current;
                    const scrollableHeight = container.scrollHeight - container.clientHeight;
                    const currentScroll = container.scrollTop;
        
                    // Check if inner scroll is complete
                    if (currentScroll >= scrollableHeight) {
                        setIsInnerScrollComplete(true);
                        document.body.style.overflow = 'auto';
                        return;
                    }
        
                    // Calculate and apply scroll
                    const scrollStep = 300; // Adjust scroll speed
                    container.scrollTop = currentScroll + scrollStep;
                } else {
                    document.body.style.overflow = 'auto';
                }
            };

            const onWheel = (e: WheelEvent) => {
                const isStuck = document.body.style.overflow === 'hidden';
                if (!isStuck) return;
                const container = smallCardsContainerRef.current;
                if (container) {
                    const currentScroll = container.scrollTop;
                    const scrollableHeight = container.scrollHeight - container.clientHeight;
                        
                    if (currentScroll >= scrollableHeight) {
                        setIsInnerScrollComplete(true);
                        document.body.style.overflow = 'auto';
                        return;
                    }

                    // Calculate and apply scroll
                    const scrollStep = e.deltaY > 0 ? 330 : -330; // Adjust scroll speed
                    container.scrollTop = currentScroll + scrollStep;
                    }
                    // Check if inner scroll is complete
            }
    
            window.addEventListener('scroll', throttle(handleMainScroll, 200));
            window.addEventListener('wheel', throttle(onWheel, 200), { passive: false });
    
            return () => {
                // observer.disconnect();
                window.removeEventListener('scroll', handleMainScroll);
                window.removeEventListener('wheel', onWheel);
            };
        }

    }, []);
    // console.log("🚀 ~ Card ~ isParentStuck:", isParentStuck)



    useScrollAnimations();

    return (
        <li
            className={`card w-6/12 md:w-10/12 lg:w-10/12 mx-auto ${[1, 5].includes(index) ? 'h-[600px]' : 'h-auto'}`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50px",
                position: 'sticky',
                top: `${top}`,// index === 0 ? 0 : `${((index + 1) * 50) + 150}px`,
                marginTop: index >= 1 ? '-100px' : 0,
                // zIndex: index,
                // height:`${height}`
            }}
            onScroll={handleChildScroll}
            ref={parentCardRef}
        >
            <div className=" card__content block md:flex ">
                <div className="w-full md:w-6/12  slide-left">
                    <div className=" pl-5 md:pl-14 lg:py-10 py-2 w-full font-[rubik]">
                        <h1
                            className={`  text-[30px] md:text-[60px] font-bold 
                                 ${[0, 1].includes(index) ? 'text-[#063A4F]' : 'text-white'} 
                                 ${[3, 4].includes(index) ? 'lg:text-[60px]' : 'lg:text-[60px]'} 
                                 ${[3, 4].includes(index) ? 'font-semibold' : ''} 
                                    ${[3, 4].includes(index) ? 'card-header-text' : ''} 
                                 ${[3, 4].includes(index) ? 'pt-5' : 'pt-0'}`}
                        >
                            {numberTitle}
                        </h1>

                        {index === 2 && (
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
                        )}

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

                            dangerouslySetInnerHTML={{ __html: formattedUnitText }}
                        />

                        <p
                            className={`md:text-[24px] text-base font-normal lg:py-7 py-2 text-white  `}
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                        />
                    </div>
                </div>
                <div
                    className={`hidden md:w-6/12  md:flex ${isScrollingPaused ? 'overflow-hidden' : ''}`}
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

export default Card;

