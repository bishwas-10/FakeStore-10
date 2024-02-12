import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  MenuItem,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  CardActions,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { instance } from "../../../../api/instance";
import { addCart } from "../../../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useLogout from "../../../../hooks/useLogout";

const EditCartSchema = z.object({
  quantity:z
  .string()
  .min(1, "Price is required")
  .refine((value) => /^\d+?$/.test(value), {
    message: "Price must contain only numeric characters",
  }),
  totalAmount: z
    .string()
    .min(1, "Price is required")
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Price must contain only numeric characters",
    }),
  orderStatus: z.string().min(1, "order status is required"),
  paymentMethod: z.string().min(1, "order method is required"),
  paymentStatus: z.string().min(1, "payment status is required"),
});

type TEditCartSchema = z.infer<typeof EditCartSchema>;
const EditOrders = () => {
  const cartData = useSelector((state: RootState) => state.cart.selectedCart);
  const logout = useLogout();
const {auth}= useAuth();
  const dispatch = useDispatch();
  const [orderStatus, setOrderStatus] = useState<string>(
    cartData?.orderStatus as string
  );
  const [paymentMethod, setPaymentMethod] = useState<string>(
    cartData?.paymentMethod as string
  );
  const [payment, setPayment] = useState<string>(
    cartData?.paymentStatus as string
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TEditCartSchema>({
    resolver: zodResolver(EditCartSchema),
    reValidateMode: "onChange",
    defaultValues: {
      quantity: cartData?.quantity ,
      totalAmount: cartData?.totalAmount,
    },
  });
  const handleOrderChange = (event: SelectChangeEvent) => {
    setOrderStatus(event.target.value as string);
    setValue("orderStatus", event.target.value as string);
  };

  const handlePaymentChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as string);
    setValue("paymentMethod", event.target.value as string);
  };

  const handlePayment = (event: SelectChangeEvent) => {
    setPayment(event.target.value as string);
    setValue("paymentStatus", event.target.value as string);
  };
  const onSubmit = async (data: TEditCartSchema) => {

    try {
      if (cartData?.id) {
        const response = await instance({
          url: `/carts/${cartData.id}`,
          method: "PUT",
          headers: {
            "Content-type": "application/json",
              authorization: `Bearer ${auth.token}`,
          },
          data: {
            shippingAddress: {
              city: cartData?.shippingAddress.city,
              street: cartData?.shippingAddress.street,
              zipcode: cartData?.shippingAddress.zipcode,
            },
            customer:cartData?.customer.id,
            product: cartData?.product.id,
            quantity: data.quantity,
            totalAmount: data.totalAmount,
            orderStatus: data.orderStatus,
            paymentStatus: data.paymentStatus,
            paymentMethod: data.paymentMethod,
          },
        });
        if(response.data.success){
          dispatch(addCart(response.data.cart));
          toast.success("edited successfully");
        }
      }
    } catch (error) {
      logout();
    }
  };

  return (
    <div className="w-full h-max flex md:flex-row flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full  flex-col gap-4 mt-4 p-4 ease-in-out md:w-1/2"
      >
        <div className="flex flex-col gap-8 h-max">
          <div className="flex flex-row gap-2 justify-between items-center">
            <div className="flex flex-col gap-1 w-1/2">
              <TextField
              type="number"
                id="quantity"
                label="quantity"
                variant="outlined"
                error={!!errors.quantity}
                helperText={errors.quantity ?errors.quantity.message : ""}
                {...register("quantity", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-1  w-1/2">
              <TextField
                id="totalAmount"
                label="totalAmount"
                variant="outlined"
                error={!!errors.totalAmount}
                helperText={errors.totalAmount ? "totalAmount is required" : ""}
                {...register("totalAmount", { required: true })}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <Box style={{ height: "20px" }} className="text-sm ">
              <FormControl
                variant="standard"
                style={{
                  fontSize: "14px",
                  lineHeight: "10px",
                  height: "20px",
                }}
                className="w-40"
                error={!!errors.orderStatus}
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
            </Box>

            <Box style={{ height: "20px" }} className="text-sm">
              <FormControl
                variant="standard"
                style={{
                  fontSize: "14px",
                  lineHeight: "10px",
                  height: "20px",
                }}
                className="w-40"
                error={!!errors.paymentMethod}
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
            </Box>

            <Box style={{ height: "20px" }} className="text-sm">
              <FormControl
                variant="standard"
                style={{
                  fontSize: "14px",
                  lineHeight: "10px",
                  height: "20px",
                }}
                className="w-40"
                error={!!errors.paymentStatus}
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
                    value={"paid"}
                  >
                    paid
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: "14px", lineHeight: "10px" }}
                    value={"notpaid"}
                  >
                    not paid
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <Button
            type="submit"
            className="bg-blue-500 text-white disabled:bg-gray-500 py-2 rounded"
          >
            Edit
          </Button>
        </div>
      </form>

      <div className=" w-full md:w-1/2 p-4">
        {cartData && (
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <Card sx={{ maxWidth: "100%", padding: "10px" }}>
         
              <CardContent className="flex flex-col gap-2">
                <Typography variant="body1" color="text.secondary">
                  <strong>title:</strong> {cartData.product?.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>quantity:</strong> {cartData.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>TotalAmount:</strong> {cartData.totalAmount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>OrderStatus:</strong> {cartData.orderStatus}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>PaymentMethod:</strong> {cartData.paymentMethod}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>PaymentStatus:</strong> {cartData.paymentStatus}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="small" className="w-full">
                  <Link to="/orders"> Back to Orders Listing</Link>
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default EditOrders;
