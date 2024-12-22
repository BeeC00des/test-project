"use client";
import Image from "next/image"
import { useState } from "react";
import "./GradientMask.css"



type card = {
    numberTitle: string
    unit: string
    text: string
    img: string
};


function SettleCard({ numberTitle, text, unit, img }: card) {

    const [currentMask, setCurrentMask] = useState(0);

    const handleRectangleClick = () => {
        setCurrentMask((prevMask) => (prevMask + 1) % 3);
    };

    console.log("from mask card compontent");

    return (
        <div>

            <div className="lg:w-10/12 lg:h-[600px] md:h-[400px] sm:h-[200px] lg:mt-60 md:mt-70 md:w-auto  sm:w-full sm:mx-5 lg:mx-auto rectangle rounded-xl flex justify-center items-center" onClick={handleRectangleClick} >

{/* gradinet */}
                <div
                    className={`mask mask1 ${currentMask === 0 ? "active" : ""}`}
                ></div>
                <div
                    className={`mask mask2 ${currentMask === 1 ? "active" : ""}`}
                ></div>
                <div
                    className={`mask mask3 ${currentMask === 2 ? "active" : ""}`}
                ></div>
                {/* gradinet */}

                <div className="px-5 lg:flex md:flex justify-betweem items-center lg:w-10/12 rectangle-content">
                    <div className="relative mt-10 md:mt-0">
                        <h1 className="lg:text-[80px] md:text-[50px] sm:text-[30px] font-extrabold font-[Rubik] text-white">{numberTitle}</h1>
                        <p className="lg:text-[60px] sm:text-[25px] md:text-[40px] font-[rubik] font-extrabold text-white uppercase md:pb-5 pb-0">{unit}</p>
                    </div>

                    <div className="md:pt-10  pt-0 relative">
                        <Image src={img} alt="items" width={320} height={320} />
                        <p className="text-2xl font-medium text-white pb-12 w-10/12 hidden md:hidden lg:block absolute lg:top-[240px] md:top-[230px] lg:left-[230px] md:left-30px">{text}</p>
                       
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SettleCard;
