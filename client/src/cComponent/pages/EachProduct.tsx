import { ChevronRight, DollarSign, Info, MapPin, ShieldMinus, Truck, Undo2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ratingStars } from '../reusable/utils'
import Loading from '../reusable/Loading'
import { instance } from '../../api/instance'
import { useQuery } from '@tanstack/react-query'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const fetchProductDetails = async (id: string) => {
    const response = await instance({
        url: `/products/${id}`,
        method: "GET",
      });
   
      if(response.data.success){
         return response.data.product;
      }else{
       
          throw new Error(response.data.message);
      
      }
     
  };


const EachProduct = () => {
    const [quantity, setQuantity] = useState<number>(1);
const {id}= useParams();
    const { isLoading, data, isError,error } = useQuery<any>({
      queryKey: ["product-details", id],
      queryFn: () => fetchProductDetails(id as string),
    });
    const buyNowHandler = () => {
        toast.success("Item bought successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      };

    if (isLoading) {
      return (
      <Loading/>
      );
    };
    console.log(error)
  
    if (isError) {
      return <p>Error occured 404 {error.message}</p>;
    }
  return (
    <div className="p-4 flex flex-col items-center">
    <div className="w-full">
      <div className="mt-6 flex flex-row gap-2 text-lg capitalize">
        <Link to="/">home</Link>
        <ChevronRight />
        <Link to={"/" + data.category}>{data.category}</Link>
        <ChevronRight />
        {data.title}
      </div>
    </div>
    <div className="flex flex-col w-[80%] mt-8 h-max-content">
      <div className=" flex flex-col  md:flex-row    bg-slate-100 ">
        <div className="w-full md:w-1/4 border-2 border-gray-200 shrink-0 ">
          <div className="w-full h-full p-3 bg-white flex items-center justify-center">
            <img
              src={data?.image}
              alt={data?.title}
              width={240}
              height={240}
              className="p-3 object-contain "
            />
          </div>
        </div>
        <div className="flex flex-col items-center w-full md:w-2/4 h-full ">
          <div className="flex flex-col items-start justify-start w-full pl-4 pr-4">
            <p className="text-xl font-semibold pt-2 text-[#8A8888]">
              {data?.title}
            </p>
            <div className="flex flex-row w-full pt-1 2">
              <div className="flex items-center">
                {ratingStars(data?.rating.rate)}
                <p className="text-sm font-semibold ml-2">
                  {data.rating?.rate}
                </p>
              </div>
            </div>
            <p className="text-2xl font-semibold pt-2 text-red-400">
              $ {data?.price}
            </p>
            <div className="w-full bg-gray-400 h-px mt-3 " />
          </div>
          <div className="flex flex-col w-full p-4">
            <div className="flex flex-row items-center text-lg gap-6 text-gray-800">
              <span>Quantity</span>
              <button
                onClick={() =>
                  setQuantity((quantity:number) =>
                    quantity > 1 ? quantity - 1 : quantity
                  )
                }
                className="px-2 border-2 border-gray-200 text-gray-800 bg-gray-200"
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => setQuantity((quantity:number) => quantity + 1)}
                className="px-2 border-2 border-gray-200 text-white bg-gray-400"
              >
                +
              </button>
            </div>
            <div className="w-full mt-4 text-white ">
              <button
                onClick={buyNowHandler}
                className="w-1/2  py-2 bg-red-500 hover:bg-red-700 transition-all border-2 border-gray-200 rounded-l-md"
              >
                BUY NOW
              </button>
              <button
                className="w-1/2 py-2 bg-blue-500 hover:bg-blue-700 transition-all border-2 border-gray-200 rounded-r-md"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="px-3 py-3 border-2 border-gray-300">
          <div>
            <div className="flex flex-row justify-between font-small items-center text-gray-500">
              <p>Delivey</p>
              <Info className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 flex flex-row  justify-between font-small tracking-tight">
            <div className="flex flex-row gap-2">
              <MapPin className=" text-gray-500" />
              <p>Bagmati, Kathmandu Metro 22 - Newroad Area, Newroad</p>
            </div>
            <a href="" className="text-blue-500 capitalize">
              Change
            </a>
          </div>
          <div className="mt-2 flex flex-row items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="flex flex-row items-center  gap-2">
                <Truck className="h-4 w-4  text-gray-500" />
                <span className="font-bold text-lg">Free Delivery</span>
                <p className="font-tiny text-md">20 Nov - 21 Nov</p>
              </div>
              <span className="text-sm opacity-70">2-3 day(s)</span>
            </div>
            <p className="font-semibold">Free</p>
          </div>
          <div className="mt-2 flex flex-row items-center font-medium gap-2 text-gray-600">
            <DollarSign className="h-4 w-4  text-gray-500" />
            <p>Cash On Delivery Available</p>
          </div>
          <div className="flex flex-col p-3">
            <div className="flex flex-row justify-between font-small items-center text-gray-500">
              <p>Service</p> <Info className="h-4 w-4  text-gray-500" />
            </div>
            <div className="flex mt-2 gap-2 items-start capitalize">
              <Undo2 className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-small text-md ">7 days return</p>
                <span className="font-tiny text-sm text-gray-500">
                  Change of mind applicable
                </span>
              </div>
            </div>
            <div className="flex mt-2 flex-row gap-2 text-md capitalize items-center">
              <ShieldMinus className="h-4 w-4 text-gray-500" />
              <p>Warranty not available</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-3 mt-4">
        <p className="font-medium  text-lg text-gray-700 border-b-2 border-red-500">
          Details for {data.title}
        </p>
        <p className="mt-3 text-gray-500 text-md font-bold">
          {data.description}
        </p>
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}

export default EachProduct