
import Image from "next/image";
import Button from "./Button";
import Merchantcard from "./Merchantcard";


const BgHeader = () => {
    return (
        <div className="w-full ">

            <div>
                <div className="text-center h-auto">

                    <div className="flex justify-center items-center">
                        <Image src="/logo.png" alt="Monnify-logo" width={50} height={5} className="my-12" />
                    </div>

                    <div>

                        <p className="font-[Rubik] lg:text-[40px] md:text-[40px] sm:text-[40px] text-[#F5B14D] font-normal lg:leading-[20px] md:leading-[10px] tracking-[0.3em] uppercase lg:py-7">
                            monnify merchant
                        </p>

                        <span className="lg:text-[80px] md:text-[65px] sm:text-[100px] font-[asgard] text-white font-bold lg:leading-[167.49px] md:leading-[100px] text-center pb-0 uppercase">
                            End of year
                        </span>
                        <h3 className="font-[Rubik] text-[#F5B14D] lg:text-[250px] md:text-[100px] sm:text-[160px] italic font-extrabold lg:leading-[60px] md:leading-[60px] p-0">
                            2024
                        </h3>


                        {/* fix image color issue
                        <div className="relative">
                        <Image src="/images/2024.png" alt="date " width={300} height={200}/>
                        </div> */}
                      

                        <p className="lg:text-[75px] font-[asgard] md:text-[50px] sm:text-[150px] text-white font-bold lg:leading-[150px] text-center">
                            Review
                        </p>

                    </div>


                    <Button className="mt-24"
                        label="Scroll"
                        onClick={() => alert("I'm from the component folder")} />
                </div>

                <div className="lg:w-3/5 md:w-full h-auto mx-auto flex lg:py-10 md:py-50 justify-center items-center sm:px-5 text-center">
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
