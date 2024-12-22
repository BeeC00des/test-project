import Link from "next/link";
import Image from "next/image";

const Footer =() =>{
    return (
        <footer className="lg:flex justify-between items-center text-white lg:w-11/12 sm:w-full md:py-12 py-16  md:pt-0  lg:mx-auto text-center">
            
                <div className=" my-3 md:my-0">
                    <p className="text-base">©2024 Monnify. All Rights Reserved.</p>
                </div>

                <div className="flex justify-center items-center my-3 md:my-0 ">
                <Link href='/https://monnify.com' className="flex">
                    <Image src="/images/logo.png" alt="Monnify-logo" width={50} height={50}/>
                   <p className="text-lg font-bold pl-3">monnify</p>
                </Link>
                </div>

                <div className="flex justify-center items-center my-3 md:my-0 ">
                    <button className=" border border-white text-base rounded-3xl px-3 py-1">download</button>
                </div>


        </footer>
    )
}

export default Footer;
