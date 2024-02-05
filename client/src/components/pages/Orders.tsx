import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { PencilIcon, Trash } from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { addCart, fetchCarts, removeCarts } from "../../store/cartSlice";
import { RootState } from "../../store/store";

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
  }),
  product: z.object({
    id: z.string().min(1, "customer id is required"),
    title: z.string().min(1, "title is required"),
  }),
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

const Order = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const cartData = useSelector((state: RootState) => state.cart.carts);
  console.log(cartData);
  useEffect(() => {
    dispatch(fetchCarts());
    return () => {
      dispatch(removeCarts());
    };
  }, []);

  return (
    <div className="px-4">
      <div className=" flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className=" shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className=" uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-left cursor-pointer">SN</th>
                  <th className="py-3 px-0 text-left">Items</th>
                  <th className="py-3 px-0 text-left cursor-pointer">
                    Total Amount
                  </th>
                  <th className="py-3 px-0 text-left cursor-pointer">
                    Customer Details
                  </th>
                  <th className="py-3 px-0 text-center">Shipping Address</th>
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
              <tbody className=" text-sm font-light">
                {cartData.length !== 0 &&
                  cartData.map((cart, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200 ">
                        <td className="py-3 px-0 text-left whitespace-nowrap">
                          <span className="font-medium">{index + 1}</span>
                        </td>
                        <td className="py-3 px-0 text-left">
                          <div className="flex items-center">
                            <span>{cart.product?.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-0 text-center">
                          <div className="flex items-center justify-center">
                            {cart.totalAmount}
                          </div>
                        </td>
                        <td
                          id="customer_address"
                          className="py-3 px-0 text-center"
                        >
                          <div className="">{cart.customer?.id}</div>
                        </td>
                        <td
                          id="shipping_address"
                          className="py-3 px-0 text-center"
                        >
                          <div className="">
                            {cart.shippingAddress.city}
                            {cart.shippingAddress.street}

                            {cart.shippingAddress.zipcode}
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
                            {cart.createdAt}
                          </div>
                        </td>
                        <td className="py-3 px-0 text-center">
                          <div className="flex items-center justify-center">
                          {cart.updatedAt}
                          </div>
                        </td>

                        <td className="py-3 px-0 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                              <Trash />
                            </div>
                            <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                              <Link to={"editorders"}>
                               
                                <PencilIcon onClick={()=>dispatch(addCart(cart))}/>
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
