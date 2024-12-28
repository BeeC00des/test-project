
import Image from "next/image";
import Merchantcard from "./Merchantcard";
import Navbar from "./Navbar";




const BgHeader = () => {
    const year = new Date().getFullYear();
    // console.log(year)
    return (
        <div className="w-full ">
            <div className="">
                <Navbar />
                <div className="flex justify-center items-center bg-header1">
                    <div className="w-11/12 cardBg">
                        <div className="flex justify-center items-center w-full ">
                            <div className="font-[Rubik] text-left md:w-9/12  w-7/12 lg:pl-24  slide-left">
                                <p className="lg:text-[155px] md:text-[100px] text-[40px] text-[#063A4F] font-bold leading-none">
                                    End of year
                                </p>
                                <span className=" lg:text-[155px] md:text-[100px] text-[40px] text-[#063A4F] font-bold "> review</span>
                                <p className=" md:text-[28px] font-[inter] text-[20px] text-[#017A81] ">
                                    A quick look at how you performed in <span>2024</span>
                                </p>
                            </div>

                            <div className="md:flex justify-end items-center md:w-3/12  w-5/12 slide-right">
                                <Image src="../images/calend.svg" width={400} height={400} alt="Year" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-full md:w-full h-[500px] mx-auto flex lg:py-10 md:py-50 justify-center items-center sm:px-5 text-center bg-header2">
                    <Merchantcard
                        title="Sigma Limited"
                        text="As the year comes to a close, we at Monnify want to express our heartfelt gratitude to all our amazing merchants. You’ve been remarkable, making great strides in your businesses, and we’re proud to have been a part of your journey. Now, it’s time to show you just how much you’ve achieved using Monnify this year—it’s an exciting sight to behold! So, sit back, relax, and enjoy a glimpse of all the magic we’ve created together."
                        img="../images/merchantLogo.svg"
                    />
                </div>
            </div>
        </div>
    );
};

export default BgHeader;
