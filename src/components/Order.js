import Image from "next/image";
import React from "react";
import moment from "moment";

function Order({ id, amount, amount_shipping, items, timestamp, images }) {
  return (
    <div  className="relative border border-gray-200 rounded-md shadow-md mb-5">
        <div className="flex item-center space-x-10 p-5 bg-gray-200 text-sm text-gray-600">
          <div>
            <p className="font-bold text-xs uppercase">Order Placed</p>
            <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase"> Total</p>
            <p>
              ${amount} - ${amount_shipping}</p>
          </div>

          <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{items.length} Orders</p>
          <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text.xs whitespace-nowrap">
            ORDER # {id}
          </p>

        </div>

        <div className="p-5 sm:p-10">
          <div className="flex space-x-6 overflow-x-auto">
            {images &&
              images.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt="Product-image"
                  width={100}
                  height={100}
                  className="h-20 object-contain sm:h-32 mx-auto"
                />
              ))}
          </div>
        </div>
    </div>
  );
}

export default Order;
