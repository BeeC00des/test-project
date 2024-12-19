"use client";
import Image from "next/image"

type CardProps = {
    transparentText: string
    numberTitle: string
    unit: string
    subTitle: string
    text: string
    img:string
};


function Card({ transparentText, numberTitle, subTitle, text, unit, img }: CardProps) {

    console.log("from card compontent");

    return (
        <div className="lg:w-10/12 sm:w-full h-[580px] sm:mx-5 lg:ml-16 lg:my-20 border border-white rounded-xl ">
            <div className=" flex px-3 py-10 justify-center items-end">
                <div className="text-left lg:w-8/12">
                    {/* <h3 className="text-[90px] font-extrabold text-[#0000000D]">{transparentText}</h3> */}
                    <div className=" px-5">
                        <h1 className="text-[85px] font-bold text-white">{numberTitle}</h1>
                        <p className="text-[60px] text-white">{unit}</p>
                        <h3 className="text-2xl font-medium text-[#FDB515] py-3">{subTitle}</h3>
                        <p className="text-xl font-thin text-white pb-12">{text}</p>
                    </div>

                </div>
                <div className="flex justify-left items-center pt-10">
                   <Image src={img} alt="items" width={320} height={320}/>
                </div>
            </div>
        </div>
    );
}

export default Card;
