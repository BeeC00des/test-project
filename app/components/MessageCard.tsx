"use client";
import Image from "next/image"
import useScrollAnimations from "./scrollAnimation";

type CardProps = {
    title: string
    ratings: string
    subTitle: string
    text: string
    img: string
};


function MessageCard({ title, subTitle, text, ratings, img }: CardProps) {


    useScrollAnimations(); // Activate scroll animations

    return (
        <div className="h-auto lg:h-[800px] w-full flex justify-center items-center bg-sectionMsg md:p-0 p-5">
            <div className="flex flex-col justify-center items-center w-full text-center text-white">
                <div className="md:w-3/12 w-full text-center relative mt-50 slide-top">
                    <Image src={img} alt="items" width={200} height={200} className="thumb absolute top-0 left-1/2 transform -translate-x-1/2 z-10" />
                    <h3 className="text-[22px] md:text-lg lg:text-2xl font-normal leading-tight relative z-0 mt-40">{subTitle}</h3>
                </div>

                <div className="slide-bottom ">
                    <h1 className="text-[45px] md:text-[60px] capitalize font-[asgard] font-bold py-3">{title}</h1>

                    <div className="flex justify-center items-center h-10 my-5">
                        <Image src={ratings} alt="star" width={90} height={32} />
                    </div>

                  
                </div>
                <p className="md:w-5/12 w-full text-[20px] md:text-[24px] font-normal md:py-7 font-[inter] leading-relaxed slide-bottom">{text}</p>


            </div>
        </div>

    );
}

export default MessageCard;
