import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const Navbar = () => {

  return (
    <header className="px-10 py-7 bg-[#FFFFFF] w-full ">
      <nav className="flex justify-center items-center h-full">
        <div className="flex justify-center items-center">
          <Link href="https://monnify.com">
            <Image src="/images/monnify-logo.svg" alt="Monnify-logo" width={200} height={100} />
          </Link>
        </div>
      
      </nav>
    </header>
  );
};

export default Navbar;
