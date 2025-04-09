/* eslint-disable @next/next/no-img-element */
import React from "react";
import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-75 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}

      
      <img
        loading="lazy"
        src="https://links.papareact.com/dyz"
        className="col-span-full"
        alt="Ad-image"
      />

      <div className="md:col-span-2">
      {products
        .slice(4,5)
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
      </div>

      {products
        .slice(5, products.length)
        .reverse()
        .map(({ id, title, price, description, category, image }) => (
          <Product
            key={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}

    </div>
  );
}

export default ProductFeed;
