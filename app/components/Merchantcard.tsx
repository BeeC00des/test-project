"use client";
import Button from "./Button";
import Image from "next/image";


type Props = {
  title: string;
  text: string
  img: string

};

function Merchantcard({ title, text, img }: Props) {

  return (
    <div className=" lg:w-9/12 h-auto lg:mt-32 md:mt-32 mt-10 mx-10 lg:mx-0">
      <div className="flex justify-center lg:my-16">
        <div className="text-white" >

          <div className="flex justify-center items-center px-5">
            <Image src={img} alt="merchant-logo" width={90} height={90} /> 
            <h2 className="lg:text-3xl text-xl font-semibold md:pl-7">{title}</h2> </div>
             <p className="lg:text-[28px] text-base font-light py-16 leading-normal  ">{text}</p>
        </div>
      </div>

      <div className="lg:mt-24 md:mt-16 mt-10">
        <Button className="px-5 py-1"
          label="Get started"
          img="../images/play.svg"
        />


      </div>



    </div>
  );
}

export default Merchantcard;
