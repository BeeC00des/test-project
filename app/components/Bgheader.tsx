
import Image from "next/image";
import Button from "./Button";
import Merchantcard from "./Merchantcard";




const BgHeader = () => {
    
    return (
        <div className="w-full ">

            <div>
                <div className="text-center h-auto">

                    <div className="flex justify-center items-center ">
                        <Image src="/logo.png" alt="Monnify-logo" width={60} height={65} className="mt-24 mb-10" />
                    </div>

                    <div className="flex justify-center items-center ">
                        <div>
                        <p className="text-[20px] font-[Rubik] lg:text-[40px] md:text-[40px] text-[#F5B14D] font-normal lg:leading-[15px] md:leading-[10px] tracking-[0.3em] uppercase lg:pt-8 pb-12">
                            monnify merchant
                        </p>

                        <span className="text-[40px] lg:text-[142px] md:text-[65px]  font-[asgard] text-white lg:leading-[140px] md:leading-[100px] sm:leading-[20px] text-center pb-0 uppercase">
                            End of year
                        </span>
                        {/* <h3 className="font-[Rubik] text-[#F5B14D] lg:text-[250px] md:text-[100px] sm:text-[160px] italic font-extrabold lg:leading-[60px] md:leading-[60px] p-0">
                            2024
                        </h3> */}
                        <div className="flex justify-center items-center mt-[-50px] ml-[70px] lg:mt-[-320px] lg:ml-[260px] md:mt-[-200px] ms:ml-[150px] ">
                             <Image src="../images/2024.svg" width={1100} height={1100} alt="Year" /> 
                        </div>
                                            

                        <p className="text-[35px] lg:text-[100px] font-[asgard] md:text-[50px]  text-white lg:leading-[70px] text-center uppercase">
                            Review
                        </p>
                        </div>

                      

                    </div>


                    <Button className=" px-10 py-2 mt-16"
                        img="../images/arrow.svg"
                        label="Scroll"
                        onClick={() => alert("I'm from the component folder")} />
                </div>

                <div className="lg:w-full md:w-full h-auto mx-auto flex lg:py-10 md:py-50 justify-center items-center sm:px-5 text-center">
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

// {/* <div className=" "></div> <div className="flex justify-center items-center py-10 border border-red-500"></div> </div>
