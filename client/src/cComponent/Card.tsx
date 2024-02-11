import React from "react";
import { ratingStars } from "./reusable/utils";

export interface ProductsProps {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Card = ({ product }: { product: ProductsProps }) => {
  

  return (
    <div className="w-64 border border-gray-400 rounded-md hover:shadow-lg transition-all cursor-pointer">
      <div className="w-full h-44 relative  rounded-t-md p-4">
        <div className="absolute z-10 top-2 right-2 flex flex-row items-center justify-center h-6 py-3 px-2 bg-red-500 rounded-full">
          <p className="text-sm font-semibold ">$ {product.price}</p>
        </div>
        <div className="w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className=" h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="w-full h-32 rounded-b-md flex flex-col border-t border-gray-600 ">
        <div className="flex flex-row w-full pt-1 px-2">
          <div className="flex items-center ">
            {ratingStars(product.rating.rate)}
            <p className="text-sm font-semibold ml-2">{product.rating.rate}</p>
          </div>
        </div>
        <div className="flex flex-col flex-grow items-center justify-between">
          <div className="flex flex-row w-full pt-1 px-2">
            <p className="text-sm font-semibold line-clamp-2 text-slate-400 hover:text-red-400">
              {product.title}
            </p>
          </div>
          <span className="flex flex-row w-full text-xs font-semibold px-2 py-1 text-gray-500 text-justify overflow-hidden">
            <p className="line-clamp-2">{product.description}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
