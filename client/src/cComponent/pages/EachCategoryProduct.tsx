import { ChevronRight } from 'lucide-react';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Card from '../Card';
import { useQuery } from '@tanstack/react-query';
import Loading from '../reusable/Loading';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { TProductSchema } from '../../components/pages/sub-components/add-products';


const EachCategoryProduct = () => {
    const {category}= useParams();
    const axiosPrivate = useAxiosPrivate();
    const fetchCategory = async (CATEGORY: string) => {
      try {
           const response = await  axiosPrivate({
              url: `/categories/${CATEGORY}`,
              method: "GET",
            });
         console.log(response)
      
          return response.data.products;
      
      } catch (error:any) {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              throw new Error(`Server responded with status ${error.response.status} and message:
              ${error.response.data.message}
              `);
            } else if (error.request) {
              // The request was made but no response was received
              throw new Error('No response received from the server');
            } else {
              // Something happened in setting up the request that triggered an Error
              throw new Error('Error setting up the request');
            }
      }
        };
  
      const { isLoading, data ,isError,error} = useQuery({
        queryKey: [`category ${category && category}`],
        queryFn: () => fetchCategory(category as string),
      });

      
      if (isLoading) {
        return <Loading/>;
      }
      if (isError ) {
        return <span>Error occured 404<p className="text-md font-medium ">{error.message}</p> </span>;
      }
  return (
    <div className="p-6 my-2 flex flex-wrap items-center justify-center gap-4 ">
       <div className="w-full ">
        <div className=" flex flex-row items-center gap-2 text-lg capitalize">
          <Link to="/">home</Link>
          <ChevronRight />
          <p>{category}</p>
          
          
        </div>
      </div>
      {data?.map((data: TProductSchema) => {
        return (
          <Link key={data.id} to={"/product/" + data.id}>
            
            <Card product={data} key={data.id} />
          </Link>
        );
      })}
    </div>
  )
}

export default EachCategoryProduct