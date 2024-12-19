"use client";
import Image from "next/image"

type card = {
    numberTitle: string
    unit: string
    text: string
    img: string
};


function SettleCard({ numberTitle, text, unit, img }: card) {

    console.log("from card compontent");

    return (
        <div className="lg:w-10/12 sm:w-full h-[7000px] sm:mx-5 lg:mx-auto lg:my-20 border border-white rounded-xl ">
            <div className=" flex px-3 py-10 justify-center items-end">
                <div className="text-left lg:w-8/12 border border-red-500">

                    <div className=" px-5 lex justify-betweem items-center">
                        <div>
                            <h1 className="text-[80px] font-bold text-white">{numberTitle}</h1>
                            <p className="text-[60px] text-white capitilize">{unit}</p>
                        </div>


                        <div className="flex justify-center items-center">
                            <Image src={img} alt="settlecCash" width={150} height={150} />
                            <p className="text-xl font-thin text-white pb-12">{text}</p>
                        </div>
                    </div>

                </div>
                {/* <div className="flex justify-left items-center pt-10">
                    <Image src={img} alt="items" width={320} height={320} />
                </div> */}
            </div>
        </div>
    );
}

export default SettleCard;
