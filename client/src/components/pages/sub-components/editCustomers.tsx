import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { axiosPrivate, instance } from "../../../api/instance";
import { z } from "zod";
import { addCustomer } from "../../../store/customerSlice";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
export const customerSchema = z.object({
    id: z.string().optional(),
    updatedAt: z.string().optional(),
    addedAt: z.string().optional(),
    email: z.string().email().min(1,"email is required"),
    username: z.string().min(1,"username is required"),
    password: z.string().optional(),
    name: z.object({
      firstName: z.string().min(1,"first name is required"),
      lastName: z.string().min(1,"last name is required"),
    }),
    address: z.object({
      city: z.string().min(1,"city is required"),
      street: z.string().optional(),
      zipcode: z.string().optional(),
    }),
    phone: z.string().min(1,"phone is required"),
  });
  
  export type TCustomerSchema = z.infer<typeof customerSchema>;

const EditCustomers = () => {
  const {auth}= useAuth();
  const dispatch =useDispatch();
  const token = useSelector((state:RootState)=>state.token.token);
  const customer = useSelector(
    (state: RootState) => state.customer.selectedCustomer
  );

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<TCustomerSchema>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      email: customer?.email,
      username: customer?.username,
      name: {
        firstName: customer?.name.firstName,
        lastName: customer?.name.lastName,
      },
      address: {
        city: customer?.address.city,
        street: customer?.address.street,
        zipcode: customer?.address.zipcode,
      },
      phone: customer?.phone,
    },
  });
  const onSubmit = async (data: TCustomerSchema) => {
    if (customer?.id) {
      const response = await axiosPrivate({
        url: `/customers/${customer.id}`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
            authorization: `Bearer ${auth.token}`,
        },
      
        data: {
          email: data.email,
          username: data.username,

          name: {
            firstName: data.name.firstName,
            lastName: data.name.lastName,
          },
          address: {
            city: data.address.city,
            street: data.address?.street,
            zipcode: data.address?.zipcode,
          },
          phone: data.phone,
        },
      });
      if(response.data.success){
        dispatch(addCustomer(response.data.customer));
        toast.success(response.data.message);
      }
    }
  };

  return (
    <div className="w-full h-max flex md:flex-row flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full  flex-col gap-4 mt-4 p-4 ease-in-out md:w-1/2"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-between items-center">
            <div className="flex flex-col gap-1 w-1/2">
              <TextField
                id="email"
                label="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? "email is required" : ""}
                {...register("email", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-1  w-1/2">
              <TextField
                id="username"
                label="username"
                variant="outlined"
                error={!!errors.username}
                helperText={errors.username ? "username is required" : ""}
                {...register("username", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-between items-center">
            <div className="flex flex-col gap-1  w-1/2">
              <TextField
                id="firstName"
                label="firstName"
                variant="outlined"
                error={!!errors.name?.firstName}
                helperText={
                  errors.name?.firstName ? "firstname is required" : ""
                }
                {...register("name.firstName", { required: true })}
              />
            </div>{" "}
            <div className="flex flex-col gap-1  w-1/2">
              <TextField
                id="lastName"
                label="lastName"
                variant="outlined"
                error={!!errors.name?.lastName}
                helperText={errors.name?.lastName ? "lastName is required" : ""}
                {...register("name.lastName", { required: true })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <TextField
              id="city"
              label="city"
              variant="outlined"
              error={!!errors.address?.city}
              helperText={errors.address?.city ? "city is required" : ""}
              {...register("address.city", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <TextField
              id="street"
              label="street"
              variant="outlined"
              {...register("address.street")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <TextField
              id="zipcode"
              label="zipcode"
              variant="outlined"
              {...register("address.zipcode")}
            />
          </div>
         
          <div className="flex flex-col gap-1">
            <TextField
              id="phone"
              label="phone"
              variant="outlined"
              error={!!errors.phone} // Set error prop based on the presence of errors
              helperText={errors.phone ? "phone is required" : ""} // Display error message if there are errors
              {...register("phone", { required: true })}
            />
          </div>{" "}
          <Button
            type="submit"
            className="bg-blue-500 text-white disabled:bg-gray-500 py-2 rounded"
          >
            Edit
          </Button>
        </div>
      </form>

      <div className=" w-full md:w-1/2 p-4">
        {customer && (
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <Card sx={{ maxWidth: "100%", padding: "10px" }}>
              <CardContent className="flex flex-col gap-2">
                <Typography variant="body1" color="text.secondary">
                  <strong>Username:</strong> {customer.username}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Email:</strong> {customer.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>FirstName:</strong> {customer.name.firstName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>LastName:</strong> {customer.name.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>City:</strong> {customer.address.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Sreet:</strong> {customer.address?.street}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Zipcode:</strong> {customer.address?.zipcode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Phone:</strong> {customer.phone}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="small" className="w-full">
                  <Link to="/customers"> Back to Customer Listing</Link>
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

export default EditCustomers;
