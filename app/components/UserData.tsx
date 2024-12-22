"use client";
import Image from "next/image"

type User = {

    merchantName: string
    text: string
    subtext: string
    undertext: string
};


function UserData({ merchantName, text, subtext, undertext }: User) {

    return (
        <div className="flex justify-center items-center animate-zoomOut ">
            <div className="lg:w-10/12 sm:w-full lg:h-[500px] md:h-auto sm:mx-5  ml-0 md:ml-7 my-12 md:my-20 sm:my-10 ">
                <div className="px-3 lg:w-8/12 relative">
                    <div className="lg:flex justify-center align-center">
                        <Image src="/images/crown.png" alt="user-crown" width={263} height={263} className="hidden md:hidden lg:block absolute top-[-25px] left-0 w-45 h-45" />
                        <h3 className="py-2 lg:pl-44 text-2xl md:text-[60px] lg:text-[65px]  font-[Rubik] font-extrabold text-white ">{merchantName}</h3>
                    </div>

                </div>
                {/* carousel */}
                <div className=" px-3 lg:pl-44">
                    <hr className="lg:w-8/12 sm-full p-2" />
                    <ul className="text-white py-5  ">
                        <li className="text-lg md:text-2xl font-thin pb-1">{text}</li>
                        <li className=" text-base md:text-2xl font-thin pb-1">{subtext}</li>
                        <li className=" text-base md:text-2xl font-thin pb-1">{undertext}</li>
                    </ul>
                </div>
            </div>
        </div>
        // </div>/
    );
}

export default UserData;
