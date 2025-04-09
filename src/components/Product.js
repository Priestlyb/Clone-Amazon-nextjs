"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { addToBasket } from '@/slices/basketSlice';

function Product({ id, title, price, description, category, image }) {
  const MIN_RATING = 1;
  const MAX_RATING = 5;

  const dispatch = useDispatch();

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    //Sending th eproduct as and action to the REDUX store... the basket slice
    dispatch(addToBasket(product));
  };

  return (
    <div className='relative flex item-center flex-col m-5 bg-white z-30 p-10 rounded-md'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

      <Image
        alt='Product-img'
        src={image}
        height={200}
        width={200}
        style={{ objectFit: 'contain' }}
      />

      <h4>{title}</h4>

      <div className='flex'>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}
      </div>

      <p className='text-xs my-2 line-clamp-2'>{description}</p>
      <p className="text-lg font-bold">₦ {price}</p>

      <div className="mb-5">

      </div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5 mb-3'>
          <Image className='w-12' alt='prime' src='https://i.pinimg.com/736x/3b/7b/ee/3b7bee2a6094c531f392cc2b662a597b.jpg' width={12} height={12} />
          <p className='text-xs text-gray-500'>Free Next Day Delivery</p>
        </div>
      )}

      <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
    </div>
  );
}

export default Product;
