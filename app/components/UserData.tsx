"use client";
import Image from "next/image"

type User = {

    merchantName: string
    text: string
    subtext:string
    undertext:string
};


function UserData({ merchantName, text, subtext,undertext }: User) {

    return (
      <div className="flex justify-center items-center ">
            <div className="lg:w-10/12 sm:w-full h-[500px] sm:mx-5 lg:ml-7 lg:my-20">
                <div className="px-3  lg:w-8/12">
                    <div className="flex justify-center align-center">
                        <Image src="/images/crown.png" alt ="user-crown"width={263} height={263} />
                        <h3 className="py-2 text-[85px] font-extrabold text-white ">{merchantName}</h3>
                    </div>
                    {/* carousel */}
                    <div className=" px-3 pl-44">
                        <hr className="lg:w-8/12 sm-full p-2" />
                        <ul className="text-white py-5  ">
                            <li className="text-2xl font-thin pb-1">{text}</li>
                            <li className="text-2xl font-thin pb-1">{subtext}</li>
                            <li className="text-2xl font-thin pb-1">{undertext}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserData;
