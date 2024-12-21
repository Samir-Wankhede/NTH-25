"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaPhone } from 'react-icons/fa';  // Importing necessary icons


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white h-[100%] py-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-center  md:mb-0">
          <h3 className="text-lg font-semibold">PICT IEEE Student Branch</h3>
        </div>

        <div className="flex space-x-8 text-center">
          <div>
            
            <Link href="/webteam">
              <p className="text-blue-400 hover:underline font-semibold text-xl">Web Team</p>
            </Link>
          </div>
          <div>
            <Link href="/setters">
              <p className="text-blue-400 hover:underline font-semibold text-xl">Question Setters</p>
            </Link>
          </div>
        </div>
        <div className="text-center mt-4 md:mt-0">
        <div className="flex justify-center space-x-4">
              <a
                href={"https://www.instagram.com/pictieee/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={"https://www.linkedin.com/company/pisbieee/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={24} />
              </a>
             
            
       
          <img
            src="/pisb-logo.png" 
            alt="PISB Logo"
            className="h-6 object-contain"
          />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
