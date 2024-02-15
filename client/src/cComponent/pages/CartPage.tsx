import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ratingStars } from "../reusable/utils";
import image from "../../../image/1.jpg";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../reusable/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CartPage = () => {
  // const [quantity, setQuantity] = useState<number>(1);
  const { userId } = useParams();
  console.log(userId);
  const axiosPrivate = useAxiosPrivate();
  const fetchCartByUserId = async () => {
    const response = await axiosPrivate({
      url: `/carts/customers/${userId}`,
      method: "GET",
    });

    return response.data.cart;
  };
  const { isLoading, data } = useQuery<any[]>({
    queryKey: ["userSpecific-cart"],
    queryFn: fetchCartByUserId,
    staleTime: 30000,
  });
  const [selectedQuantities, setSelectedQuantities] = useState<{ [productId: string]: number }>({});

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedQuantities({ ...selectedQuantities, [productId]: quantity });
  };

  if (isLoading) {
    return <Loading />;
  }
  const buyNowHandler = () => {
    toast.success("Item bought successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderRadius: 1,
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "70%",
            flexDirection: "column",
            bgcolor: "background.black",
            color: "text.primary",
            borderRadius: 2,
            p: 3,
            gap: 2,
          }}
        >
          {data?.length === 0 ? (
            <>
              <Typography variant="h5">Your Shopping Cart is empty</Typography>
              <Box>
                Your Shopping Cart lives to serve. Give it purpose — fill it
                with groceries, clothing, household supplies, electronics, and
                more.
                <br />
                Continue shopping on the
                <Link to="/" className="text-blue-500">
                  fakestore.com
                </Link>
                homepage, learn about today's deals, or visit your Wish List.
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h5">Your Shopping Cart</Typography>
              {data?.map((item, index) => {
                //  setQuantity(item.quantity)
                return (
                  <div
                    key={index}
                    className=" flex flex-col  md:flex-row  border-gray-400 border-2  "
                  >
                    <div className="w-full md:w-1/4 border-r-2 border-gray-400 shrink-0 ">
                      <div className="w-full h-full p-3 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt="demo"
                          width={240}
                          height={240}
                          className=" object-cover "
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center  w-full md:w-2/4 h-full ">
                      <div className="flex flex-col items-start justify-start w-full pl-4 pr-4">
                        <p className="text-xl font-semibold pt-2 text-[#8A8888]">
                          {item.product.title}
                        </p>
                        <div className="flex flex-row w-full pt-1 2">
                          <p className="text-sm font-semibold ">
                            {item.product.category}
                          </p>
                        </div>
                        <p className="text-xl font-bold pt-2 text-red-400">
                          ${item.product.price}
                          <span className="text-xs">per product</span>
                        </p>
                        <p className="text-2xl font-semibold pt-2 text-red-400">
                          <span className="text-xs">total</span> $
                          {item.product.price * item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col w-full p-4">
                        <div className="flex flex-row items-center text-lg gap-6 dark:text-gray-400 ">
                          <span>Quantity</span>
                        
                          <Select
                            labelId="Quantity"
                            id={`quantity-${index}`}
                            value={
                              selectedQuantities[item.product.id] ||
                              item.quantity
                            }
                            label="productsPerPage"
                            onChange={(e) =>
                              handleQuantityChange(
                                item.product.id,
                                e.target.value
                              )
                            }
                          >
                            {[...Array(9).keys()].map((quantity) => (
                              <MenuItem key={quantity} value={quantity + 1}>
                                {quantity + 1}
                              </MenuItem>
                            ))}
                          </Select>
                         
                        </div>
                        <div className="w-full mt-2 text-white ">
                          <button className="w-1/2  py-2 bg-red-500 hover:bg-red-700 transition-all rounded-l-md">
                            DELETE
                          </button>
                          <button
                            onClick={() => buyNowHandler()}
                            className="w-1/2 py-2 bg-blue-500 hover:bg-blue-700 transition-all rounded-r-md"
                          >
                            BUY NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "30%",
            flexDirection: "column",
            bgcolor: "background.black",
            color: "text.primary",
            borderRadius: 2,
            p: 3,
            gap: 2,
          }}
        >
          <Typography variant="h5">International Top picks for Your</Typography>
          <Box>
            Your Shopping Cart lives to serve. Give it purpose — fill it with
            groceries, clothing, household supplies,
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CartPage;
