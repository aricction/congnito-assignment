"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { UserIcon, HeartIcon, ShoppingCartIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import AuthModal from "../account-login-modal/page";

const SearchBar: FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <>
      <nav className="w-full py-3 px-5 flex items-center justify-center mx-auto border-b border-[#E9E9E9]">
        <img src="/asset/navbar.png" alt="Cognito logo" className="h-auto w-auto px-6" />

        <div className="relative w-[600px]">
          <input
            type="text"
            placeholder="Search For items..."
            className="w-full h-[45px] pl-4 pr-24 outline outline-2 outline-[#64B496] focus:outline-[#64B496] rounded-[5px]"
          />

          <div className="absolute top-0 right-0 h-full flex items-center  ">
            <button className="flex items-center px-3 h-full border-x border-[#64B496] text-black rounded-r-[5px]">
              <span className="text-sm font-medium">All Categories</span>
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </button>

            <button className="flex items-center justify-center px-3 h-full bg-[#F53E32] text-white rounded-r-[5px]">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <ul className="flex items-center space-x-6 px-12">
          <li>
            <div className="flex items-center space-x-1 cursor-pointer" onClick={toggleAuthModal}>
              <UserIcon className="w-5 h-5 text-gray-700" />
              <span className="text-[14px] font-medium">Account</span>
            </div>
          </li>

          <li>
            <div className="flex items-center space-x-1 cursor-pointer">
              <HeartIcon className="w-5 h-5 text-gray-700" />
              <span className="text-[14px] font-medium">Wishlist</span>
            </div>
          </li>

          <li>
            <Link href="/checkout">
              <div className="flex items-center space-x-1 cursor-pointer">
                <ShoppingCartIcon className="w-5 h-5 text-gray-700" />
                <span className="text-[14px] font-medium">Cart</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      {isAuthModalOpen && <AuthModal onClose={closeAuthModal} />}
    </>
  );
};

export default SearchBar;
