// "use client";
// import Image from "next/image"
// import useScrollAnimations from "./scrollAnimation";
// import { useState } from "react";
// import { useInView } from "react-intersection-observer";

// type CardProps = {
//     title: string
//     ratings: string
//     subTitle: string
//     text: string
//     img: string
// };


// function MessageCard({ title, subTitle, text, ratings, img }: CardProps) {
//     const [isConfettiVisible, setConfettiVisible] = useState(false);

//     // Intersection Observer Hook
//     const { ref, inView } = useInView({
//         threshold: 0.5, // Trigger when 50% of the section is visible
//         triggerOnce: true, // Run animation only once
//         onChange: (inView) => {
//             if (inView) setConfettiVisible(true);
//         },
//     });


//     useScrollAnimations(); // Activate scroll animations

//     return (
//         <div className="h-[700px] md:h-[950px] w-full flex justify-center items-center bg-sectionMsg md:p-0 p-5">
//             <div className="flex flex-col justify-center items-center w-full text-center text-white">
//                 <div className="md:w-3/12 w-full text-center relative mt-55 slide-top ">
//                     <Image src={img} alt="items" width={200} height={200} className="thumb absolute top-0 left-1/2 transform -translate-x-1/2 z-10 " />
//                     <h3 className="text-[20px] md:text-lg lg:text-[28px] font-normal leading-relaxed relative z-0 mt-40 slide-top">{subTitle}</h3>
//                 </div>

//                 <div className="slide-bottom ">
//                     <h1 className="text-[30px] md:text-[90px] capitalize font-[asgard] font-bold py-3">{title}</h1>

//                     <div className="flex justify-center items-center h-10 my-5">
//                         <Image src={ratings} alt="star" width={90} height={32} />
//                     </div>


//                 </div>
//                 <p className="md:w-5/12 w-full text-[16px] md:text-[24px] font-normal md:py-7 font-[inter] leading-relaxed slide-bottom">{text}</p>


//                 {/* Confetti Animation */}
//                 {isConfettiVisible && (
//                     <div className="absolute inset-0 z-0">
//                         <img
//                             src="/images/coffetti.gif"
//                             alt="Confetti Animation"
//                             className="w-full h-full object-cover"
//                         />
//                     </div>
//                 )}
//             </div>





//         </div>

//     );
// }

// export default MessageCard;


"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type CardProps = {
  title: string;
  ratings: string;
  subTitle: string;
  text: string;
  img: string;
};

function MessageCard({ title, subTitle, text, ratings, img }: CardProps) {
  const [isConfettiVisible, setConfettiVisible] = useState(false);
  const [imageSize, setImageSize] = useState(200);

  // UseEffect hook to listen for window resize events
  useEffect(() => {
    const handleResize = () => {
      // Update the image size based on window width
      setImageSize(window.innerWidth < 768 ? 100 : 200);
    };

    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Intersection Observer Hook
  const { ref, inView } = useInView({
    threshold: 0.25,  // Trigger with 25% of the section visible
    triggerOnce: false,  // Allow the confetti to be triggered multiple times
    onChange: (inView) => {
      if (inView) {
        setConfettiVisible(true);

        // Reset confetti visibility after a specific duration (for continuous looping)
        setTimeout(() => {
          setConfettiVisible(false);

          // Restart confetti after a short delay
          setTimeout(() => setConfettiVisible(true), 500); // Delay between confetti animations
        }, 2000); // Duration of the animation (adjust based on your confetti gif duration)
      }
    },
  });

  return (
    <div
      className="relative h-[700px] md:h-[950px] w-full flex justify-center items-center bg-sectionMsg md:p-0 p-5"
      ref={ref}
    >
      <div className="flex flex-col justify-center items-center w-full text-center text-white">
      <div className="lg:w-3/12 md:w-6/12 w-8/12 text-center relative md:mt-55 mt-0 slide-top">
          <Image
            src={img}
            alt="items"
            width={imageSize}
            height={imageSize}
            className="thumb absolute md:top-0 top-20  left-1/2 transform -translate-x-1/2 z-10"
          />
          <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-normal leading-relaxed relative z-0 mt-40 slide-top">
            {subTitle}
          </h3>
        </div>

        <div className="slide-bottom">
          <h1 className="text-[30px] md:text-[55px] lg:text-[90px] capitalize font-[asgard] font-bold py-3">
            {title}
          </h1>

          <div className="flex justify-center items-center h-10 my-5">
            <Image src={ratings} alt="star" width={90} height={32} />
          </div>
        </div>
        <p className="md:w-6/12 w-full text-[20px] md:text-[24px] font-normal md:py-7 font-[inter] leading-relaxed slide-bottom">
          {text}
        </p>

        {/* Confetti Animation */}
        {isConfettiVisible && (
          <div className="absolute inset-0 z-20">
            <img
              src="/images/coffetti.gif" // Ensure the GIF path is correct
              alt="Confetti Animation"
              className="w-full h-full object-contain" // Use object-contain instead of object-cover for better quality
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageCard;


