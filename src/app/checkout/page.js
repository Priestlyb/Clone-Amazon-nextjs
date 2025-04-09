"use client"
import CheckoutProducts from '@/components/CheckoutProducts';
import Header from '@/components/Header'
import { selectItems, selectTotal } from '@/slices/basketSlice';
import Image from 'next/image'
import React from 'react'
import { useSelector } from "react-redux";
import { useSession } from 'next-auth/react';

function Checkout() {
  const { data: session } = useSession();
  const total = useSelector(selectTotal);
  const items = useSelector(selectItems);
  return (
    <div className='bg-gray-100'>
        <Header />
        <main className='lg:flex max-w-screen-2xl mx-25'>
            {/* Left */}
            <div className='flex-grow m-5 shadow-sm'>
            <Image
            alt='Checkout Image'
            src={"https://links.papareact.com/ikj"}
            width={1020}
            height={250}
            className='object-contain'
            />
            <div className=' flex flex-col p-5 space-y-10 bg-white'>
                <h1 className='text-3xl border-b pb-4'>
                  {items.length === 0 ? "Your Amazon Basket is empty" : "Shopping Basket"}
                </h1>

                {items.map((item, i) => (
                  <CheckoutProducts 
                  key={i}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  description={item.description}
                  image={item.image}
                  category={item.category}
                  hasPrime={item.hasPrime}
                  />
                ))}
            </div>
            </div>
            
            {/* Right */}
            <div className=' flex flex-col bg-white p-10 shadow-md'>
                {items.length > 0 && (
                  <>
                  <h2 className='whitespace-nowrap'>Subtotal ({items.length} Items) : <span className="font-bold">{total}</span></h2>
                  <button className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`} disabled={!session}>
                    {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                  </button>
                  </>
                )}
            </div>
        </main>
    </div>
  )
}

export default Checkout