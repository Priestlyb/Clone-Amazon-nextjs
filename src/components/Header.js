/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectItems } from "@/slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  console.log("Session data:", session);
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <div>
      {/* Top nav */}
      <div className="flex items-center bg-[#131921] px-3 p-1 flex-grow py-2">
        <div className="mr-3 flex item-center flex-grow sm:flex-grow-0">
          <Image
          
            onClick={() => router.push("/")}
            alt="Logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            width={100}
            height={40}
            className="cursor-pointer object-contain"
          />
          j{" "}
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
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div
            onClick={!session ? signIn : () => router.push("/profile")}
            className="cursor-pointer link"
          >
            <p className="hover:underline">
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & lists</p>
          </div>

          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            className="relative link flex items-center "
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 right-0 md: right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10 " />
            <p className="hidden md:inline font-extrabold md:text-sm">Cart</p>
          </div>
        </div>
      </div>

      {/* Botton nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-[#232F3E] text-white text-sm w-full">
        <p className="flex items-center link">
          <Bars3Icon className="h-6 mr-1" /> All
        </p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Registry</p>
        <p className="link hidden lg:inline-flex">Customer Service</p>
        <p className="link hidden lg:inline-flex">Gift Cards</p>
        <p className="link hidden lg:inline-flex">Sell</p>
        <p className="link" onClick={signOut}>{session ? "Signout" : ""}</p>
      </div>
    </div>
  );
}

export default Header;
