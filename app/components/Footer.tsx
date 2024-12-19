import Link from "next/link";
import Image from "next/image";

const Footer =() =>{
    return (
        <footer className="flex justify-between items-center sm:py-3 text-white lg:w-11/12 sm:w-full sm:mx-5 lg:py-10  lg:mx-auto">
            
                <div className="flex justify-between items-center">
                    <p className="text-base">©2024 Monnify. All Rights Reserved.</p>
                </div>

                <div className="flex justify-center items-center">
                <Link href='/https://monnify.com' className="flex">
                    <Image src="/images/logo.png" alt="Monnify-logo" width={50} height={50}/>
                   <p className="text-lg font-bold px-2">monnify</p>
                </Link>
                
                </div>

                <div className="flex justify-between border border-white text-base rounded-3xl px-3 py-1">
                    download
                </div>


        </footer>
    )
}

export default Footer;
