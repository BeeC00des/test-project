// "use client";
// import Image from "next/image";

// // Define the props for the Card component
// type CardProps = {
//     transparentText: string;
//     numberTitle: string;
//     unit: string;
//     subTitle: string;
//     text: string;
//     img: string;
// };

// function Card({ transparentText, numberTitle, subTitle, text, unit, img }: CardProps) {

//     return (
//         <div className=" sm:w-1/2  md:w-10/12 lg:w-10/12 lg:h-[580px] md:h-[400px] sm:h-[250px] sm:mx-5 lg:ml-16 rounded-xl bg-[#FFFFFF1A] ">
//             <div className=" sm:my-20 lg:my-0">
//                 <p className="sm:text-[30px] md:text-[45px] lg:text-[150px]  font-[asgard] font-extrabold text-[#0000000D] [word-spacing:0.5rem]">{transparentText}</p>

//                 <div className="flex justify-center items-center ">
//                     <div className="px-7 lg:w-8/12">
//                         <h1 className="lg:text-[85px] sm:text-[30px] md:text-[60px] font-[rubik] font-extrabold text-white ">{numberTitle}</h1>
//                         <p className="lg:text-[60px] sm:text-[25px] md:text-[40px] font-[rubik] font-extrabold text-white uppercase pb-5">{unit}</p>
//                         <h3 className="lg:text-4xl sm:text-xl font-normal font-[asgardRegular] text-[#FDB515] pb-4 ">{subTitle}</h3>
//                         <p className="lg:text-2xl sm:text-base  font-[inter] font-normal text-white pb-12">{text}</p>
//                     </div>
//                     <div className="hidden md:flex justify-left items-center pt-10 ">
//                         <Image src={img} alt="items" width={320} height={320} />
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default Card;


"use client";
import Image from "next/image";
import getMerchantData from "../api/page";
import { useState, useEffect } from "react";

// Define the props for the Card component
type CardProps = {
    transparentText: string;
    numberTitle: string;
    unit: string;
    subTitle: string;
    text: string;
    img: string;
};

function Card({ transparentText, numberTitle, subTitle, text, unit, img }: CardProps) {
    const [merchantData, setMerchantData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMerchantData = async () => {
            const merchantId = "581b763d636c88ee8585e78cf490d063";

            setLoading(true);
            setError(null);
            try {
                const data = await getMerchantData(merchantId);
                setMerchantData(data);
                console.log(data);
            } catch (err) {
                setError("Failed to fetch merchant data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMerchantData();
    }, []); // Empty dependency array ensures this runs only once on component mount

    return (
        <div className="sm:w-1/2 md:w-10/12 lg:w-11/12 lg:h-[580px] md:h-[400px] sm:h-[250px] sm:mx-5 lg:ml-16 rounded-xl bg-[#FFFFFF1A]">
            <div className="sm:my-20 lg:my-0">
                <p className="sm:text-[30px] md:text-[45px] lg:text-[120px] font-[asgard] font-extrabold text-[#0000000D]">
                    {transparentText}
                </p>

                <div className="flex justify-center items-center">
                    <div className="px-7 lg:w-8/12">
                        <h1 className="lg:text-[85px] sm:text-[30px] md:text-[60px] font-[rubik] font-extrabold text-white">
                            {numberTitle}
                        </h1>
                        <p className="lg:text-[60px] sm:text-[25px] md:text-[40px] font-[rubik] font-extrabold text-white uppercase pb-5">
                            {unit}
                        </p>
                        <h3 className="lg:text-4xl sm:text-xl font-normal font-[asgardRegular] text-[#FDB515] pb-4">
                            {subTitle}
                        </h3>
                        <p className="lg:text-2xl sm:text-base font-[inter] font-normal text-white pb-12">
                            {text}
                        </p>

                    </div>
                    <div className="hidden md:flex justify-left items-center pt-10">
                        <Image src={img} alt="items" width={320} height={320} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
