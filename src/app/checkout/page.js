"use client"

import CheckoutProducts from '@/components/CheckoutProducts';
import Header from '@/components/Header';
import { selectItems, selectTotal } from '@/slices/basketSlice';
import Image from 'next/image';
import React from 'react';
import { useSelector } from "react-redux";
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY); // Updated env var

function Checkout() {
  const { data: session } = useSession();
  const total = useSelector(selectTotal);
  const items = useSelector(selectItems);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          email: session?.user?.email,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const checkoutSession = await response.json();
      console.log("Checkout session response:", checkoutSession);

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (result.error) {
        alert(result.error.message);
      }

    } catch (error) {
      console.error("Checkout error:", error.message);
      alert("Something went wrong when creating the checkout session.");
    }
  };

  return (
    <div className='bg-gray-100'>
      <Header />
      <main className='max-w-screen p-5 lg:flex'>
        {/* Left */}
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            alt='Checkout Image'
            src={"https://links.papareact.com/ikj"}
            width={500}
            height={100}
            className='w-full object-contain'
          />
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0 ? "Your cart is empty" : "Your Dream Cart"}
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
        <div className='flex flex-col bg-white p-10 shadow-md'>
          {items.length > 0 && (
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">${total.toFixed(2)}</span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                className={`cursor-pointer button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
                disabled={!session}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
