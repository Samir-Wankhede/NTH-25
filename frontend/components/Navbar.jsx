"use client";
import "./NavLink.css";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import { usePathname} from "next/navigation";
import { useState } from "react";
import { GiAxeSword, GiHamburgerMenu } from "react-icons/gi";
usePathname


const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = (
    <>
    <Link href="/">
      <p className={`max-w-32 mx-auto nav-link nav-link-ltr ${pathname === "/" ? "border-b-2" : ""}`}>Home</p>
    </Link>
    <Link href="/leaderboard">
      <p className={`max-w-32 mx-auto nav-link nav-link-ltr ${pathname === "/leaderboard" ? "border-b-2" : ""}`}>Leader Board</p>
    </Link>
    <Link href="/question/put_your_answer_here">
      <p className={`max-w-32 mx-auto nav-link nav-link-ltr ${pathname === "/question/put_your_answer_here" ? "border-b-2" : ""}`}>Hunt</p>
    </Link>
    <Link href="/about">
      <p className={`max-w-32 mx-auto nav-link nav-link-ltr ${pathname === "/about" ? "border-b-2" : ""}`}>About Us</p>
    </Link>
    <Link href="/webteam">
      <p className={`max-w-32 mx-auto nav-link nav-link-ltr ${pathname === "/webteam" ? "border-b-2" : ""}`}>Contact Us</p>
    </Link>
    {!user ? (
      <Link href="/register">
        <p className={`max-w-32 mx-auto nav-link nav-link-ltr ${pathname === "/register" ? "border-b-2" : ""}`}>Register</p>
      </Link>
    ) : (
      <button onClick={logout} className="max-w-32 mx-auto nav-link nav-link-ltr">
        Logout
      </button>
    )}
  </>
  );

  return (
    <nav className="bg-gray-800 text-white h-16 w-full flex flex-col justify-center py-4 relative z-50">
      <div className="w-full flex items-center justify-between px-8 p-2">
        {/* Logo */}
        <Link href="/" className="flex gap-1 items-end">
          <img src="/nth-logo.png" className="md:h-14 h-10 p-1" />
          <p className="md:text-4xl text-2xl font-bold p-1">NTH</p>
        </Link>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <GiAxeSword/>:<GiHamburgerMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden text-nowrap md:flex lg:text-2xl text-lg items-center lg:gap-12 gap-6">
          {navItems}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div onClick={toggleMenu} className="md:hidden absolute text-xl top-14 right-0 w-full text-center bg-gray-800 p-6 rounded-lg z-50">
            {navItems}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;