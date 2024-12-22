"use client";
import Button from "./Button";

type Props = {
  title: string;
  text: string
  img: ""// still in progress

};

function Merchantcard({ title, text, img }: Props) {

  console.log("I am a client component from component family");

  return (
    <div className="h-auto lg:mt-32 md:mt-32 mt-10 mx-10 lg:mx-0">
      <div className="flex justify-center lg:my-16">
        <div className="text-white" >
          <h2 className="lg:text-3xl text-xl font-semibold pb-12">{title}</h2>
          <p className="lg:text-2xl text-base font-light py-12 ">{text}</p>
        </div>
      </div>

      <div className="lg:mt-24 md:mt-16 mt-10">
        <Button
          label="Get started"
          onClick={() => alert("Log into your dashboard")}
        />
      </div>

    </div>
  );
}

export default Merchantcard;
