// app/page.js
import ClientHome from "./ClientHome";

export default async function Home() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const products = await res.json();

    return <ClientHome products={products} />;
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return (
      <div className="bg-red-100 text-red-800 p-4">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }
}
