import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "../reusable/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { z } from "zod";
import { customerSchema } from "../../components/pages/sub-components/editCustomers";
import { productSchema } from "../../components/pages/sub-components/add-products";
import useAuth from "../../../hooks/useAuth";
import { AxiosInstance } from "axios";
import { UserInfoProps } from "../../context/AuthProvider";
import { JwtPayload, jwtDecode } from "jwt-decode";
import TopPicksForYou from "../TopPicksForYou";
import Personalized from "../Personalized";
import EmptyCartSvg from "../EmptyCartSvg";
import { useDispatch } from "react-redux";
import { fetchAllCarts, setCheckOutItems } from "../../store/cartSlice";
import { Dispatch } from "@reduxjs/toolkit";
export const CartPropsSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  quantity: z
    .string()
    .min(1, "quantity is required")
    .refine((value) => /^\d+$/.test(value), {
      message: "quantity must contain only numeric characters",
    }),
  totalAmount: z
    .string()
    .min(1, "Price is required")
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Price must contain only numeric characters",
    }),
  customer: customerSchema,
  product: productSchema,
  shippingAddress: z.object({
    city: z.string().min(1, "city is required"),
    street: z.string().min(1, "street is required"),
    zipcode: z.string().optional(),
  }),
  orderStatus: z.string().min(1, "order status is required"),
  paymentMethod: z.string().min(1, "order method is required"),
  paymentStatus: z.string().min(1, "payment status is required"),
});
export type TCartSchema = z.infer<typeof CartPropsSchema>;

const fetchCartByUserId = async (
  userId: string,
  axiosPrivate: AxiosInstance,
  dispatch: Dispatch
) => {
  try {
    const response = await axiosPrivate({
      url: `/carts/${userId}`,
      method: "GET",
    });
    console.log(response)
    dispatch(fetchAllCarts(response.data.cart));
    return response.data.cart;
  } catch (error:any) {
    
    throw new Error(error?.response?.data?.message);
  }
};

const CartPage = () => {
  const [value, setValue] = React.useState<"All" | "Paid" | "Not Paid">(
    "Not Paid"
  );

  const navigate = useNavigate();
  const location = useLocation();
  const [selectedQuantities, setSelectedQuantities] = useState<{
    [productId: string]: number;
  }>({});
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const decoded: UserInfoProps | undefined = auth.token
    ? (jwtDecode<JwtPayload>(auth.token as string) as UserInfoProps)
    : undefined;
  const axiosPrivate = useAxiosPrivate();

  const { isLoading, data, error, isError, refetch } = useQuery<any[]>({
    queryKey: ["userSpecific-cart"],
    queryFn: () =>
      fetchCartByUserId(
        decoded?.UserInfo.userId as string,
        axiosPrivate,
        dispatch
      ),
  });

  if (!auth.token) {
    return (
      <>
        {" "}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "space-between",
            minheight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
            p: 4,
          }}
        >
          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              color: "text.primary",
            }}
            className="flex flex-col items-center justify-center h-max py-6"
          >
            <Typography fontSize={"20px"} fontWeight={"600"}>
              Your shopping cart is empty
            </Typography>
            <Link to={"/"} className="text-xs">
              Top picks for you!
            </Link>
            <Box className="flex flex-col gap-2">
              <EmptyCartSvg />{" "}
              <Box className="flex flex-row gap-6 mt-8">
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate("/login", {
                      state: { from: location },
                      replace: true,
                    })
                  }
                >
                  Sign in to your account
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate("/signup", {
                      state: { from: location },
                      replace: true,
                    })
                  }
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Box>
          <Personalized />
        </Box>
      </>
    );
  } else {
    if (isError) {
      return (
        <span>
          Error occured 404
          <p className="text-md font-medium ">{error.message}</p>{" "}
        </span>
      );
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleQuantityChange = async (
    productId: string,
    cartId: string,
    quantity: number
  ) => {
    setSelectedQuantities({ ...selectedQuantities, [productId]: quantity });
    try {
      const response = await axiosPrivate({
        url: `/carts/${cartId}`,
        method: "PATCH",
        data: {
          quantity: quantity,
          product: productId,
        },
      });
      if (response.data.success) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaidProductChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value as "All" | "Paid" | "Not Paid");
  };
  const cancelOrder = async (cartId: string) => {
    try {
      await axiosPrivate({
        url: `/carts/${cartId}`,
        method: "DELETE",
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const buyNowHandler = async (cartItem: TCartSchema) => {
    //console.log(cartItem)
    dispatch(setCheckOutItems([cartItem]));
    navigate("checkout");
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
      }}
    >
      <Box
        sx={{
          borderRadius: 1,
          gap: 2,
        }}
        className="flex md:flex-row flex-col "
      >
        <Box
          sx={{
            display: "flex",

            flexDirection: "column",
            bgcolor: "background.black",
            color: "text.primary",
            borderRadius: 2,
            p: 3,
            gap: 2,
          }}
          className="w-full md:w-[70%]"
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
              <Box
                sx={{ bgcolor: "background.paper" }}
                className="flex flex-col py-8 px-6 items-center "
              >
                <Typography fontSize={"30px"} fontWeight={"600"}>
                  Your Total for unpaid products
                </Typography>
                <Box className="flex flex-row gap-4 items-center w-max text-xl font-bold ">
                  <span className="flex flex-row items-center ">
                    Total Products:{" "}
                    <Typography
                      fontSize={"25px"}
                      fontWeight={"600"}
                      color={"text.textSecondary"}
                    >
                      {data
                        ?.map((item: TCartSchema) =>
                          item.paymentStatus === "not paid"
                            ? parseInt(item.quantity)
                            : 0
                        )
                        .reduce((acc, curr) => acc + curr, 0)}
                    </Typography>
                  </span>
                  <span className="flex flex-row items-center">
                    Total Price:{" "}
                    <Typography
                      fontSize={"25px"}
                      fontWeight={"600"}
                      color={"text.textSecondary"}
                    >
                      $
                      {data
                        ?.map((item: TCartSchema) =>
                          item.paymentStatus === "not paid"
                            ? parseInt(item.quantity) *
                              parseInt(item.totalAmount)
                            : 0
                        )
                        .reduce((acc, curr) => acc + curr, 0)}
                    </Typography>
                  </span>
                </Box>
              </Box>
              <FormControl>
                <FormLabel id="controlled-radio-buttons-group">
                  Filter Orders
                </FormLabel>
                <RadioGroup
                  aria-labelledby="controlled-radio-buttons-group"
                  name="radio-buttons-group"
                  value={value}
                  onChange={handlePaidProductChange}
                >
                  <Box className="flex flex-row gap-2">
                    <FormControlLabel
                      value="All"
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="Paid"
                      control={<Radio />}
                      label="Paid"
                    />
                    <FormControlLabel
                      value="Not Paid"
                      control={<Radio />}
                      label="Not Paid"
                    />
                  </Box>
                </RadioGroup>
              </FormControl>
              <Typography variant="h5">Your Shopping Cart</Typography>
              {data
                ?.filter((item) =>
                  value === "All"
                    ? item
                    : value === "Paid"
                    ? item.paymentStatus === "paid"
                    : item.paymentStatus === "not paid"
                )
                ?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      {item.product && (
                        <div className=" flex flex-col  md:flex-row  border-gray-400 border-2  ">
                          <div className="w-full md:w-1/4 border-r-2 border-gray-400 shrink-0 ">
                            <div className="w-full h-full p-3 flex items-center justify-center">
                              <img
                                src={item.product?.image}
                                alt="demo"
                                width={240}
                                height={240}
                                className=" object-cover "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center  w-full  ">
                            <div className="flex flex-col items-start justify-start w-full pl-4 pr-4">
                              <p className="text-xl font-semibold pt-2 text-[#8A8888]">
                                {item.product?.title}
                              </p>
                              <div className="flex flex-row w-full pt-1 2">
                                <p className="text-sm font-semibold ">
                                  {item.product?.category}
                                </p>
                              </div>
                              <Typography
                                fontSize={"25px"}
                                fontWeight={"600"}
                                color={"text.textSecondary"}
                              >
                                ${item.product?.price}
                                <span className="text-xs">per product</span>
                              </Typography>
                              <Typography
                                fontSize={"25px"}
                                fontWeight={"600"}
                                color={"text.textSecondary"}
                              >
                                <span className="text-xs">total</span> $
                                {item.product?.price * item.quantity}
                              </Typography>
                            </div>
                            <div className="flex flex-col w-full p-4">
                              {item.paymentStatus !== "paid" && (
                                <div className="flex flex-row items-center text-lg gap-6 dark:text-gray-400 ">
                                  <span>Quantity</span>

                                  <Select
                                    labelId="Quantity"
                                    id={`quantity-${index}`}
                                    value={
                                      selectedQuantities[item.product?.id] ||
                                      item.quantity
                                    }
                                    label="productsPerPage"
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        item.product.id,
                                        item._id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    {[...Array(15).keys()].map((quantity) => (
                                      <MenuItem
                                        key={quantity}
                                        value={quantity + 1}
                                      >
                                        {quantity + 1}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </div>
                              )}
                              {item.paymentStatus === "paid" ? (
                                <Typography
                                  fontSize={"18px"}
                                  className="text-white p-2 text-center bg-green-600 rounded-md"
                                >
                                  Payment recieved successfully ,products will
                                  be delivered to your provided location
                                </Typography>
                              ) : (
                                <div className="w-full mt-2 text-white ">
                                  <Button
                                    variant="outlined"
                                    onClick={() => cancelOrder(item._id)}
                                    className="w-1/2  py-2  rounded-l-md"
                                  >
                                    DELETE
                                  </Button>
                                  <Button
                                    onClick={() => buyNowHandler(item)}
                                    variant="contained"
                                    className="w-1/2 py-2  rounded-r-md"
                                  >
                                    BUY NOW
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
            </>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",

            flexDirection: "column",
            bgcolor: "background.black",
            color: "text.primary",
            borderRadius: 2,
            p: 3,
            gap: 2,
          }}
          className="w-full md:w-[30%]"
        >
          <Typography variant="h5">International Top picks for You!</Typography>
          <Box
            className="w-full h-max rounded-md p-4"
            sx={{ bgcolor: "background.paper" }}
          >
            <TopPicksForYou />
          </Box>
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default CartPage;
