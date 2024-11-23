"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white h-[100%] py-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-center  md:mb-0">
          <h3 className="text-lg font-semibold">PICT IEEE Student Branch</h3>
        </div>

        <div className="flex space-x-8 text-center">
          <div>
            <h4 className="text-sm font-semibold ">Web Team</h4>
            <Link href="/webteam">
              <p className="text-blue-400 hover:underline">View Team</p>
            </Link>
          </div>
          <div>
            <h4 className="text-sm font-semibold ">Question Setters</h4>
            <Link href="/setters">
              <p className="text-blue-400 hover:underline">View Team</p>
            </Link>
          </div>
        </div>

        <div className="text-center mt-4 md:mt-0">
          <img
            src="/images/pisb-logo.png" 
            alt="PISB Logo"
            className="h-auto w-auto mx-auto"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
