"use client"

import Image from "next/image";
import Button from "./components/Button";
import Merchantcard from "./components/Merchantcard";
import BgHeader from './components/Bgheader';



export default function Home() {
  console.log('what am i doing here ? --server/client');


  return (
    <>
      <div className=" h-auto w-full">
      <BgHeader/>
      </div>
    </>
  );
}
