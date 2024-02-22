import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  PencilIcon,
  Trash,
} from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addCart, fetchAllCarts } from "../../store/cartSlice";
import { RootState } from "../../store/store";
import { dateFormatter } from "../../../utils/dateFormatter";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/useLogout";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Loading from "../../cComponent/reusable/Loading";
import { useQuery } from "@tanstack/react-query";

export const CartPropsSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  quantity: z
    .string()
    .min(1, "Price is required")
    .refine((value) => /^\d+$/.test(value), {
      message: "quantity must contain only numeric characters",
    }),
  totalAmount: z
    .string()
    .min(1, "Price is required")
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Price must contain only numeric characters",
    }),
  customer: z.object({
    id: z.string().min(1, "customer id is required"),
    username: z.string().min(1, "username is required"),
    email: z.string().min(1, "email is required"),
    phone: z.string().min(1, "phone is required"),
  }),
  product: z.object({
    id: z.string().min(1, "product id is required"),
    title: z.string().min(1, "title is required"),
  }),
  shippingAddress: z.object({
    city: z.string().optional(),
    street: z.string().optional(),
    zipcode: z.string().optional(),
  }),
  orderStatus: z.string().min(1, "order status is required"),
  paymentMethod: z.string().min(1, "order method is required"),
  paymentStatus: z.string().min(1, "payment status is required"),
});

export type TCartSchema = z.infer<typeof CartPropsSchema>;

const Order = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const cartData = useSelector((state: RootState) => state.cart.carts);
  const { auth } = useAuth();
  const logout = useLogout();

  //pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(2);
  const [pageStartIndex, setPageStartIndex] = useState<number>(0);
  const [pageEndIndex, setPageEndIndex] = useState<number>(3);

  const handlePageSelection = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setPageStartIndex(productsPerPage * (currentPage - 1));
    setPageEndIndex(productsPerPage * currentPage - 1);
  }, [currentPage, productsPerPage]);

  const controller = new AbortController();
  const axiosPrivate = useAxiosPrivate();
  const cartCall = async () => {
    try {
      const response = await axiosPrivate.get("/carts", {
        signal: controller.signal,
      });
      if (response.data.success) {
        dispatch(fetchAllCarts(response.data.cart));
        return response.data.cart;
      }
    } catch (error: any) {
     
      console.log(error);
    }
  };
  const { isLoading, isError, error, refetch } = useQuery<any>({
    queryKey: ["all-carts"],
    queryFn: cartCall,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <>
    <p>Error occured 404 {error.message}</p>
    <p>Please refresh the page</p>
    </>;
  }
  const deleteOrders = async (id: string) => {
    try {
      await axiosPrivate({
        url: `/carts/${id}`,
        method: "DELETE",
        signal: controller.signal,
        headers: {
          authorization: `Bearer ${auth.token}`,
        },
      });
      refetch();
    } catch (error: any) {
      if (error.response.status === 403 || error.response.status === 401) {
        logout();
      }
      console.log(error);
    }
  };

  return (
    <div className="px-4">
      <div className="h-20 w-full p-4 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide uppercase">
            Orders section
          </h1>
         
        </div>
      </div>
      <div className=" flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full min-h-screen">
          
          <div className=" shadow-md rounded my-6">
            here i will add delete button later which functionality would be
            sending an email to respective users with customizable message box
            <table className="w-full table-auto">
              <thead>
                <tr className=" uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-left cursor-pointer">SN</th>
                  <th className="py-3 px-0 text-center">Items</th>
                  <th className="py-3 px-0 text-center ">Total Quantity</th>
                  <th className="py-3 px-0 text-center ">Per Product</th>
                  <th className="py-3 px-0 text-center cursor-pointer">
                    <span className="text-md">Customer Details</span>
                    <br />
                    &#40;username&#41;
                    <br />
                    &#40;email&#41;
                    <br />
                    &#40;phone&#41;
                  </th>
                  <th className="py-3 px-0 text-center">
                    <span className="text-md">Shiping Address</span>
                    <br />
                    &#40;city&#41;
                    <br />
                    &#40;street&#41;
                    <br />
                    &#40;zipcode&#41;
                  </th>
                  <th className="py-3 px-0 text-center">Order Status</th>
                  <th className="py-3 px-0 text-center">Payment Method</th>
                  <th className="py-3 px-0 text-center">Payment Status</th>
                  <th className="py-3 px-0 text-left cursor-pointer">
                    Added Date
                  </th>
                  <th className="py-3 px-0 text-left cursor-pointer">
                    Last Updated
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className=" text-sm font-medium">
                {cartData.length !== 0 && (
                  <>
                    {cartData?.map((cart, index) => {
                      if (pageStartIndex <= index && pageEndIndex >= index) {
                        return (
                          <tr key={index} className="border-b border-gray-200 ">
                            <td className="py-3 px-0 text-left whitespace-nowrap">
                              <span className="font-medium">{index + 1}</span>
                            </td>
                            <td className="py-3 px-0 text-left">
                              <div className="flex items-center px-2">
                                <span>{cart.product?.title ? cart.product.title :<span className="font-bold">"product deleted"</span> }</span>
                              </div>
                            </td>
                            <td className="py-3 px-0 text-center">
                              <div className="flex items-center justify-center">
                                {cart.quantity}
                              </div>
                            </td>
                            <td className="py-3 px-0 text-center">
                              <div className="flex items-center justify-center">
                                &#36;{cart.totalAmount}
                              </div>
                            </td>
                            <td
                              id="customer_address"
                              className="py-3 px-0 text-center"
                            >
                              <div className="">
                                {cart.customer?.username}
                                <br />
                                {cart.customer?.email}
                                <br />
                                {cart.customer?.phone}
                                <br />
                              </div>
                            </td>
                            <td
                              id="shipping_address"
                              className="py-3 px-0 text-center"
                            >
                              <div className="">
                                {cart.shippingAddress?.city}
                                <br />
                                {cart.shippingAddress?.street}
                                <br />
                                {cart.shippingAddress?.zipcode}
                              </div>
                            </td>
                            <td id="status" className="py-3 px-0 text-center">
                              {cart.orderStatus}
                            </td>

                            <td
                              id="payment_method"
                              className="py-3 px-0 text-center"
                            >
                              {cart.paymentMethod}
                            </td>

                            <td className="py-3 px-0 text-center">
                              {cart.paymentStatus}
                            </td>

                            <td className="py-3 px-0 text-center">
                              <div className="flex items-center justify-center">
                                {dateFormatter(cart.createdAt as string)}
                              </div>
                            </td>
                            <td className="py-3 px-0 text-center">
                              <div className="flex items-center justify-center">
                                {dateFormatter(cart.updatedAt as string)}
                              </div>
                            </td>

                            <td className="py-3 px-0 text-center">
                              <div className="flex item-center justify-center">
                                <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                                  <Trash
                                    onClick={() =>
                                      deleteOrders(cart.id as string)
                                    }
                                  />
                                </div>
                                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                                  <Link to={"editorders"}>
                                    <PencilIcon
                                      onClick={() => dispatch(addCart(cart))}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="my-4  flex flex-row gap-2 justify-center items-center">
            <FormControl className="w-40">
              <InputLabel id="demo-simple-select-label">
                Orders per page
              </InputLabel>
              <Select
                labelId="ordersPerPage"
                id="ordersPerPage"
                value={productsPerPage}
                label="ordersPerPage"
                onChange={(e) => setProductsPerPage(e.target.value as number)}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
            {currentPage > 1 && (
              <>
                <Button variant="text" onClick={() => handlePageSelection(1)}>
                  <ChevronsLeft />
                </Button>
                <Button
                  variant="text"
                  onClick={() =>
                    setCurrentPage((currentPage) => currentPage - 1)
                  }
                >
                  <ChevronLeft />
                </Button>
              </>
            )}
            {currentPage > 1 && (
              <Button
                variant="text"
                onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
              >
                {currentPage - 1}
              </Button>
            )}

            <Button variant="contained">{currentPage}</Button>
            {currentPage < Math.ceil(cartData.length / productsPerPage) && (
              <Button
                variant="text"
                onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
              >
                {currentPage + 1}
              </Button>
            )}

            {currentPage < Math.ceil(cartData.length / productsPerPage) && (
              <>
                <Button
                  variant="text"
                  onClick={() =>
                    setCurrentPage((currentPage) => currentPage + 1)
                  }
                >
                  <ChevronRight />
                </Button>
                <Button
                  variant="text"
                  onClick={() =>
                    handlePageSelection(
                      Math.ceil(cartData.length / productsPerPage)
                    )
                  }
                >
                  <ChevronsRight />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
