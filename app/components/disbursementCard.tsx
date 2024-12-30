
// "use client";

// import { useState, useEffect, useRef } from "react";


// // Define the props for the Card component
// type CardProps = {
//     numberTitle: string;
//     unit: string;
//     text: string;
//     backgroundImage: string;
//     index: number;
//     top: string;
// };

// function DisbursementCard({ numberTitle, text, index, unit, top, backgroundImage}: CardProps) {

//     const [formattedUnitText, setFormattedUnitText] = useState<string>("");

//     useEffect(() => {
//         const styleLastWord = (text: string) => {
//             if (!text) {
//                 return ""; // Return empty string if text is undefined or null
//             }

//             const textArray = text.split(" "); // Split text into words
//             const lastWord = textArray.pop(); // Get the last word

//             if (lastWord) {
//                 // Return the rest of the text and apply a span to the last word
//                 return `${textArray.join(" ")} <span class="underline decoration-wavy">${lastWord}</span>`;
//             }
//             return text;
//         };

//         // Check if the current index is 3 or 4
//         if ([3, 4].includes(index)) {
//             setFormattedUnitText(styleLastWord(unit));
//         } else {
//             setFormattedUnitText(unit); // Use the text as-is for other indices
//         }
//     }, [unit, index]); // Dependencies include `unit` and `index

    

//     return (
//         <li
//             className={`card md:w-10/12 lg:w-10/12 mx-auto`}
//             style={{
//                 backgroundImage: `url(${backgroundImage})`,
//                 backgroundSize: "cover cover",
//                 backgroundPosition: "center center",
//                 backgroundRepeat: "no-repeat",
//                 borderRadius: "50px",
//                 position: 'sticky',
//                 top: `${top}`,
//                 // height:`${height}`
//             }}
//         >
//             <div className=" card__content block md:flex ">
//                 <div className="w-full md:w-7/12  slide-left">
//                     <div className=" pl-2 md:pl-14 py-7 w-full font-[rubik]">
//                         <h1
//                             className={` sm:text-[30px] md:text-[40px] font-bold`}
//                         >
//                             {numberTitle}
//                         </h1>

//                         <p
//                             className={` sm:text-[25px] md:text-[40px] font-bold pb-5 ${index === 5
//                                 ? 'text-[#F8C47A]'
//                                 : [3, 4].includes(index)
//                                     ? 'text-[#063A4F]'
//                                     : 'text-white'
//                                 }
//                                 ${index === 5
//                                     ? 'lg:text-[55px]' : [0, 1].includes(index)
//                                         ? 'lg:text-[60px]'
//                                         : 'lg:text-[40px]'}`}

//                             dangerouslySetInnerHTML={{ __html: formattedUnitText }}
//                         />

//                         <p
//                             className={`lg:text-[24px] sm:text-base font-normal pb-12 text-black  `}>{text} </p>.
//                     </div>
//                 </div>
//             </div>
//         </li >
//     );
// }

// export default DisbursementCard;



"use client";

import { useState, useEffect, useRef } from "react";
import useScrollAnimations from "./scrollAnimation";
import Image from "next/image";


// Define the props for the Card component
type CardProps = {
    numberTitle: string;
    unit: string;
    text: string;
    backgroundImage: string;
    index: number;
    top: string;
};

function DisbursementCard({ numberTitle, text, unit, backgroundImage, index,top }: CardProps) {

    const [formattedText, setFormattedText] = useState<string>("");

    useEffect(() => {
        const styleLastWord = (text: string) => {
            if (!text) {
                return ''; // Return empty string if text is undefined or null
            }

            const textArray = text.split(' '); // Split text into words
            const lastWord = textArray.pop(); // Get the last word

            if (lastWord) {
                // Return the rest of the text and apply a span to the last word
                return `${textArray.join(' ')} <span class="underline decoration-wavy">${lastWord}</span>`;
            }
            return text;
        };


        setFormattedText(styleLastWord(text));
    }, [text]);

    const [formattedUnitText, setFormattedUnitText] = useState<string>("");

    useEffect(() => {
        const styleLastWord = (text: string) => {
            if (!text) {
                return ""; // Return empty string if text is undefined or null
            }

            const textArray = text.split(" "); // Split text into words
            const lastWord = textArray.pop(); // Get the last word

            if (lastWord) {
                // Return the rest of the text and apply a span to the last word
                return `${textArray.join(" ")} <span class="underline decoration-wavy">${lastWord}</span>`;
            }
            return text;
        };

        // Check if the current index is 3 or 4
        if (index == 2) {
            setFormattedUnitText(styleLastWord(unit));
        } else {
            setFormattedUnitText(unit); // Use the text as-is for other indices
        }
    }, [unit, index]); // Dependencies include `unit` and `index`



    useScrollAnimations();

    return (
        <li
        className={`card md:w-10/12 lg:w-10/12 mx-auto ${index === 4 ? 'h-[350px]' : 'h-auto'} ${[1, 4].includes(index) ? 'h-[600px]' : 'h-auto'}`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50px",
                position: 'sticky',
                top: `${top}`,
                // height:`${height}`
            }}
        >
            <div className=" card__content block md:flex ">
                <div className="w-full md:w-7/12  slide-left">
                    <div className=" pl-2 md:pl-14 py-7 w-full font-[rubik]">
                        <h1
                            className={` sm:text-[30px] md:text-[40px] font-bold  ${[0, 1].includes(index) ? 'text-[#063A4F]' : 'text-white'} ${[3, 4].includes(index) ? 'lg:text-[55px]' : 'lg:text-[65px]'}`}
                        >
                            {numberTitle}
                        </h1>

                      

                        <p
                            className={` sm:text-[25px] md:text-[40px] font-bold pb-5 ${index === 4
                                ? 'text-[#F8C47A]'
                                : [2].includes(index)
                                    ? 'text-[#063A4F]'
                                    : 'text-white'
                                }
                                ${index === 4
                                    ? 'lg:text-[55px]' : [0, 1].includes(index)
                                        ? 'lg:text-[60px]'
                                        : 'lg:text-[40px]'}`}

                            dangerouslySetInnerHTML={{ __html: formattedUnitText }}
                        />

                        <p
                            className={`lg:text-[24px] sm:text-base font-normal pb-12 text-white  `}
                            dangerouslySetInnerHTML={{ __html: formattedText }}
                        />
                    </div>
                </div>
            </div>
        </li >
    );
}

export default DisbursementCard;



