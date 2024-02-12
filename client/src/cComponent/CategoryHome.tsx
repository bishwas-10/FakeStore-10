import React from "react";
import { Link } from "react-router-dom";
import { instance } from "../../api/instance";
import { useQuery } from "@tanstack/react-query";
import Loading from "./reusable/Loading";

type CategoriesProps = {
  categories: {
    name: string;
    url: string;
    alt: string;
  }[];
};

const fetchCategories = async () => {
  const response = await instance({
      url: `/categories`,
      method: "GET",
    });
 
    if(response.data.success){
       return response.data.categories;
    }else{
     
        throw new Error(response.data.message);
    
    }
   
};
const CategoryHome = ({ categories }: CategoriesProps) => {
  const { isLoading, data ,isError,error} = useQuery({
    queryKey: [`categories`],
    queryFn: () => fetchCategories(),
  });

  
  if (isLoading) {
    return <Loading/>;
  }
  if (isError ) {
    return <span>Error occured 404<p className="text-md font-medium ">{error.message}</p> </span>;
  }
  return (
    <div className="flex flex-wrap">
      <div className="flex flex-row gap-2">
{data?.map((item:string,i:number)=>{
  return <Link key={i}  to={"/categories/" + item}>{item}</Link>
})}
      </div>
      {categories.map(({ name, url, alt }, index) => (
        <Link
          key={index}
          to={"/categories/" + name}
          className="m-4 p-2 flex flex-col items-center  
            grow basis-56 rounded-lg hover:shadow-lg shadow-sm
             shadow-gray-600 dark:hover:shadow-gray-200 cursor-pointer hover:scale-103 transition-all"
        >
          <p className="text-sm tracking-wide  uppercase">{name}</p>
          <img src={url} alt={alt} className="w-70 h-60 rounded-sm" />
        </Link>
      ))}
    </div>
  );
};

export default CategoryHome;
