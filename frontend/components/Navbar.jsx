"use client";
import "./NavLink.css";
import Link from "next/link";

const Navbar = () => {

  return (
    <nav className="bg-gray-800 text-white h-16 w-full flex flex-col justify-center py-4 relative z-50">
      <div className="w-full flex items-center justify-between px-8 p-2">
        {/* Logo */}
        <Link href="/" className="flex gap-1 items-end">
          <img src="/nth-logo.png" className="md:h-14 h-10 p-1" />
          <p className="md:text-4xl text-2xl font-bold p-1">NTH</p>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;