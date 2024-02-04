import { useState } from "react";
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



export const CartPropsSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  addedAt: z.string().optional(),
  quantity: z.number().default(1),
  totalAmount: z
  .string()
  .min(1, "Price is required")
  .refine((value) => /^\d+(\.\d+)?$/.test(value), {
    message: "Price must contain only numeric characters",
  }),
  customerId: z.object({
    username:z.string().min(1,"username is required"),
    email:z.string().min(1,"email is required").email(),
    phone:z.string().min(1,"phone no is required"),
    address:z.string().min(1,"address is required"),
  }),
  product: z.object({
    title: z.string().min(1, "title is required"),
    price: z
      .string()
      .min(1, "Price is required")
      .refine((value) => /^\d+(\.\d+)?$/.test(value), {
        message: "Price must contain only numeric characters",
      }),
    category: z.string().min(1, "category is required"),
  }),
  shippingAddress: z.object({
    city: z.string().min(1,"city is required"),
    street: z.string().min(1,"street is required"),
    zipcode: z.string().optional(),
  }),
  orderStatus: z.string().min(1,"order status is required"),
  paymentMethod: z.string().min(1,"order method is required"),
  paymentStatus: z.string().min(1,"payment status is required"),
});

export type TCartSchema = z.infer<typeof CartPropsSchema>;

const Order = () => {
  
  return (
    <div className="px-4">
      <div className=" flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className=" shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className=" uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-left cursor-pointer">
                    SN
                  </th>
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
                  <th className="py-3 px-0 text-left cursor-pointer">Added Date</th>
                  <th className="py-3 px-0 text-left cursor-pointer">
                    Last Updated
                  </th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className=" text-sm font-light">
                <tr className="border-b border-gray-200 ">
                  <td className="py-3 px-0 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span className="font-medium">5</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-left">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span>tuyik</span>
                    </div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">2542</div>
                  </td>
                  <td id="customer_address" className="py-3 px-0 text-center">
                    <div className="">
                    customer address
                    </div>
                  </td>
                  <td id="shipping_address" className="py-3 px-0 text-center">
                    <div className="">
                    shipping address
                    </div>
                  </td>
                  <td id="status" className="py-3 px-0 text-center">
                    
                    order status
                  </td>

                  <td id="payment_method" className="py-3 px-0 text-center">
                   
                    payment method
                  </td>

                  <td className="py-3 px-0 text-center">
                   
                    payment status
                  </td>

                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">added date</div>
                  </td>
                  <td className="py-3 px-0 text-center">
                    <div className="flex items-center justify-center">updated date</div>
                  </td>

                  <td className="py-3 px-0 text-center">
                    <div className="flex item-center justify-center">
                      <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120"><Trash/></div>
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                     <Link to={'editorders'}> <PencilIcon /></Link>  
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
