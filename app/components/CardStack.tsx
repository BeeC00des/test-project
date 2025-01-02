
"use client";

import { useState, useEffect, useRef, UIEventHandler } from "react";
import useScrollAnimations from "./scrollAnimation";
import Image from "next/image";
import throttle from 'lodash.throttle';
import { useMediaQuery } from 'react-responsive'
import { motion, useScroll, useTransform } from 'motion/react';


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

type CardType = {
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
    marginTop: string
}

// Define the props for the Card component
type CardProps = {
    cardList: CardType[];
    // index:number
};

function CardStack({ cardList }: CardProps) {
    console.log("🚀 ~ CardStack ~ cardList:", cardList)

    const [isScrollingPaused, setIsScrollingPaused] = useState(true); // Initially paused
    const smallCardsContainerRef = useRef<HTMLUListElement | null>(null);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const containerRef = useRef<HTMLUListElement>(null);
    const { scrollY } = useScroll();
    const [cardHeights, setCardHeights] = useState<number[]>([]);
    const [isScrollingCard, setIsScrollingCard] = useState(false);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const preventBodyScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    // Scroll event handler to track scrolling of small cards
    // const handleChildScroll: UIEventHandler<HTMLLIElement> = (e) => {
    //     // e.stopPropagation();
    //     // e.preventDefault();
    //     const smallCardsContainer = smallCardsContainerRef.current;

    //     if (smallCardsContainer) {
    //         // If the child container is scrolled to the bottom, resume scrolling for parent
    //         if (
    //             smallCardsContainer.scrollHeight - smallCardsContainer.scrollTop ===
    //             smallCardsContainer.clientHeight
    //         ) {
    //             setIsScrollingPaused(false); // Allow scrolling for parent sections
    //         }
    //     }
    // };

    // // Update isScrollingPaused when index changes
    // useEffect(() => {
    //     if (cardList.index === 2) {
    //         // Initially pause scrolling for all sections when index === 2
    //         setIsScrollingPaused(true);
    //     } else {
    //         setIsScrollingPaused(false);
    //     }
    // }, [cardList.index]);





    const [isParentStuck, setIsParentStuck] = useState(false);
    const [isInnerScrollComplete, setIsInnerScrollComplete] = useState(false);
    
    // console.log("🚀 ~ Card ~ isParentStuck:", isParentStuck)

    const cardOverlap = 60; // 80px overlap between cards
    const marginBetweenSticky = 50; // margin when cards are stacked

    useEffect(() => {
        console.log("🚀 ~ heights ~ cardRefs:", cardRefs)
        const updateCardHeights = () => {
            const heights = cardRefs.current.map(ref => {
                console.log("🚀 ~ heights ~ ref:", ref)
                if (!ref) return 0;
                const height = ref.getBoundingClientRect().height;
                console.log("🚀 ~ heights ~ height:", height)
                return height;
            });
            setCardHeights(heights);
        };

        // Update heights when component mounts and on window resize
        updateCardHeights();
        window.addEventListener('resize', updateCardHeights);
        return () => window.removeEventListener('resize', updateCardHeights);
    }, [cardList]);

    // useEffect(() => {
    //     const handleWheel = (e: WheelEvent) => {
    //         const target = e.target as HTMLElement;
    //         const scrollableCard = cardRefs.current.find((ref) => {
    //             if (!ref) return false;
    //             return ref.contains(target);
    //         });

    //         if (!scrollableCard) {
    //             if (isScrollingCard) {
    //                 setIsScrollingCard(false);
    //                 document.body.style.overflow = 'auto';
    //             }
    //             return;
    //         }

    //         const isScrollable = scrollableCard.scrollHeight > scrollableCard.clientHeight;
    //         if (!isScrollable) return;

    //         const isAtTop = scrollableCard.scrollTop === 0;
    //         const isAtBottom = scrollableCard.scrollTop + scrollableCard.clientHeight >= scrollableCard.scrollHeight - 1;

    //         const shouldScrollCard = (
    //             (e.deltaY > 0 && !isAtBottom) || // Scrolling down and not at bottom
    //             (e.deltaY < 0 && !isAtTop)    // Scrolling up and not at top
    //         );

    //         if (shouldScrollCard) {
    //             e.preventDefault();
    //             e.stopPropagation();

    //             if (!isScrollingCard) {
    //                 setIsScrollingCard(true);
    //                 document.body.style.overflow = 'hidden';
    //             }

    //             scrollableCard.scrollTop += e.deltaY;
    //         } else {
    //             if (isScrollingCard) {
    //                 setIsScrollingCard(false);
    //                 document.body.style.overflow = 'auto';
    //             }
    //         }
    //     };

    //     window.addEventListener('wheel', handleWheel, { passive: false });

    //     return () => {
    //         window.removeEventListener('wheel', handleWheel);
    //         document.body.style.overflow = 'auto';
    //     };
    // }, [isScrollingCard]);

    // Calculate total stack height
    const totalHeight = cardHeights.reduce((acc, height, index) => {
        if (index === 0) return height;
        return acc + height - cardOverlap;
    }, 0);



    // useScrollAnimations();

    return (

        <div className="mainCard " style={{
            width: '80%',
            margin: '80px auto 420px',
            position: 'relative'
        }}>
            {/* Render the list of cards from array */}
            <ul id="mainCards"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // top: '100px',
                    height: `${totalHeight}px`,
                }}
                ref={containerRef}
            >
                {cardList.map((card, index) => {
                    const previousHeights = cardHeights.slice(0, index).reduce((acc, height) => acc + height - cardOverlap, 0);
                    const scrollStart = previousHeights;
                    const scrollEnd = previousHeights + cardHeights[index];
                    const finalScrollEnd = totalHeight;

                    const y = useTransform(
                        scrollY,
                        [scrollStart, scrollEnd, finalScrollEnd],
                        [0, index * marginBetweenSticky, index * marginBetweenSticky]
                    );
                    return (
                        <motion.div
                            key={card.index}
                            style={{
                                y,
                                zIndex: index,
                                position: 'sticky',
                                top: '50px',
                                // overflow: 'hidden',
                            }}
                        >
                            <li
                                key={index}
                                className="card lg:mb-[-80px] md:mb-[-40px] mb-[-10px]"
                                style={{
                                    // position: 'sticky',
                                    // top: `${tops[index]}px`,
                                    overflow: 'hidden',
                                    // marginTop: `${index * marginBetweenSticky}px`,
                                    scrollBehavior: 'smooth',
                                    // marginBottom: '-80px', Adjust this value for spacing between cards
                                }}
                                ref={(el) => cardRefs.current[index] = el}
                            >
                                <div className="card-container " style={{ position: 'relative', width: "100%", height: "100%" }}>
                                    {/* Card with background image */}
                                    <img
                                        src={card.backgroundImage}
                                        alt="Card Background"
                                        className="card-background border border-green-500 w-full h-full object-cover"
                                    />


                                    {/* Card text-content*/}
                                    <div
                                        className="card-content top-0 bottom-0 left-5 right-0" //set all to 0
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: "100%",
                                            color: 'white',
                                            zIndex: 1,
                                        }}
                                    >
                                        <div className="text-left">
                                            {(index === 0 || index === 3) && (
                                                <div className="pl-5 md:pl-7 lg:pl-14 lg:py-14 py-0 w-full font-[rubik]">
                                                    <div className="lg:pt-16 md:pt-7 pt-2">
                                                        <p className="lg:text-[32px] md:text-[20px] text-[16px] text-white font-[inter line-height1">{card.uppertext}</p>
                                                        <h1
                                                            className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F] line-height2`}
                                                        >
                                                            {card.numberValue}
                                                        </h1>
                                                        <p
                                                            className={`text-[16px]  md:text-[24px] lg:text-[40px] font-bold text-white line-height3`}
                                                        >{card.headerText} </p>

                                                    </div>
                                                    <div className="lg:pt-16 md:pt-5 pt-2">
                                                        <p className="md:w-7/12 w-full text-[16px] md:text-[20px] lg:text-[30px] text-white font-normal leading-tight line-height3">{card.cardSupText}</p>
                                                        <h1
                                                            className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F] line-height2`}
                                                        >
                                                            {card.numberVolume}
                                                        </h1>
                                                        <p
                                                            className={` text-[16px] md:text-[24px] lg:text-[35px] font-bold text-white lg:pb-5 pb-0 line-height1`}
                                                        > {card.cardUpperText}</p>

                                                        {card.cardText && (
                                                            <button
                                                                className="md:text-[20px] text-[16px] lg:text-[24px] font-normal md:py-3 md:px-7 py-1 px-2 text-white bg-[#063A4F33] rounded-full"
                                                            >
                                                                {card.cardText}
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {(index === 1 || index === 4) && (
                                                <div className="pl-5 md:pl-7 lg:pl-14  w-full font-[rubik] w-full md:w-8/12 slide-left">
                                                    <div className=" lg:pt-16 md:pt-10 pt-2 leading-tight">

                                                        {card.specialUppertext && (
                                                            <p className=" text-[16px] md:text-[20px] lg:text-[30px] text-white">{card.specialUppertext}</p>
                                                        )}

                                                        <h1
                                                            className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F]`}
                                                        >
                                                            {card.numberValue}
                                                        </h1>
                                                        <p
                                                            className={`text-[16px] md:text-[24px] lg:text-[40px] font-normal text-white`}
                                                        >{card.cardText}</p>

                                                    </div>
                                                    <div className="lg:pt-16 md:pt-10 pt-2  leading-tight">
                                                        {card.cardSupText && (
                                                            <p className="lg:w-8/12 w-full text-[16px] md:text-[20px] lg:text-[30px] text-white font-normal line-height3">{card.cardSupText}</p>
                                                        )}
                                                        <h1
                                                            className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F] line-height2`}
                                                        >
                                                            {card.numberVolume}
                                                        </h1>

                                                        <button
                                                            className={`md:text-[20px] text-[16px] lg:text-[28px]  w-8/12 text-left text-sm font-normal py-3 pl-3 pr-10 text-white bg-[#063A4F33] rounded-lg leading-normal `}
                                                        > {card.beforeBtnText} <span className="text-[#063A4F]">{card.numberTitle} </span>{card.afterBtnText} </button>
                                                    </div>
                                                </div>
                                            )}

                                            {(index === 2 || index === 5) && (
                                                <div className="flex">
                                                    <div className="relative md:w-5/12 md:pl-5">
                                                        {/* Responsive Image */}
                                                        <Image
                                                            src={card.img || ''}
                                                            alt="crown"
                                                            width={260}
                                                            height={260}
                                                            className="md:w-45 md:h-45 top-0 left-0 hidden md:flex"

                                                        />
                                                        <h3
                                                            className="card-text text-[22px] md:text-[32px] lg:text-[60px] font-[Rubik] font-semibold text-white md:mt-[-85px] mt-[-40px] mt-[40px] pl-5"
                                                        >
                                                            {card.customerName}
                                                        </h3>
                                                    </div>
                                                    <div
                                                        className={`hidden md:w-7/12  md:flex ${isScrollingPaused ? 'overflow-hidden' : ''}`}
                                                        style={{
                                                            overflowY: isScrollingPaused ? "hidden" : "scroll",
                                                        }}>
                                                        {/* If index === 2, render the small cards */}
                                                        {(index === 2 || index === 5) && card.smallCardsData && (
                                                            <ul
                                                                id="small-cards"
                                                                ref={smallCardsContainerRef} // Ref for the small cards container
                                                            >
                                                                <li
                                                                    className="small-card"
                                                                // style={{ maxHeight: "600px", }}
                                                                // onScroll={handleChildScroll}
                                                                >
                                                                    <div className="small-card-container">
                                                                        {card.smallCardsData.map((smallCard) => (
                                                                            <div
                                                                                key={smallCard.id}
                                                                                className="small-card-content flex justify-center items-center text-left  text-white p-10 border-[0.5px]"
                                                                                style={{
                                                                                    height: "300px",
                                                                                    margin: "30px",
                                                                                    borderRadius: "40px",
                                                                                    // backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                                                    // backdropFilter: "blur(5px)",
                                                                                }}
                                                                            >
                                                                                <h3 className="text-[16px] md:text-[26px] lg:text-[32px] font-bold">{smallCard.text}</h3>
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
                            </li>
                        </motion.div>
                    )
                })}
            </ul>
        </div>
    );
}


const Card = ({
    index,
    card
}: {
        index: number,
    card: CardType
    }) => {
    const [isScrollingPaused, setIsScrollingPaused] = useState(true); // Initially paused
    const smallCardsContainerRef = useRef<HTMLUListElement | null>(null);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

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
            const handleMainScroll = (e) => {
                if (!parentCardRef.current) return;
                if (index === 5) {
                    const stickyElementStyle = window.getComputedStyle(parentCardRef.current);
                    const stickyElementTop = parseInt(stickyElementStyle.top, 10);
                    const currentTop = parentCardRef.current.getBoundingClientRect().top;

                    const oldPosition = document.querySelectorAll('li.card')?.[0].computedStyleMap().get('position');
                    console.log("🚀 ~ handleMainScroll ~ oldHeight:", oldPosition);
                    if (currentTop <= stickyElementTop) {
                        console.log("🚀 ~ handleMainScroll ~ inside true og")
                        if (oldPosition.value === 'sticky') {
                            console.log("🚀 ~ handleMainScroll ~ inside true")
                            document.querySelectorAll('li.card').forEach((item, index) => {
                                item.style.position = 'absolute';
                                //item.style.top = 'unset !important';
                                // item.style.bottom = `${index * 50}px !important`;
                                item.style.left = '50%';
                                item.style.transform = 'translateX(-50%)';
                            })
                            // document.querySelector('ul#mainCards').style.height = '900px'
                            window.scrollBy({
                                top: -600
                            })
                        }
                    } else {
                        if (oldPosition.value === 'absolute') {
                            document.querySelectorAll('li.card').forEach((item, index) => {
                                item.style.position = 'sticky';
                                //item.style.top = 'unset !important';
                                // item.style.bottom = `${index * 50}px !important`;
                                item.style.left = '0';
                                item.style.transform = 'none';
                            })
                            // document.querySelector('ul#mainCards').style.height = 'auto'
                            // runAfterFramePaint(() => {
                            //     window.scrollBy({
                            //         top: 200
                            //     })
                            // });
                        }

                    }

                    return;
                }
                if (!smallCardsContainerRef.current || ![2, 5].includes(index)) return;
                const stickyElementStyle = window.getComputedStyle(parentCardRef.current);
                const stickyElementTop = parseInt(stickyElementStyle.top, 10);
                const currentTop = parentCardRef.current.getBoundingClientRect().top;
                console.log("🚀 ~ handleMainScroll ~ currentTop:", {currentTop, stickyElementTop})

                if (currentTop <= stickyElementTop) {
                    // preventBodyScroll(e);
                    e.preventDefault();
                    e.stopPropagation();
                    window.document.body.style.overflow = 'hidden';
                    // window.document.getElementById('bg-main').style.overflow = 'hidden';
                    const container = smallCardsContainerRef.current;
                    const scrollableHeight = container.scrollHeight - container.clientHeight;
                    const currentScroll = container.scrollTop;

                    // Check if inner scroll is complete
                    if (currentScroll >= scrollableHeight) {
                        // setIsInnerScrollComplete(true);
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
                        // setIsInnerScrollComplete(true);
                        document.body.style.overflow = 'auto';
                        return;
                    }

                    // Calculate and apply scroll
                    const scrollStep = e.deltaY > 0 ? 100 : -100; // Adjust scroll speed
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

    const tops = [100, 200, 250, 300, 350, 400]

    return (
        // <motion.div
        //     // className={`card-container-${i}`}
        //     // style={cardContainer}
        //     initial={{ opacity: 0 }}
        //     whileInView={{ opacity: 1 }}
        //     style={{
        //         display: 'flex',
        //         width: '100%',
        //         justifyContent: 'center',
        //         position: 'sticky',
        //         top: `${100 + (index * 50)}px`
        //     }}
        // >

            <li
                key={index}
                className="card lg:mb-[-80px] md:mb-[-40px] mb-[-10px]"
                style={{
                    // position: 'sticky',
                    top: `${tops[index]}px`,
                    overflow: 'hidden',
                    // marginBottom: '-80px', Adjust this value for spacing between cards
                }}
                ref={index === 2 || index === 5 ? parentCardRef: undefined}
            >
                <div className="card-container " style={{ position: 'relative', width: "100%", height: "100%" }}>
                    {/* Card with background image */}
                    <img
                        src={card.backgroundImage}
                        alt="Card Background"
                        className="card-background border border-green-500 w-full h-full object-cover"
                    />


                    {/* Card text-content*/}
                    <div
                        className="card-content top-0 bottom-0 left-5 right-0" //set all to 0
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: "100%",
                            color: 'white',
                            zIndex: 1,
                        }}
                    >
                        <div className="text-left">
                            {(index === 0 || index === 3) && (
                                <div className="pl-5 md:pl-7 lg:pl-14 lg:py-14 py-0 w-full font-[rubik]">
                                    <div className="lg:pt-16 md:pt-7 pt-2">
                                        <p className="lg:text-[32px] md:text-[20px] text-[16px] text-white font-[inter line-height1">{card.uppertext}</p>
                                        <h1
                                            className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F] line-height2`}
                                        >
                                            {card.numberValue}
                                        </h1>
                                        <p
                                            className={`text-[16px]  md:text-[24px] lg:text-[40px] font-bold text-white line-height3`}
                                        >{card.headerText} </p>

                                    </div>
                                    <div className="lg:pt-16 md:pt-5 pt-2">
                                        <p className="md:w-7/12 w-full text-[16px] md:text-[20px] lg:text-[30px] text-white font-normal leading-tight line-height3">{card.cardSupText}</p>
                                        <h1
                                            className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F] line-height2`}
                                        >
                                            {card.numberVolume}
                                        </h1>
                                        <p
                                            className={` text-[16px] md:text-[24px] lg:text-[35px] font-bold text-white lg:pb-5 pb-0 line-height1`}
                                        > {card.cardUpperText}</p>

                                        {card.cardText && (
                                            <button
                                                className="md:text-[20px] text-[16px] lg:text-[24px] font-normal md:py-3 md:px-7 py-1 px-2 text-white bg-[#063A4F33] rounded-full"
                                            >
                                                {card.cardText}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(index === 1 || index === 4) && (
                                <div className="pl-5 md:pl-7 lg:pl-14  w-full font-[rubik] w-full md:w-8/12 slide-left">
                                    <div className=" lg:pt-16 md:pt-10 pt-2 leading-tight">

                                        {card.specialUppertext && (
                                            <p className=" text-[16px] md:text-[20px] lg:text-[30px] text-white">{card.specialUppertext}</p>
                                        )}

                                        <h1
                                            className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F]`}
                                        >
                                            {card.numberValue}
                                        </h1>
                                        <p
                                            className={`text-[16px] md:text-[24px] lg:text-[40px] font-normal text-white`}
                                        >{card.cardText}</p>

                                    </div>
                                    <div className="lg:pt-16 md:pt-10 pt-2  leading-tight">
                                        {card.cardSupText && (
                                            <p className="lg:w-8/12 w-full text-[16px] md:text-[20px] lg:text-[30px] text-white font-normal line-height3">{card.cardSupText}</p>
                                        )}
                                        <h1
                                            className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F] line-height2`}
                                        >
                                            {card.numberVolume}
                                        </h1>

                                        <button
                                            className={`md:text-[20px] text-[16px] lg:text-[28px]  w-8/12 text-left text-sm font-normal py-3 pl-3 pr-10 text-white bg-[#063A4F33] rounded-lg leading-normal `}
                                        > {card.beforeBtnText} <span className="text-[#063A4F]">{card.numberTitle} </span>{card.afterBtnText} </button>
                                    </div>
                                </div>
                            )}

                            {(index === 2 || index === 5) && (
                                <div className="flex">
                                    <div className="relative md:w-5/12 md:pl-5">
                                        {/* Responsive Image */}
                                        <Image
                                            src={card.img || ''}
                                            alt="crown"
                                            width={260}
                                            height={260}
                                            className="md:w-45 md:h-45 top-0 left-0 hidden md:flex"

                                        />
                                        <h3
                                            className="card-text text-[22px] md:text-[32px] lg:text-[60px] font-[Rubik] font-semibold text-white md:mt-[-85px] mt-[-40px] mt-[40px] pl-5"
                                        >
                                            {card.customerName}
                                        </h3>
                                    </div>
                                    <div
                                        className={`hidden md:w-7/12  md:flex ${isScrollingPaused ? 'overflow-hidden' : ''}`}
                                        style={{
                                            overflowY: isScrollingPaused ? "hidden" : "scroll",
                                        }}>
                                        {/* If index === 2, render the small cards */}
                                        {(index === 2 || index === 5) && card.smallCardsData && (
                                            <ul
                                                id="small-cards"
                                                ref={smallCardsContainerRef} // Ref for the small cards container
                                            >
                                                <li
                                                    className="small-card"
                                                // style={{ maxHeight: "600px", }}
                                                // onScroll={handleChildScroll}
                                                >
                                                    <div className="small-card-container">
                                                        {card.smallCardsData.map((smallCard) => (
                                                            <div
                                                                key={smallCard.id}
                                                                className="small-card-content flex justify-center items-center text-left  text-white p-10 border-[0.5px]"
                                                                style={{
                                                                    height: "300px",
                                                                    margin: "30px",
                                                                    borderRadius: "40px",
                                                                    // backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                                    // backdropFilter: "blur(5px)",
                                                                }}
                                                            >
                                                                <h3 className="text-[16px] md:text-[26px] lg:text-[32px] font-bold">{smallCard.text}</h3>
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
            </li>
        // </motion.div>
    )
}

export default CardStack;

