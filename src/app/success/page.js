"use client";
import Header from "@/components/Header";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useRouter } from "next/navigation";

function SuccessPage() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto py-5">
        <div className="flex flex-col p-10 bg-white shadow-md rounded-md">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="h-10 text-green-500" />
            <h1 className="text-3xl font-semibold text-center">
              Thank you, your order has be comfirmed!
            </h1>
          </div>
          <p>
            Thank you for your order. We appreciate your business and are
            processing your order right away. You will receive a confirmation
            email shortly with the details of your order.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8 cursor-pointer"
          >
            Go to orders
          </button>
        </div>
      </main>
    </div>
  );
}

export default SuccessPage;
