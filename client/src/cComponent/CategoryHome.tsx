import React from "react";
import { Link } from "react-router-dom";
import { instance } from "../../api/instance";
import { useQuery } from "@tanstack/react-query";
import Loading from "./reusable/Loading";
import { TCategorySchema } from "../components/pages/sub-components/AddCategory";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "../store/categorySlice";

type CategoriesProps = {
  categories: {
    name: string;
    url: string;
    alt: string;
  }[];
};


const CategoryHome = ({ categories }: CategoriesProps) => {
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    const response = await instance({
        url: `/categories`,
        method: "GET",
      });
   
      if(response.data.success){
        dispatch(fetchAllCategories(response.data.categories));
         return response.data.categories;
      }else{
       
          throw new Error(response.data.message);
      
      }
     
  };
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
      
      {data?.map((item:TCategorySchema, index:number) => (
        <Link
          key={index}
          to={"/categories/" + item.title}
          className="m-4 p-2 flex flex-col items-center  
            grow basis-56 rounded-lg hover:shadow-lg shadow-sm
             shadow-gray-600 dark:hover:shadow-gray-200 cursor-pointer hover:scale-103 transition-all"
        >
          <p className="text-sm tracking-wide  uppercase">{item.title}</p>
          <img src={item.image} alt={item.title} className="w-70 h-60 rounded-sm" />
        </Link>
      ))}
    </div>
  );
};

export default CategoryHome;
