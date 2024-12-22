

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  // State to track the active nav item
  const [activeNav, setActiveNav] = useState<string>("main-section");

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
    <header className="fixed sm:top-2 lg:top-10  lg:left-16 md:left-1 px-10 lg:h-[106px] sm:h-[60px] md:h-[70px] lg:bg-[#FFFFFF1A] lg:w-11/12 md:w-full sm:w-full rounded-full z-50">
      <nav className="flex justify-between items-center h-full">
        <div className="flex justify-center items-center">
          <Link href='/https://monnify.com'>
            <Image src="/images/logo.png" alt="Monnify-logo" width={60} height={60} />
          </Link>
          <p className="px-7 text-white text-2xl">sigmafied</p>
        </div>
        <div className="lg:flex justify-between items-center">
          <div className={getNavItemClass("user-section")} onClick={() => handleScroll("user-section")}></div>
          <div className={getNavItemClass("card-section")} onClick={() => handleScroll("card-section")}></div>
          <div className={getNavItemClass("settle-section")} onClick={() => handleScroll("settle-section")}></div>
          <div className={getNavItemClass("message-section")} onClick={() => handleScroll("message-section")}></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;




// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// const Navbar = () => {
//   // State to track the active nav item and toggle for mobile menu
//   const [activeNav, setActiveNav] = useState<string>("main-section");
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State for mobile menu toggle

//   // Handle scroll and set active navigation item
//   const handleScroll = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setActiveNav(sectionId); // Set active nav item when clicked
//       setIsMenuOpen(false); // Close menu after click on mobile
//     }
//   };

//   // Helper function to determine active class
//   const getNavItemClass = (sectionId: string) => {
//     return activeNav === sectionId
//       ? "border h-2 lg:w-16 rounded mx-2 bg-white"  
//       : "h-2 lg:w-16 bg-[#FFFFFF4D] rounded mx-2"; 
//   };

//   return (
//     <header className="fixed lg:top-10 lg:left-16 px-10 h-[106px] bg-[#FFFFFF1A] lg:w-11/12 sm:w-full rounded-full z-50">
//       <nav className="flex justify-between items-center h-full">
//         {/* Left side: Logo and Text */}
//         <div className="flex justify-center items-center">
//           <Link href='/https://monnify.com'>
//             <Image src="/images/logo.png" alt="Monnify-logo" width={60} height={60} />
//           </Link>
//           <p className="px-7 text-white text-2xl">sigmafied</p>
//         </div>

//         {/* Hamburger Menu for Mobile */}
//         <div className="lg:hidden flex items-center">
//           <button
//             className="text-white"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {/* Hamburger Icon */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Right side: Navigation items */}
//         <div className={`lg:flex lg:space-x-4 space-y-4 lg:space-y-0 absolute lg:relative top-[106px] left-0 w-full lg:w-auto bg-[#FFFFFF1A] lg:bg-transparent px-4 py-4 lg:p-0 ${isMenuOpen ? "block" : "hidden"}`}>
//           <div className={getNavItemClass("main-section")} onClick={() => handleScroll("main-section")}></div>
//           <div className={getNavItemClass("user-section")} onClick={() => handleScroll("user-section")}></div>
//           <div className={getNavItemClass("card-section")} onClick={() => handleScroll("card-section")}></div>
//           <div className={getNavItemClass("settle-section")} onClick={() => handleScroll("settle-section")}></div>
//           <div className={getNavItemClass("message-section")} onClick={() => handleScroll("message-section")}></div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
