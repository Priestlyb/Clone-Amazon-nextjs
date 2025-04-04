import React from 'react'
import Image from 'next/image'

function ProductFeed({ products }) {
  return (
    <div>
        {
            products.map(({id, title, price, description, category, image}) => (
                <div key={id} className="product-card">
                    <Image src={image} alt={title} />
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>${price}</p>
                    <p>{category}</p>
                </div>
            ))
        }
    </div>
  )
}

export default ProductFeed