import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const Navbar = () => {
  // State to track the active nav item
  const [activeNav, setActiveNav] = useState<string>("main-section");

  useEffect(() => {
    // Ensure the first item is active and scroll into view if needed
    const firstSection = document.getElementById("main-section");
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Handle scroll and set active navigation item
  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveNav(sectionId); // Set active nav item when clicked
    }
  };

  // Helper function to determine active class
  const getNavItemClass = (sectionId: string) => {
    return activeNav === sectionId
      ? "border h-2 w-16 rounded mx-2 bg-white"
      : "h-2 w-16 bg-[#FFFFFF4D] rounded mx-2";
  };

  return (
    <header className="fixed sm:top-2 lg:top-10 lg:left-16 md:left-1 px-10 lg:h-[106px] sm:h-[60px] md:h-[70px] lg:bg-[#FFFFFF1A] lg:w-11/12 md:w-full sm:w-full rounded-full z-50">
      <nav className="flex justify-between items-center h-full">
        <div className="flex justify-center items-center">
          <Link href="https://monnify.com">
            <Image src="/images/logo.png" alt="Monnify-logo" width={60} height={60} />
          </Link>

          <div className="h-12 border-l border-grey-100 mx-5 "></div>

          <Image src="/images/merchantLogo.svg" alt="merchant-logo" width={50} height={50} />
        </div>
        <div className="lg:flex justify-between items-center">
          <div
            className={getNavItemClass("main-section")}
            onClick={() => handleScroll("main-section")}
          ></div>
          <div
            className={getNavItemClass("user-section")}
            onClick={() => handleScroll("user-section")}
          ></div>
          <div
            className={getNavItemClass("card-section")}
            onClick={() => handleScroll("card-section")}
          ></div>
          <div
            className={getNavItemClass("settle-section")}
            onClick={() => handleScroll("settle-section")}
          ></div>
          <div
            className={getNavItemClass("message-section")}
            onClick={() => handleScroll("message-section")}
          ></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
