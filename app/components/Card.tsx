
"use client";

import { useState, useEffect, useRef, UIEventHandler } from "react";
import useScrollAnimations from "./scrollAnimation";
import Image from "next/image";
import throttle from 'lodash.throttle';
import { useMediaQuery } from 'react-responsive'

function runAfterFramePaint(callback) {
    // Queue a "before Render Steps" callback via requestAnimationFrame.
    requestAnimationFrame(() => {
        const messageChannel = new MessageChannel();

        // Setup the callback to run in a Task
        messageChannel.port1.onmessage = callback;

        // Queue the Task on the Task Queue
        messageChannel.port2.postMessage(undefined);
    });
}


// Define the props for the Card component
type CardProps = {
    numberTitle: string;
    unit: string;
    headerText: string;
    backgroundImage: string;
    index: number;
    id: string;
    top: string;
    customerName: string;
    img: string | null;
    smallCardsData?: any[];
    uppertext: string;
    numberValue: string;
    cardSupText: string;
    numberVolume: string;
    cardUpperText: string;
    cardText: string;
    specialUppertext: string;
    beforeBtnText: string
    afterBtnText: string
};

function Card({ numberTitle, headerText, unit, backgroundImage, index, id, specialUppertext, afterBtnText, beforeBtnText, smallCardsData, top, customerName, img, uppertext,
    numberValue, cardSupText, numberVolume, cardUpperText, cardText }: CardProps) {

    const [isScrollingPaused, setIsScrollingPaused] = useState(true); // Initially paused
    const smallCardsContainerRef = useRef<HTMLUListElement | null>(null);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

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



    const [isParentStuck, setIsParentStuck] = useState(false);
    const [isInnerScrollComplete, setIsInnerScrollComplete] = useState(false);
    const parentCardRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (index === 5) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutationRecord) {
                    console.log("🚀 ~ mutationRecord:", mutationRecord)
                    const isAbsolute = mutationRecord.target.style.position === 'absolute';
                    console.log("🚀 ~ newHeight:", isAbsolute)
                    // if (!isAbsolute) {
                    //         window.scrollBy({
                    //             top: 2200
                    //         })
                    // }
                });
            });

            var target = document.querySelectorAll('li.card')[0];
            observer.observe(target, { attributes: true, attributeFilter: ['style'] });
            return () => {
                observer.disconnect(target)
            }
        }
    }, [index])

    useEffect(() => {
        // Observer for parent card
        if (parentCardRef.current && !isTabletOrMobile) {
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
                                top: -1200
                            })
                        }
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
                            runAfterFramePaint(() => {
                                window.scrollBy({
                                    top: 2400
                                })
                            });
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

    }, [isTabletOrMobile]);
    // console.log("🚀 ~ Card ~ isParentStuck:", isParentStuck)



    useScrollAnimations();

    return (
        <li
            className={`card  mx-auto ${[1, 5].includes(index) ? 'h-[600px]' : 'h-auto'}`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50px",
                position: 'sticky',
                top: `${top}`, // index === 0 ? 0 : `${((index + 1) * 50) + 150}px`,
                marginTop: index >= 1 ? isTabletOrMobile ? '-20px' : '-100px' : 0,
                // zIndex: index,
                // height:`${height}`
            }}
            onScroll={handleChildScroll}
            ref={parentCardRef}
        >
            <div className=" card__content block md:flex ">
                <div className="w-full  slide-left">
                    <div className=" pl-2 md:pl-5 w-full font-[rubik]">

                        {(index === 0 || index === 3) && (
                            <div className="pl-8 md:pl-14 lg:py-14 py-2 w-full font-[rubik]">
                                <div>
                                    <p className="text-[32px] text-white font-[inter line-height1">{uppertext}</p>
                                    <h1
                                        className={`text-[30px] md:text-[60px] font-bold text-[#063A4F] line-height2`}
                                    >
                                        {numberValue}
                                    </h1>
                                    <p
                                        className={`sm:text-[25px] md:text-[40px] font-bold text-white line-height3`}
                                    >{headerText} </p>

                                </div>
                                <div className="pt-10">
                                    <p className="lg:w-6/12 w-full text-[30px] text-white font-normal leading-tight line-height3">{cardSupText}</p>
                                    <h1
                                        className={`text-[30px] md:text-[60px] font-bold text-[#063A4F] line-height2`}
                                    >
                                        {numberVolume}
                                    </h1>
                                    <p
                                        className={`sm:text-[25px] md:text-[35px] font-bold text-white pb-5 line-height1`}
                                    > {cardUpperText}</p>

                                    {cardText && (
                                        <button
                                            className="md:text-[24px] text-sm font-normal py-5 px-7 text-white bg-[#063A4F33] rounded-full"
                                        >
                                            {cardText}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {(index === 1 || index === 4) && (
                            <div>
                                <div className="w-full md:w-8/12 lg:py-7 slide-left">
                                    <div className=" pl-5 md:pl-14  py-2 w-full font-[rubik] leading-tight">

                                        {specialUppertext && (
                                            <p className="text-[30px] text-white">{specialUppertext}</p>
                                        )}

                                        <h1
                                            className={`text-[30px] md:text-[60px] font-bold text-[#063A4F]`}
                                        >
                                            {numberValue}
                                        </h1>
                                        <p
                                            className={`sm:text-[25px] md:text-[40px] font-normal text-white`}
                                        >{cardText}</p>

                                    </div>
                                    <div className=" pl-5 md:pl-14 lg:py-10 py-2 w-full font-[rubik] leading-tight">
                                        {cardSupText && (
                                            <p className="lg:w-8/12 w-full text-[30px] text-white font-normal leading-tight line-height3">{cardSupText}</p>
                                        )}
                                        <h1
                                            className={`text-[30px] md:text-[60px] font-bold text-[#063A4F] line-height2`}
                                        >
                                            {numberVolume}
                                        </h1>

                                        <button
                                            className={`md:text-[28px] w-8/12 text-left text-sm font-normal py-3 pl-3 pr-10 text-white bg-[#063A4F33] rounded-lg leading-normal `}
                                        > {beforeBtnText} <span className="text-[#063A4F]">{numberTitle} </span>{afterBtnText} </button>
                                    </div>
                                </div>


                            </div>
                        )}

                        {(index === 2 || index === 5) && (
                            <div className="flex">
                                <div className="relative w-5/12 lg:pl-7 ">
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
                                <div
                                    className={`hidden md:w-7/12  md:flex ${isScrollingPaused ? 'overflow-hidden' : ''}`}
                                    style={{
                                        overflowY: isScrollingPaused ? "hidden" : "scroll",
                                    }}>
                                    {/* If index === 2, render the small cards */}


                                    {(index === 2 || index === 5) && smallCardsData && (
                                        <ul
                                            id="small-cards"
                                            ref={smallCardsContainerRef} // Ref for the small cards container
                                        >
                                            <li
                                                className="small-card"
                                                onScroll={handleChildScroll}
                                            >
                                                <div className="small-card-container">
                                                    {smallCardsData.map((smallCard) => (
                                                        <div
                                                            key={smallCard.id}
                                                            // tailwindcss backdrop-blur-lg is  not working why? onload screen 
                                                            className="small-card-content  flex justify-center items-center text-white text-left  p-10  backdrop-blur-lg bg-white/7"
                                                            style={{
                                                                height: "300px",
                                                                margin: "30px",
                                                                borderRadius: "40px",
                                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                                // background: "transparent",
                                                                // backdropFilter: "blur(22.73px)",
                                                            }}
                                                        >
                                                    <h3 className="text-base lg:text-3xl md:text-lg font-bold">
                                                        {smallCard.text}
                                                    </h3>
                                                </div>
                                                    ))}
                                            </div>
                                        </li>
                                        </ul>
                                    )}

                            </div>
                            </div>

                        )}
                </div>
            </div>
        </div>
        </li >
    );
}

export default Card;

