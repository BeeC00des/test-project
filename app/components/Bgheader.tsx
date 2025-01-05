"use client";

import { useState, useEffect } from "react";

import Merchantcard from "./Merchantcard";
import Navbar from "./Navbar";
import { useMediaQuery } from 'react-responsive'



const BgHeader = (merchantData: any) => {

  //seperate caller for responsiveness follwing client side role
  const [isMobile, setIsMobile] = useState(false);
 

  // Update the isMobile state on mount or screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set breakpoint for mobile screens
     
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener
    };
  }, []);

  // console.log(merchantData)
  return (
    <div className="w-full ">
      <div className="">
        <Navbar />
        <div className="flex justify-center items-center bg-header1">
          <div className="w-11/12">
            <div className="md:flex md:justify-start  justfy-center items-center w-full ">
              <div className="font-[Rubik] text-left md:w-9/12  w-full lg:pl-10  lg:pr-4 slide-left " 
              style={{
                position: 'relative',
                top: isMobile ? "55px" : "0px",
              }}>
                <p className="lg:text-[155px] md:text-[100px] text-[55px] text-[#063A4F] font-bold  header-text">
                  End of year review
                </p>

                <p className=" md:text-[40px] font-[inter] text-[24px] text-[#017A81] ">
                  A quick look at how you performed in <span>2024</span>
                </p>
              </div>

              <div className="md:flex justify-end md:items-right md:w-3/12  w-full slide-right"
              >

                <img className="header-img lg:ml-20 ml-0"
                  style={{
                    width: isMobile ? '230px' : '700px',
                    height: isMobile ? 'inherit' : '420px',
                    position: "relative",
                    right: isMobile ? ' -200px' : '0px',
                    top: isMobile ? '27px' : '0px'

                  }}//src="../images/calendar.svg"
                  alt="calendar" src={isMobile ? "../images/calendar.svg" : "../images/calend.svg"}  />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-full md:w-full h-[500px] mx-auto flex lg:py-10 md:py-50 justify-center items-center sm:px-5 text-center bg-header2">
          <Merchantcard
            title={merchantData?.merchantData?.data?.business_name ?? ""}
            text="We at Monnify want to express our heartfelt gratitude to all our amazing merchants. You’ve been remarkable, making great strides in your businesses, and we’re proud to have been a part of your journey. Now, it’s time to show you just how much you’ve achieved using Monnify in 2024—it’s an exciting sight to behold! So, sit back, relax, and enjoy a glimpse of all the magic we’ve created together."
            img="../images/merchantLogo.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default BgHeader;
