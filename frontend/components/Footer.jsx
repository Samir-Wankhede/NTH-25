"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHeart } from "react-icons/fa";


const Footer = () => {
  const pathname = usePathname();
  return (
    <footer className="bg-gray-900 text-white h-full flex flex-col justify-center">
      <div className="container mx-auto flex flex-row items-end justify-between px-4 gap-1">
        <div className="text-center  md:mb-0">
          <h3 className="text-lg font-semibold md:flex justify-center gap-2 items-center hidden">Made with <FaHeart color="#ff5655" className="h-4 w-4" /> by previous players</h3>
        </div>

        <div className="flex md:space-x-8 md:gap-0 gap-2 text-center">
          <div>
            <Link href="/webteam">
              <p className={`nav-link nav-link-ltr font-semibold text-sm md:text-xl ${pathname === "/webteam" ? "border-b-2" : ""}`}>Web Team</p>
            </Link>
          </div>
          <div>
            <Link href="/setters">
              <p className={`nav-link nav-link-ltr font-semibold text-sm md:text-xl ${pathname === "/setters" ? "border-b-2" : ""}`}>Question Setters</p>
            </Link>
          </div>
        </div>
        <div className="text-center mt-4 md:mt-0">
        <div className="flex justify-center space-x-4">
          <a
            href={"https://www.instagram.com/pictieee/"}
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
