"use client";
import Image from "next/image"

type card = {
    supText: string
    title: string
    subText: string
    icon: string
    text: string
    img: string
    bigImg: string
};


function ShortCard2({ supText, title, subText, icon, text, img, bigImg }: card) {

    console.log("from card compontent");

    return (
        <div className="flex justify-center items-center ">
            <div className="lg:w-11/12 sm:w-full h-[400px] sm:mx-5 lg:ml-16 lg:my-20 mx-auto flex justify-between items-center">
                <div className="flex justify-center items-center lg:w-5/12">
                    <Image src={bigImg} alt="coins" width={400} height={400} />
                </div>
                <div className=" px-3 lg:w-6/12 h-full flex justify-center items-center rounded-xl border">
                    <div className="px-5">
                        <p className="text-xl text-white py-1">{supText}</p>
                        <h1 className="text-5xl capitalize font-extrabold text-[#FDB515]">{title}</h1>
                        <p className="text-xl text-white">{subText}</p>

                        <hr className="lg:w-8/12 sm:w-full my-7" />

                        <div className="flex">
                            <Image src={icon} alt="calendar" width={30} height={30} />
                            <h3 className="text-[50px] font-extrabold text-white py-3">{text}</h3>
                            <Image src={img} alt="money" width={200} height={200} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShortCard2;
