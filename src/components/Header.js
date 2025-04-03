/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

function Header() {
  return (
    <div>
      {/* Top nav */}
      <div className="flex item-center bg-[#131921] px-3 p-1 flex-grow py-2">
        <div className="mr-3 flex item-center flex-grow sm:flex-grow-0">
          <Image
            alt="Logo"
            src="https://links.papareact.com/f90"
            width={100}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* Search bar **/}
        <div className="hidden sm:flex items-center h-10  rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="bg-white h-full w-6 p-2 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <MagnifyingGlassIcon className="h-12 p-4 " />
        </div>

        {/* Right nav */}
        <div className="text-white flex item-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link">
            <p>Hello Priestly Bassey</p>
            <p className="font-extrabold md:text-sm">Account & lists</p>
          </div>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="relative link flex items-center ">
            <span className="absolute top-0 right-0 md: right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              0
            </span>
            <ShoppingCartIcon className="h-10 " />
            <p className="hidden md:inline font-extrabold md:text-sm  ">Cart</p>
          </div>
        </div>
      </div>

      {/* Botton nav */}
      <div className="flex item-center space-x-3 p-2 pl-6 bg-[#232F3E] text-white text-sm w-full">
        <p className="flex item-center link">
          <Bars3Icon className="h-6 mr-1" /> All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Tooklkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </div>
  );
}

export default Header;
