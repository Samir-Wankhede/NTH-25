"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/home">
          <p className="text-2xl font-bold">NTH</p>
        </Link>

        <div className="flex space-x-6">
          <Link href="/home">
            <p className="hover:text-blue-400">Home</p>
          </Link>
          <Link href="/question/put_your_answer_here">
            <p className="hover:text-blue-400">Hunt</p>
          </Link>
          <Link href="/about">
            <p className="hover:text-blue-400">About Us</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
