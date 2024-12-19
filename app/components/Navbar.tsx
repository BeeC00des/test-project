import Link from "next/link";
import Image from "next/image";

const Navbar =() =>{
    return (
        <header className="px-10 h-[106px] bg-[#FFFFFF1A] lg:w-11/12 sm:w-full rounded-full lg:mx-auto sm:mx-5">
            <nav className="flex justify-between items-center h-full">
                <div className="flex justify-center items-center">
                <Link href='/https://monnify.com'>
                    <Image src="/images/logo.png" alt="Monnify-logo" width={60} height={60}/>
                   
                </Link>
                <p className="px-7 text-white text-2xl"> sigmafied</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="border h-2 w-16 rounded mx-2 bg-white isActive"></div>
                    <div className="h-2 w-16 bg-[#FFFFFF4D] rounded mx-2"></div>
                    <div className=" h-2 w-16 bg-[#FFFFFF4D] rounded mx-2"></div>
                    <div className=" h-2 w-16 bg-[#FFFFFF4D] rounded mx-2"></div>
                    <div className=" h-2 w-16 bg-[#FFFFFF4D] rounded mx-2"></div>
                </div>
              
            </nav>
        </header>
    )
}

export default Navbar;
