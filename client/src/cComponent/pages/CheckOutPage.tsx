import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { RootState } from "../../store/store";
import useAuth from "../../../hooks/useAuth";
import { UserInfoProps } from "../../context/AuthProvider";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { AxiosInstance } from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import Loading from "../reusable/Loading";
import { TCustomerSchema } from "../../components/pages/sub-components/editCustomers";
import { ToastContainer, toast } from "react-toastify";

import {  useNavigate } from "react-router-dom";
import { setCheckOutItems } from "../../store/cartSlice";

export const shippingAddressSchema = z.object({
  city: z.string().min(1, "city is required"),
  street: z.string().min(1, "street is required"),
  zipcode: z.string().min(1, "zipcode is required"),
});
export type TShippingAddressSchema = z.infer<typeof shippingAddressSchema>;

const getCustomerDetails = async (
  userId: string,
  axiosPrivate: AxiosInstance
) => {
  try {
    const response = await axiosPrivate({
      url: `/customers/${userId}`,
      method: "GET",
    });

    return response.data.customer;
  } catch (error) {
    throw new Error("Failed to fetch cart data");
  }
};
const CheckOutPage = () => {
  const checkOutItems = useSelector(
    (state: RootState) => state.cart.checkOutItems
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addressAdded, setAddressAdded] = useState<boolean>(false);
  const { auth } = useAuth();
  const decoded: UserInfoProps | undefined = auth.token
    ? (jwtDecode<JwtPayload>(auth.token as string) as UserInfoProps)
    : undefined;
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, data, error, isError } =
    useQuery<TCustomerSchema>({
      queryKey: ["customerDetailById"],
      queryFn: () =>
        getCustomerDetails(decoded?.UserInfo.userId as string, axiosPrivate),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
  });
  const [value, setValue] = useState<"onsite" | "online">("online");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as "onsite" | "online");
  };
  const onSubmit = async (data: TShippingAddressSchema) => {

    try {
      const response = await axiosPrivate({
        url:
          checkOutItems.length > 1
            ? `/carts/checkoutaddress/${decoded?.UserInfo.userId}`
            : `/carts/updateoneaddress/${checkOutItems[0].id}`,
        method: "PATCH",
        data: {
          shippingAddress: {
            city: data.city,
            street: data.street,
            zipcode: data.zipcode,
          },
        },
      });

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });
        setAddressAdded(true);
        dispatch(setCheckOutItems(response.data.cart))
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <span>
        Error occured 404
        <p className="text-md font-medium ">{error.message}</p>{" "}
      </span>
    );
  }
  return (
    <Box
      sx={{ bgcolor: "background.paper" }}
      className="w-full h-max p-6 flex flex-col md:flex-row gap-6 min-h-screen"
    >
      <Box
        sx={{ bgcolor: "background.default" }}
        className="w-full md:w-2/3 p-4 border border-gray-200 h-max"
      >
        <Typography fontSize={"27px"} fontWeight={"600"}>
          Information related to Order
        </Typography>
        {checkOutItems.length === 0 ? (
          <Box className="py-4 flex flex-col">
             <Typography fontSize={"20px"} fontWeight={"500"}>
           Please go back to cartpage and checkout items!
          </Typography>
          <Button variant="contained" onClick={()=>navigate(`/carts/${decoded?.UserInfo.userId}`)}>
            Back to Cart Page
          </Button>
          </Box>
        ) : (
          <Box className="flex flex-col gap-4 w-full ">
            <Box className="flex flex-col md:flex-row w-full">
              <Box className="flex flex-col gap-4 w-full md:w-1/2">
                <Typography fontSize={"16px"} fontWeight={"500"}>
                  The personal informations of customer:{" "}
                </Typography>
                <Box className="flex flex-col  gap-4 ">
                  <Box className="flex flex-row items-center gap-2">
                    Full Name:
                    <Typography fontSize={"18px"} fontWeight={"500"}>
                      {data?.name.firstName} {data?.name.lastName}
                    </Typography>
                  </Box>

                  <Box className="flex flex-row items-center gap-2">
                    Email:
                    <Typography fontSize={"18px"} fontWeight={"500"}>
                      {data?.email}
                    </Typography>
                  </Box>

                  <Box className="flex flex-row items-center gap-2">
                    Phone:
                    <Typography fontSize={"18px"} fontWeight={"500"}>
                      {data?.phone}
                    </Typography>
                  </Box>

                  <Box className="flex flex-row items-start gap-2">
                    Address:
                    <Typography fontSize={"18px"} fontWeight={"500"}>
                      {data?.address.city}
                      <br />
                      {data?.address.street}
                      <br />
                      {data?.address?.zipcode}
                      <br />
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="w-full md:w-1/2 flex flex-col gap-4  ">
                <Typography fontSize={"17px"} fontWeight={"600"}>
                  Shipping Address
                </Typography>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4 items-center"
                >
                  <div className="flex flex-col w-full gap-4">
                    <TextField
                      id="city"
                      type="text"
                      label="City"
                      variant="outlined"
                      error={!!errors.city}
                      helperText={errors.city ? errors.city.message : ""}
                      {...register("city", { required: true })}
                    />
                    <TextField
                      id="street"
                      type="text"
                      label="Street"
                      variant="outlined"
                      error={!!errors.street}
                      helperText={errors.street ? errors.street.message : ""}
                      {...register("street", { required: true })}
                    />
                    <TextField
                      id="zipcode"
                      type="number"
                      label="Zipcode"
                      variant="outlined"
                      error={!!errors.zipcode}
                      helperText={errors.zipcode ? errors.zipcode.message : ""}
                      {...register("zipcode", { required: true })}
                    />
                  </div>
                  <Button type="submit" variant="contained">
                    Set Your Shipping Address
                  </Button>
                </form>
              </Box>
            </Box>
            {addressAdded && (
              <Box className="flex flex-col  gap-2">
                <Typography fontSize={"24px"} fontWeight={"600"}>
                  Payment Method
                </Typography>
                <Box className="flex flex-row justify-between items-center">
                  <FormControl>
                    <FormLabel>Method</FormLabel>
                    <RadioGroup
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="onsite"
                        control={<Radio />}
                        label="On Site"
                      />
                      <FormControlLabel
                        value="online"
                        control={<Radio />}
                        label="Online"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button onClick={()=>navigate("stripe")} variant="contained">Order Now</Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box
        sx={{ bgcolor: "background.default" }}
        className="w-full md:w-1/3 flex flex-col gap-2 p-4 h-max"
      >
        <Box
          sx={{ bgcolor: "background.paper" }}
          className="flex flex-col py-4 gap-2 items-center "
        >
          <Typography fontSize={"27px"} fontWeight={"600"}>
            Your Total
          </Typography>
          <Box className="flex flex-col  gap-2  items-center w-max text-xl font-medium ">
            <span className="flex flex-row items-center w-full">
              Total Products:
              <Typography
                fontSize={"20px"}
                fontWeight={"600"}
                color={"text.textSecondary"}
              >
                {checkOutItems
                  ?.map((item) =>
                    item.paymentStatus === "not paid"
                      ? parseInt(item.quantity)
                      : 0
                  )
                  .reduce((acc, curr) => acc + curr, 0)}
              </Typography>
            </span>
            <span className="flex flex-row items-center w-full">
              Total Price:{" "}
              <Typography
                fontSize={"20px"}
                fontWeight={"600"}
                color={"text.textSecondary"}
              >
                $
                {checkOutItems
                  ?.map((item) =>
                    item.paymentStatus === "not paid"
                      ? parseInt(item.quantity) * parseInt(item.totalAmount)
                      : 0
                  )
                  .reduce((acc, curr) => acc + curr, 0)}
              </Typography>
            </span>
          </Box>
        </Box>
        {checkOutItems?.map((item, index) => {
          return (
            <div
              key={index}
              className=" flex flex-col items-start  w-full px-4 py-2  border-gray-400 border-2  "
            >
              <p className="text-xl font-semibold pt-2 text-[#8A8888]">
                {item.product?.title}
              </p>
              <Box className="flex flex-row w-full items-center justify-between">
                <Box>
                  <Typography
                    fontSize={"25px"}
                    fontWeight={"600"}
                    color={"text.textSecondary"}
                  >
                    ${item.totalAmount}
                    <span className="text-xs">per product</span>
                  </Typography>
                  <Typography
                    fontSize={"25px"}
                    fontWeight={"600"}
                    color={"text.textSecondary"}
                  >
                    <span className="text-xs">total</span> $
                    {parseInt(item.totalAmount) * parseInt(item.quantity)}
                  </Typography>
                </Box>
                <Typography
                  fontSize={"25px"}
                  fontWeight={"600"}
                  color={"text.textSecondary"}
                >
                  <span className="text-xs">quantity</span>
                  {parseInt(item.quantity)}
                </Typography>
              </Box>
            </div>
          );
        })}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CheckOutPage;
