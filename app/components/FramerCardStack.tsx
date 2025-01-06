
"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import throttle from 'lodash.throttle';
import { useMediaQuery } from 'react-responsive'
import { motion, useScroll, useTransform } from 'motion/react';


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

function FramerCardStack({ cardList }: CardProps) {
    // console.log("🚀 ~ CardStack ~ cardList:", cardList)

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();




    return (

        <div className="mainCard my-[80px] mx-auto mb-[50px] lg:pb-[900px]" style={{
            width: '80%',
            position: 'relative'
        }}
            ref={containerRef}

        >
            {/* Render the list of cards from array */}
            
                {cardList.map((card, index) => {
                    return (
                        <Card
                            card={card}
                            index={index}
                            key={index}
                        />
                    )
              
                })}
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
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const isTabletOrMobile = isMobile || isTablet
    const tops =
        isTabletOrMobile ? [50, 100, 150, 200, 250, 300] : [100, 175, 250, 325, 400, 475]
    const heights = isMobile ? [] : isTablet ? [] : [647, 584, 536, 647, 584, 536];
    const container = useRef<HTMLDivElement>(null);
    const componentRef = useRef<HTMLDivElement>(null);
    const innerContainer = useRef(null);
    // const { scrollYProgress } = useScroll({
    //     target: container,
    //     offset: ["start end", "start start"],
    // });
    const [height, setHeight] = useState(-1)
    console.log("🚀 ~ height:", height)

    // const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    // const scale = useTransform(progress, range, [1, targetScale]);

    // const { scrollYProgress: innerScrollProgress } = useScroll({
    //     target: innerContainer,
    //     offset: ["start start", "end end"],
    // });

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (componentRef.current) {
                setHeight(componentRef.current.offsetHeight);
            }
        });

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, []);
    
    useEffect(() => {
        if (container.current) {
            setHeight(container.current.offsetHeight);
            console.log("here assigning height", container.current.offsetHeight)
            // container.current.style.height = `${container.current.offsetHeight}px`
        }
    }, []);
    console.log("🚀 ~ useLayoutEffect ~ container.current:", container.current)

    return (
        <div ref={container}
            style={{
            position: 'sticky',
                top: 0,
                height: heights[index]
            }}
        >
            {/* <motion.div
                // style={cardContainer}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                ref={}
            > */}

                <div
                    key={index}
                    className="card lg:mb-[-80px] md:mb-[-40px] mb-[-10px]"
                    style={{
                        position: 'relative',
                        top: `${tops[index]}px`,
                        overflow: 'hidden',
                        transformOrigin: 'top',
                        height: heights[index]
                        // marginBottom: '-80px', Adjust this value for spacing between cards
                    }}
                    ref={componentRef}
                >
                    <div className="card-container " style={{ position: 'relative', width: "100%", height: "100%" }}>
                        {/* Card with background image */}
                        <img
                            src={card.backgroundImage}
                            alt="Card Background"
                            className="card-background w-full h-full object-cover"
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
                                    <div className="pl-0 md:pl-7 lg:pl-14 lg:py-14 py-0 w-full font-[rubik]">
                                        <div className="lg:pt-5 md:pt-3 pt-2">
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
                                        <div className="lg:pt-10 md:pt-7 pt-2">
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
                                    <div className="pl-0 md:pl-7 lg:pl-14  w-full font-[rubik] w-full md:w-8/12 slide-left">
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
                                        <div className="lg:pt-5 md:pt-7 pt-2  leading-tight">
                                            {card.cardSupText && (
                                                <p className="lg:w-8/12 w-full text-[16px] md:text-[20px] lg:text-[30px] text-white font-normal line-height3">{card.cardSupText}</p>
                                            )}
                                            <p  className={`text-[20px] md:text-[32px] lg:text-[60px] text-white font-semibold`}>{card.uppertext}</p>
                                            <h1
                                                className={`text-[20px] md:text-[32px] lg:text-[60px] font-bold text-[#063A4F] line-height2`}
                                            >
                                                {card.numberVolume}
                                            </h1>

                                            <button
                                                className={`md:text-[20px] text-[16px] lg:text-[28px] md:w-8/12 w-10/12 text-left text-sm font-normal py-3 pl-3 pr-10 text-white bg-[#063A4F33] rounded-lg leading-normal `}
                                                style={{
                                                    borderRadius:"20px"
                                                }}
                                            > {card.beforeBtnText} <span className="text-[#063A4F]">{card.numberTitle}, </span>{card.afterBtnText} </button>
                                        </div>
                                    </div>
                                )}

                                {(index === 2 || index === 5) && (
                                    <div className="flex">
                                        <div className="relative w-4/12 md:w-5/12 pl-0 md:pl-5 flex items-start justify-start ">
                                            {/* Responsive Image */}
                                            <div className="customerDetails mt-[0px] lg:mt-[110px] lg:mt-[60px]">
                                            <Image
                                                src={card.img || ''}
                                                alt="crown"
                                                width={260}
                                                height={260}
                                                className="md:w-45 md:h-45 top-0 left-0 hidden md:flex md:items-center"

                                            />
                                            <h3
                                                className="card-text capitalize text-[22px] md:text-[32px] lg:text-[60px] font-[Rubik] font-semibold text-white md:mt-[-85px] mt-[-40px] mt-[40px] md:pl-5 pl-0"
                                            >
                                                {card.customerName}
                                            </h3>
                                            </div>
                                        
                                        </div>
                                        <div
                                            className={`w-8/12 md:w-7/12  md:flex overflow-hidden`}
                                            style={{
                                               // overflowY: isScrollingPaused ? "hidden" : "scroll",
                                            }}>
                                            {/* If index === 2, render the small cards */}
                                            {(index === 2 || index === 5) && card.smallCardsData && (
                                                <ul
                                                    id="small-cards"
                                                    ref={innerContainer} // Ref for the small cards container
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
                                                                    className="small-card-content flex justify-center items-center text-left  text-white md:p-10 p-5 border-[0.5px]"
                                                                    style={{
                                                                        height: isMobile? '150px': "300px",
                                                                        margin: isMobile? '0': "30px",
                                                                        borderRadius: isMobile? '20': "30px",
                                                                        marginBottom: isMobile ? '10px': '0'
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
                </div>
            {/* </motion.div> */}
        </div>
    )
}

export default FramerCardStack