"use client";
import Image from "next/image"

type CardProps = {
    title: string
    message: string
    subTitle: string
    text: string
    img:string
};


function MessageCard({  title, subTitle, text, message, img }: CardProps) {

    console.log("from card compontent");

    return (
        <div className="lg:w-10/12 sm:w-full h-[800px] sm:mx-5  border border-white rounded-full flex justify-center items-end ">
            {/* <div className="text-center ">
              <div className="pt-10">
                   <Image src={img} alt="items" width={320} height={320}/>
                </div>
                    <div className=" px-5">
                        <h1 className="text-[85px] font-bold text-white">{title}</h1>
                        <p className="text-[60px] text-white">{message}</p>
                        <h3 className="text-2xl font-medium text-[#FDB515] py-3">{subTitle}</h3>
                        <p className="text-xl font-thin text-white pb-12">{text}</p>
                    </div>
            </div> */}
        </div>
    );
}

export default MessageCard;
