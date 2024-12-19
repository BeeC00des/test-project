
import Image from "next/image";
import Button from "./Button";
import Merchantcard from "./Merchantcard";


const BgHeader = () => {
    return (
        <div className="w-full ">

            <div>
                <div className="bg-headerText">

                    <div className="flex justify-center items-center">
                        <Image src="/logo.png" alt="Monnify-logo" width={50} height={5} className="my-12" />
                    </div>



                    <p className="font-[Rubik] lg:text-[40px]  sm:text-[26px] text-[#F5B14D] font-normal leading-[20px] tracking-[0.3em] uppercase py-7">
                        monnify merchant
                    </p>

                    <span className="lg:text-[130px] sm:text-[36px] text-white font-bold leading-[167.49px] text-center pb-0 uppercase">
                        End of year
                    </span>
                    <h3 className="font-[Rubik] text-[#F5B14D] lg:text-[250px] sm:text-[45px] t italic font-extrabold leading-[60px] p-0">
                        2024
                    </h3>
                    <p className="lg:text-[85px] sm:text-[30px] text-white font-bold leading-[150px] text-center">
                        Review
                    </p>

                    <Button className="mt-24"
                        label="Scroll"
                        onClick={() => alert("I'm from the component folder")} />
                </div>
                <div className="bg-headerImage"></div>
                <div className="bg-header"></div>

                <div className="lg:w-3/5 md:w-full h-auto mx-auto flex py-10 justify-center items-center sm:px-5 text-center">
                    <Merchantcard
                        title="Sigma Limited"
                        text="As the year comes to a close, we at Monnify want to express our heartfelt gratitude to all our amazing merchants. You’ve been remarkable, making great strides in your businesses, and we’re proud to have been a part of your journey. Now, it’s time to show you just how much you’ve achieved using Monnify this year—it’s an exciting sight to behold! So, sit back, relax, and enjoy a glimpse of all the magic we’ve created together."
                        img=""
                    />
                </div>
            </div>
        </div>


    );
};

export default BgHeader;

// {/* <div className=" "></div> <div className="flex justify-center items-center py-10 border border-red-500"></div> </div>
