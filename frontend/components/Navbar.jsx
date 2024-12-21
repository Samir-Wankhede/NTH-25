"use client";

import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { usePathname} from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
usePathname


const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = (
    <>
    <Link href="/">
      <p className={`hover:text-blue-400 ${pathname === "/" ? "border-b-2" : ""}`}>Home</p>
    </Link>
    <Link href="/leaderboard">
      <p className={`hover:text-blue-400 ${pathname === "/leaderboard" ? "border-b-2" : ""}`}>Leader Board</p>
    </Link>
    <Link href="/question/put_your_answer_here">
      <p className={`hover:text-blue-400 ${pathname === "/question/put_your_answer_here" ? "border-b-2" : ""}`}>Hunt</p>
    </Link>
    <Link href="/about">
      <p className={`hover:text-blue-400 ${pathname === "/about" ? "border-b-2" : ""}`}>About Us</p>
    </Link>
    {!user ? (
      <Link href="/register">
        <p className={`hover:text-blue-400 ${pathname === "/register" ? "border-b-2" : ""}`}>Register</p>
      </Link>
    ) : (
      <button onClick={logout} className="hover:text-blue-400">
        Logout
      </button>
    )}
  </>
  );

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <p className="text-2xl font-bold">NTH</p>
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <GiHamburgerMenu />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-14 right-0 w-48 bg-gray-800 p-6 rounded-lg z-20 text-lg">
            {navItems}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;