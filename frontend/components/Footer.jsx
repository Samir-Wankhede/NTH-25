"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHeart } from "react-icons/fa";


const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="bg-gray-800 text-white h-16 w-full flex flex-col justify-center py-2 relative z-50">
      <div className="container mx-auto flex flex-row items-end justify-between px-4 gap-1">
        <div className="text-center  md:mb-0">
          <h3 className="text-lg font-semibold md:flex justify-center gap-2 items-center hidden">Made with <FaHeart color="#ff5655" className="h-4 w-4" /> by previous players</h3>
        </div>

        <div className="text-center md:mt-0">
        <div className="flex justify-center space-x-4">
          <a
            href={"https://www.instagram.com/nth__live/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/instagram.png" className="h-6 w-6" />
          </a>
          <a
            href={"https://www.linkedin.com/company/pisbieee/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/linkedin.png" className="h-6 w-6" />
          </a>
          <a
            href={"https://pictieee.in"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/pisb-logo.png" 
              alt="PISB Logo"
              className="h-6 object-contain"
            />
          </a>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
