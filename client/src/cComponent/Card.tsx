import React from "react";
import { ratingStars } from "./reusable/utils";
import { Box, Typography } from "@mui/material";
import { TProductSchema } from "../components/pages/sub-components/add-products";


const Card = ({ product }: { product: TProductSchema }) => {
  

  return (
    <Box sx={{bgcolor:"background.main"}} className="w-64 border border-gray-200 rounded-md hover:shadow-lg transition-all cursor-pointer">
      <div className="w-full h-max relative  rounded-t-md p-4">
        <div className="absolute  top-2 right-2 flex flex-row items-center justify-center h-6 py-3 px-2 bg-primary rounded-full">
          <p className="text-sm font-semibold text-black">$ {product.price}</p>
        </div>
        <div className="w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            style={{ width: 240, height: 224 }}
            className=" object-cover"
          />
        </div>
      </div>
      <div className="w-full h-32 rounded-b-md flex flex-col border-t border-gray-600 ">
        <div className="flex flex-row w-full pt-1 px-2">
          <div className="flex items-center ">
            {ratingStars(parseInt(product.rating.rate))}
            <p className="text-sm font-semibold ml-2">{product.rating.rate}</p>
          </div>
        </div>
        <div className="flex flex-col flex-grow items-center justify-between">
          
            <Typography
            color={"text.primary"}
            fontWeight={600}
             className="text-sm  w-full  line-clamp-2 px-2
             hover:text-red-400">
              {product.title}
            </Typography>
          
          <Typography color={"text.secondary"} className="line-clamp-2  w-full text-xs font-semibold px-2 py-1
           ">
           {product.description}
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default Card;
