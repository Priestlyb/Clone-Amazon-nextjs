// app/ClientHome.js
"use client";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";

export default function ClientHome({ products }) {
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </div>
    </div>
  );
}
