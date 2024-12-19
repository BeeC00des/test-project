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
    <div className="merchant-card">
      <div className="flex justify-center">
        <div className="text-white blur-cardText" >
          <h2 className="text-3xl font-semibold pb-12">{title}</h2>
          <p className="text-2xl font-light py-12 ">{text}</p>
        </div>
        <div className="blur-card"></div>
      </div>

      <div className="mt-24 border-0 ">
        <Button
          label="Get started"
          onClick={() => alert("Log into your dashboard")}
        />
      </div>

    </div>
  );
}

export default Merchantcard;
