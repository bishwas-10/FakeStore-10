import React from "react";

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
  const ratingStars = () => {
    const stars = [];
    const rating: number = Math.round(product.rating.rate);
    for (let i = 0; i < 5; i++) {
      const starColor = i < rating ? "text-yellow-500" : "text-gray-300";
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 fill-current ${starColor}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15.585L3.535 19.9l1.065-6.203L.293 7.115l6.257-.91L10 0l3.45 6.205 6.257.91-4.307 4.582 1.064 6.203z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="w-64 border border-gray-400 rounded-md hover:shadow-lg transition-all cursor-pointer">
      <div className="w-full h-44 relative bg-white rounded-t-md p-4">
        <div className="absolute z-10 top-2 right-2 flex flex-row items-center justify-center h-6 py-3 px-2 bg-red-500 rounded-full">
          <p className="text-sm font-semibold text-white">$ {product.price}</p>
        </div>
        <div className="w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className=" h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="w-full h-32 rounded-b-md flex flex-col border-t border-gray-600 bg-gray-100">
        <div className="flex flex-row w-full pt-1 px-2">
          <div className="flex items-center ">
            {ratingStars()}
            <p className="text-sm font-semibold ml-2">{product.rating.rate}</p>
          </div>
        </div>
        <div className="flex flex-col flex-grow items-center justify-between">
          <div className="flex flex-row w-full pt-1 px-2">
            <p className="text-sm font-semibold line-clamp-2 text-slate-800 hover:text-red-400">
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
