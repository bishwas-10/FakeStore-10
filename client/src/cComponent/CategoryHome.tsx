import React from "react";
import { Link } from "react-router-dom";

type CategoriesProps = {
  categories: {
    name: string;
    url: string;
    alt: string;
  }[];
};
const CategoryHome = ({ categories }: CategoriesProps) => {
  return (
    <div className="flex flex-wrap">
      {categories.map(({ name, url, alt }, index) => (
        <Link
          key={index}
          to={"/categories/" + name}
          className="m-4 p-2 flex flex-col items-center  
            grow basis-56 rounded-lg hover:shadow-lg shadow-sm
             shadow-gray-400 cursor-pointer hover:scale-103 transition-all"
        >
          <p className="text-sm tracking-wide  uppercase">{name}</p>
          <img src={url} alt={alt} className="w-70 h-60 rounded-sm" />
        </Link>
      ))}
    </div>
  );
};

export default CategoryHome;
