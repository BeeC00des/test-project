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


function ShortCard({ supText, title, subText, icon, text, img, bigImg }: card) {

    console.log("from card compontent");

    return (
        // <div className="lg:flex justify-center items-center">
        //     <div className="lg:w-11/12 md:w-auto sm:w-full lg:h-[400px] md:h-auto sm:h-auto sm:my-10 mx-5 lg:ml-16 lg:my-20  block md:flex justify-between items-center">

        //         <div className=" p-5 lg:px-12 h-full flex justify-center rounded-xl bg-[#FFFFFF1A]">
        //             <div className="px-2">
        //                 <p className="text-lg md:text-2xl text-white py-1 font-[inter]">{supText}</p>
        //                 <h1 className="lg:text-[32px] sm:text-2xl capitalize font-[asgard] text-[#FDB515] py-1">{title}</h1>
        //                 <p className="text-lg md:text-2xl text-white font-[inter]">{subText}</p>

        //                 <hr className="lg:w-8/12 sm:w-full my-7" />

        //                 <div className="flex relative">
        //                     <Image src={icon} alt="calendar" width={80} height={80} />
        //                     <h3 className="text-[30px] lg:text-[70px] md:text-[35px]  font-extrabold text-white py-3">{text}</h3>
        //                     <Image src={img} alt="money" width={100} height={100} className="hidden md:block absolute lg:top-[70px] lg:left-[250px] md:top-[50px] md:left-[170px]" />
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="flex justify-center items-center lg:w-5/12">
        //             <Image src={bigImg} alt="wallet" width={400} height={400} />
        //         </div>
        //     </div>
        // </div>

        <div className="lg:flex justify-center items-center  my-12 md:my-0 ">
        <div className="lg:w-11/12 md:w-auto sm:w-full lg:h-[400px] md:h-auto sm:h-auto sm:my-50 mx-5 lg:ml-16 lg:my-20   block md:flex justify-between items-center">
            
            <div className=" p-5 lg:px-12 h-full lg:flex justify-center rounded-xl bg-[#FFFFFF1A]">
            <div className="px-0 md:px-2">
                    <p className="text-lg md:text-2xl text-white py-1 font-[inter]">{supText}</p>
                    <h1 className="lg:text-[32px] sm:text-2xl capitalize font-[asgard] text-[#FDB515] py-1">{title}</h1>
                    <p className="text-lg md:text-2xl text-white font-[inter]">{subText}</p>

                    <hr className="lg:w-8/12 sm:w-full my-7" />

                    <div className="flex relative">
                        <Image src={icon} alt="calendar" width={80} height={80} />
                        <h3 className=" text-[30px] lg:text-[70px] md:text-[35px] sm:text-[20px] font-extrabold text-white py-3">{text}</h3>

                        <Image src={img} alt="coin" width={100} height={100} className="hidden md:block absolute lg:top-[70px]  lg:left-[300px] md:top-[50px] md:left-[170px]" />
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center lg:w-5/12">
                  <Image src={bigImg} alt="wallet" width={400} height={400} />
            </div>
        </div>
    </div>
    );
}

export default ShortCard;
