"use client";

import React, { FC } from "react";
import Link from "next/link";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface NavbarProps {
  showAuthButtons?: boolean; // allows reuse in pages where signup/login is not needed
}

const Navbar: FC<NavbarProps> = ({ showAuthButtons = true }) => {
  return (
    <nav className="w-full py-3 px-5  flex items-center justify-between mx-auto shadow-md">
    
     <div  className="justify-center">
     <Bars3Icon className="w-6 h-6 text-gray-700 border " />
     </div>

      <ul className="flex items-center space-x-10 text-white">
        <li>
          <Link href="/">
            <button className="text-black text-[14px] transition-colors duration-300 ease-in-out">
              <span className="font-medium" >Home</span>
            </button>
          </Link>
        </li>

        <li className="flex items-center">
          <Link
            href=""
            className="flex items-center text-black text-[14px] transition-colors duration-300 ease-in-out"
          >
            <span className="font-medium">Category</span>
            <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-600" />
          </Link>
        </li>

        <li>
          <button className="flex items-center text-black text-[14px] transition-colors duration-300 ease-in-out">
            <span className="font-medium">Products</span>
            <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-600" />
          </button>
        </li>

        <li>
          <button className="flex items-center text-black text-[14px] transition-colors duration-300 ease-in-out">
            <span className="font-medium">Pages</span>
            <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-600" />
          </button>
        </li>

        <li>
          <button className="flex items-center text-black text-[14px] transition-colors duration-300 ease-in-out">
            <span className="font-medium">Blogs</span>
            <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-600" />
          </button>
        </li>
        <li>
          <button className="flex items-center text-black text-[14px] transition-colors duration-300 ease-in-out">
            <span className="font-medium">Elements</span>
            <ChevronDownIcon className="w-5 h-5 ml-1 text-gray-600" />
          </button>
        </li>
      </ul>

      <div className="flex py-5">
        <PhoneIcon className="w-5 h-5 text-gray-500 " />
        <p className="text-[15px] font-normal">+123 ( 456 ) ( 7890 )</p>
      </div>
    </nav>
  );
};

export default Navbar;
