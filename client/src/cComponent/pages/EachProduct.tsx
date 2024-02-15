import { useEffect, useState } from "react";
import {
  ChevronRight,
  DollarSign,
  Info,
  MapPin,
  ShieldMinus,
  Truck,
  Undo2,
} from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ratingStars } from "../reusable/utils";
import Loading from "../reusable/Loading";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserInfoProps } from "../../context/AuthProvider";
import useRefreshToken from "../../../hooks/useRefreshToken";



const EachProduct = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();
  const { auth, setAuth } = useAuth();
 
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useRefreshToken();
  const from = location.state?.from?.pathname || "/";
  const axiosPrivate = useAxiosPrivate();
  const fetchProductDetails = async (id: string) => {
    const response = await axiosPrivate({
      url: `/products/${id}`,
      method: "GET",
    });
  
    if (response.data.success) {
      return response.data.product;
    } else {
      throw new Error(response.data.message);
    }
  };
  const { isLoading, data, isError, error } = useQuery<any>({
    queryKey: ["product-details", id],
    queryFn: () => fetchProductDetails(id as string),
  });

  const buyNowHandler = () => {
    toast.success("Item bought successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  };
  const authCheck = async () => {
    try {
      console.log("run vayo");
      await refresh();
    
    } catch (error) {
      setAuth({ token: null });
    }
  };
  useEffect(() => {
    if (!auth.token) {
      authCheck();
    } else {
      navigate("/login");
    }
  }, []);
  let decoded: UserInfoProps;
  if (auth.token) {
    decoded = jwtDecode<JwtPayload>(auth.token as string) as UserInfoProps;
  }
  const addToCart = async () => {
    try {
      console.log(decoded);
      const response = await axiosPrivate({
        url: `/carts`,
        method: "POST",
        data: {
          quantity: quantity.toString(),
          totalAmount: data.price.toString(),
          customer: decoded.UserInfo.userId?.toString(),
          product: id,
          shippingAddress: {
            city: "kathmandu",
            street: "banechor road",
            zipcode: "293282",
          },
          orderStatus: "pending",
          paymentMethod: "onsite",
          paymentStatus: "not paid",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }


  if (isError) {
    return <p>Error occured 404 {error.message}</p>;
  }

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="w-full">
        <div className=" flex flex-row gap-2 text-lg capitalize">
          <Link to="/">home</Link>
          <ChevronRight />
          <Link to={"/categories/" + data.category}>{data.category}</Link>
          <ChevronRight />
          {data.title}
        </div>
      </div>
      <div className="flex flex-col w-full  mt-8  h-max-content">
        <div className=" flex flex-col  md:flex-row  border-2 border-gray-400  ">
          <div className="w-full md:w-1/4 border-r-2 border-gray-400 shrink-0 ">
            <div className="w-full h-full p-3 flex items-center justify-center">
              <img
                src={data?.image}
                alt={data?.title}
                width={240}
                height={240}
                className="p-3 object-contain shadow-md"
              />
            </div>
          </div>
          <div className="flex flex-col items-center  w-full md:w-2/4 h-full ">
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
              <div className="w-full h-px mt-3 " />
            </div>
            <div className="flex flex-col w-full p-4">
              <div className="flex flex-row items-center text-lg gap-6 text-gray-400 ">
                <span>Quantity</span>
                <button
                  onClick={() =>
                    setQuantity((quantity: number) =>
                      quantity > 1 ? quantity - 1 : quantity
                    )
                  }
                  className="px-2 border-2 border-gray-400 text-gray-400  "
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={() =>
                    setQuantity((quantity: number) => quantity + 1)
                  }
                  className="px-2 border-2 border-gray-400 text-gray-400"
                >
                  +
                </button>
              </div>
              <div className="w-full mt-4 text-white ">
                <button
                  onClick={buyNowHandler}
                  className="w-1/2  py-2 bg-red-500 hover:bg-red-700 transition-all rounded-l-md"
                >
                  BUY NOW
                </button>
                <button
                  onClick={() => addToCart()}
                  className="w-1/2 py-2 bg-blue-500 hover:bg-blue-700 transition-all  rounded-r-md"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          <div className="px-3 py-3 border-l-2 border-gray-400">
            <div>
              <div className="flex flex-row justify-between font-small items-center text-gray-400">
                <p>Delivey</p>
                <Info className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex flex-row  justify-between font-small tracking-tight">
              <div className="flex flex-row gap-2">
                <MapPin className=" text-gray-400" />
                <p>Bagmati, Kathmandu Metro 22 - Newroad Area, Newroad</p>
              </div>
              <a href="" className="text-blue-500 capitalize">
                Change
              </a>
            </div>
            <div className="mt-2 flex flex-row items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-center  gap-2">
                  <Truck className="h-4 w-4  text-gray-400" />
                  <span className="font-bold text-lg">Free Delivery</span>
                  <p className="font-tiny text-md">20 Nov - 21 Nov</p>
                </div>
                <span className="text-sm opacity-70">2-3 day(s)</span>
              </div>
              <p className="font-semibold">Free</p>
            </div>
            <div className="mt-2 flex flex-row items-center font-medium gap-2 text-gray-400">
              <DollarSign className="h-4 w-4  " />
              <p>Cash On Delivery Available</p>
            </div>
            <div className="flex flex-col p-3">
              <div className="flex flex-row justify-between font-small items-center text-gray-400">
                <p>Service</p> <Info className="h-4 w-4  " />
              </div>
              <div className="flex mt-2 gap-2 items-start capitalize">
                <Undo2 className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-small text-md ">7 days return</p>
                  <span className="font-tiny text-sm text-gray-400">
                    Change of mind applicable
                  </span>
                </div>
              </div>
              <div className="flex mt-2 flex-row gap-2 text-md capitalize items-center">
                <ShieldMinus className="h-4 w-4 text-gray-400" />
                <p>Warranty not available</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-3 mt-4">
          <p className="font-medium  text-lg text-gray-500 border-b-2 border-red-500">
            Details for {data.title}
          </p>
          <p className="mt-3 text-gray-400 text-md font-bold">
            {data.description}
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EachProduct;
