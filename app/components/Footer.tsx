import Link from "next/link";
import Image from "next/image";

const Footer =() =>{
    return (
        <footer className="lg:flex justify-between items-center text-[#063A4F] w-full md:p-10 p-7 text-center bg-white">
            
                <div className=" flex justify-center items-center lg:pb-0  pb-5">
                    <p className="text-base md:text-[20px]">©2024 Monnify. All Rights Reserved.</p>
                </div>

                <div className="flex justify-center items-center  lg:pb-0  pb-5">
                <Link href='/https://monnify.com' className="flex">
                    <Image src="/images/monnify-logo.svg" alt="Monnify-logo" width={200} height={200}/>
                
                </Link>
                </div>

                {/* <div className="flex justify-center items-center  lg:pb-0  pb-5">
                    <button className=" border border-[#063A4F] text-case rounded-3xl px-4 py-2">Download Report </button>
                </div> */}


        </footer>
    )
}

export default Footer;
