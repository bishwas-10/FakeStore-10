import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCarts, setCheckOutItems } from "../../store/cartSlice";
import BackToTop from "../reusable/BackToTop";
import { RootState } from "../../store/store";
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
    dispatch(fetchAllCarts(response.data.cart));
    return response.data.cart;
  } catch (error) {
    throw new Error("Failed to fetch cart data");
  }
};

const CartPage = () => {
  const navigate = useNavigate();
  const [selectedQuantities, setSelectedQuantities] = useState<{
    [productId: string]: number;
  }>({});
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const decoded: UserInfoProps | undefined = auth.token
    ? (jwtDecode<JwtPayload>(auth.token as string) as UserInfoProps)
    : undefined;
  const cartItems = useSelector((state: RootState) => state.cart.carts);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
          height: "100vh",
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
              <Button variant="contained" onClick={() => navigate("/login")}>
                Sign in to your account
              </Button>
              <Button variant="outlined" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
        <Personalized />
        <BackToTop />
      </Box>
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

  const cancelOrder = async (cartId: string) => {
    try {
      const response = await axiosPrivate({
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
    try {
      const response = await axiosPrivate({
        url: `/carts/${cartItem.id}`,
        method: "PUT",
        data: {
          ...cartItem,
          quantity: cartItem.quantity.toString(),
          product: cartItem.product.id,
          customer: decoded?.UserInfo.userId,
          paymentStatus: "paid",
        },
      });
      console.log(response);
      refetch();
    } catch (error) {
      console.log(error);
    }
    toast.success("Item bought successfully", {
      position: "top-center",
      autoClose: 2000,
    });
  };
  const handleCheckOut = async(items: TCartSchema[]) => {
    dispatch(setCheckOutItems(items));
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
          display: "flex",
          borderRadius: 1,
          gap: 2,
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
              <Box
                sx={{ bgcolor: "background.paper" }}
                className="flex flex-col py-8 px-6 items-center "
              >
                <Typography fontSize={"30px"} fontWeight={"600"}>
                  Your Total
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
                {data?.length && (
                  <Button
                    onClick={() =>
                      handleCheckOut(
                        data?.filter(
                          (item: TCartSchema) =>
                            item.paymentStatus === "not paid"
                        ) as TCartSchema[]
                      )
                    }
                    variant="contained"
                    className="text-xl"
                  >
                    Check Out
                  </Button>
                )}
              </Box>
              <Typography variant="h5">Your Shopping Cart</Typography>
              {data
                ?.filter((item) => item.paymentStatus === "not paid")
                ?.map((item, index) => {
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
                      <div className="flex flex-col items-center  w-full  ">
                        <div className="flex flex-col items-start justify-start w-full pl-4 pr-4">
                          <p className="text-xl font-semibold pt-2 text-[#8A8888]">
                            {item.product.title}
                          </p>
                          <div className="flex flex-row w-full pt-1 2">
                            <p className="text-sm font-semibold ">
                              {item.product.category}
                            </p>
                          </div>
                          <Typography
                            fontSize={"25px"}
                            fontWeight={"600"}
                            color={"text.textSecondary"}
                          >
                            ${item.product.price}
                            <span className="text-xs">per product</span>
                          </Typography>
                          <Typography
                            fontSize={"25px"}
                            fontWeight={"600"}
                            color={"text.textSecondary"}
                          >
                            <span className="text-xs">total</span> $
                            {item.product.price * item.quantity}
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
                                  selectedQuantities[item.product.id] ||
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
                                  <MenuItem key={quantity} value={quantity + 1}>
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
                              Item bought
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
          <Typography variant="h5">International Top picks for You!</Typography>
          <Box
            className="w-full h-max rounded-md p-4"
            sx={{ bgcolor: "background.paper" }}
          >
            <TopPicksForYou />
          </Box>
        </Box>
      </Box>
      <BackToTop />
      <ToastContainer />
    </Box>
  );
};

export default CartPage;
