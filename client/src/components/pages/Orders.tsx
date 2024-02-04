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



export const CartPropsSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  addedAt: z.string().optional(),
  quantity: z.number().default(1),
  customerId: z.number().min(1,"customer id is required"),
  product: z.string().min(1,"product id is required"),
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
  // const [orderStatus, setOrderStatus] = useState<string>("");
  // const [paymentMethod, setPaymentMethod] = useState<string>("");
  // const [payment, setPayment] = useState<string>("");
  
  // const handleOrderChange = (event: SelectChangeEvent) => {
  //   setOrderStatus(event.target.value as string);
  // };

  // const handlePaymentChange = (event: SelectChangeEvent) => {
  //   setPaymentMethod(event.target.value as string);
  // };

  // const handlePayment = (event: SelectChangeEvent) => {
  //   setPayment(event.target.value as string);
  // };
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
                    {/* <Box style={{ height: "20px" }} className="text-sm">
                      <FormControl
                        variant="standard"
                        style={{
                          fontSize: "14px",
                          lineHeight: "10px",
                          height: "20px",
                        }}
                        className="w-40"
                      >
                        <InputLabel
                          style={{
                            fontSize: "14px",
                            lineHeight: "10px",
                            textAlign: "center",
                          }}
                        >
                          Order Status
                        </InputLabel>
                        <Select
                          className="text-sm"
                          labelId="orderstatus labelid"
                          id="order_status"
                          value={orderStatus}
                          label="Order Status"
                          onChange={handleOrderChange}
                        >
                          <MenuItem
                            style={{ fontSize: "14px", lineHeight: "10px" }}
                            value={"pending"}
                          >
                            Pending
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: "14px", lineHeight: "10px" }}
                            value={"dispatched"}
                          >
                            Dispatched
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: "14px", lineHeight: "10px" }}
                            value={"delivered"}
                          >
                            Delivered
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: "14px", lineHeight: "10px" }}
                            value={"cancelled"}
                          >
                            Cancelled
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box> */}
                    order status
                  </td>

                  <td id="payment_method" className="py-3 px-0 text-center">
                    {/* <Box style={{ height: "20px" }} className="text-sm">
                      <FormControl
                        variant="standard"
                        style={{
                          fontSize: "14px",
                          lineHeight: "10px",
                          height: "20px",
                        }}
                        className="w-40"
                      >
                        <InputLabel
                          style={{
                            fontSize: "14px",
                            lineHeight: "10px",
                            textAlign: "center",
                          }}
                        >
                          Payment Method
                        </InputLabel>
                        <Select
                          className="text-sm"
                          labelId="payment-method labelid"
                          id="paymentmethod_status"
                          value={paymentMethod}
                          label="paymentmethod Status"
                          onChange={handlePaymentChange}
                        >
                          <MenuItem
                            style={{ fontSize: "14px", lineHeight: "10px" }}
                            value={"online"}
                          >
                            Online
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: "14px", lineHeight: "10px" }}
                            value={"onsite"}
                          >
                            Onsite
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box> */}
                    payment method
                  </td>

                  <td className="py-3 px-0 text-center">
                    {/* <Box style={{ height: "20px" }} className="text-sm">
                      <FormControl
                        variant="standard"
                        style={{
                          fontSize: "14px",
                          lineHeight: "10px",
                          height: "20px",
                        }}
                        className="w-40"
                      >
                        <InputLabel
                          style={{
                            fontSize: "14px",
                            lineHeight: "10px",
                            textAlign: "center",
                          }}
                        >
                          Payment Status
                        </InputLabel>
                        <Select
                          className="text-sm"
                          labelId="paymentdone labelid"
                          id="payment"
                          value={payment}
                          label="payment"
                          onChange={handlePayment}
                        >
                          <MenuItem
                            style={{ fontSize: "14px", lineHeight: "10px" }}
                            value={"done"}
                          >
                            Done
                          </MenuItem>
                          <MenuItem
                            style={{ fontSize: "14px", lineHeight: "10px" }}
                            value={"notdone"}
                          >
                            Not Done
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box> */}
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
                        <PencilIcon />
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
