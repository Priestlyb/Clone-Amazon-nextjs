import Image from "next/image";
import React from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import { addToBasket, removeFromBasket } from "@/slices/basketSlice";
import { useDispatch } from "react-redux";

function CheckoutProducts({ id, title, price, rating, description, category, image, hasPrime, }) {
    const dispatch = useDispatch();

const addItemToBasket = () => {
  const product = {id, title, price, rating, description, category, image, hasPrime }; 

  //push item to redux store basket slice
    dispatch(addToBasket(product));
};

const removeItemfromBasket = () => {
    const product = {id, title, price, rating, description, category, image, hasPrime }; 

    //Remove Item From Redux
      dispatch(removeFromBasket({id}));
}

  return <div className="grid grid-cols-5">
    <Image
    alt="Product Image"
    src={image}
    height={200}
    width={200}
    className="object-contain"
    />

    <div key={id} className="col-span-3 mx-5">
        <p className="text-xs text-gray-400">{category}</p>
        <h4 className="text-xl">{title}</h4>
        <div className="flex">
            {Array(rating)
            .fill()
            .map((_, i) => (
                <p key={i}><StarIcon key={i} className='h-5 text-yellow-500' /></p>
            ))}
        </div>
        <p className="text-sm my-2 line-clamp-3">{description}</p>
        <p className="text-lg font-bold">${price}</p>
        {hasPrime && (
            <div className="flex items-center my-5 text-xs text-gray-500">
                <Image
                loading="lazy"
                className="-mt-5 w-12"
                src="https://i.pinimg.com/736x/3b/7b/ee/3b7bee2a6094c531f392cc2b662a597b.jpg"
                alt="prime image"
                width={100}
                height={100}
                />
                <p className="text-xs">FREE Next-day delivery</p>
            </div>
        )}
    </div>

    
    <div className="col-span-1 space-y-2 my-2 justify-self-end">
            <button onClick={addItemToBasket} className="w-full button">Add to Basket</button>
            <button onClick={removeItemfromBasket} className="w-full button">Remove from Basket</button>
            </div>
  </div>;
}

export default CheckoutProducts;
