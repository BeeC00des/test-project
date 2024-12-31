"use client";
import Image from "next/image";
import useScrollAnimations from "./scrollAnimation"; 

type Props = {
  title: string;
  text: string;
  img: string;
};

function Merchantcard({ title, text, img }: Props) {
  useScrollAnimations(); // Activate scroll animations

  return (
    <div className="lg:w-10/12 h-auto lg:my-30 mx-10 lg:mx-0 ">
      <div className="flex justify-center">
        <div className="merchant-card text-white font-[Rubik]">
          <div className="md:flex justify-center items-center px-5 slide-top">
            <div className="pl-10 md:pl-0 pt-20 md:py-0  hidden md:flex">
              <Image src={img} alt="merchant-logo" width={90} height={90} />
            </div>

            <h2 className="lg:text-3xl text-[24px] font-semibold md:pl-7 md:py-0 py-5">{title}</h2>
          </div>

          <div className="slide-bottom">
            <p className="lg:text-[27px] text-[16px] font-light md:py-16 pt-0 pb-7 leading-normal">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Merchantcard;
