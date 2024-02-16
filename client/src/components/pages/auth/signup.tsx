import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { instance } from "../../../../api/instance";
import useAuth from "../../../../hooks/useAuth";
const signUpSchema = z
  .object({
    username: z.string({ required_error: "username is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    password: z
      .string({ required_error: "password is required" })
      .min(8)
      .max(16)
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(
            value
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol",
        }
      ),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .min(8)
      .max(16),
    name: z.object({
      firstName: z.string().min(1, "first name is required"),
      lastName: z.string().min(1, "last name is required"),
    }),
    address: z.object({
      city: z.string().min(1, "city is required"),
      street: z.string().optional(),
      zipcode: z.string().optional(),
    }),
    phone: z.string().min(1, "phone is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["password"],
    message: "Password and confirm password must match",
  });
type TSignUpSchema = z.infer<typeof signUpSchema>;
const SignUpPage = () => {
  const { auth } = useAuth();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });
  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
   
    try {
      const response = await instance({
        url: "/users/signup",
        method: "POST",
        headers:{
          'Content-Type':'application/json',
    
      },
        data: {
          username: data.username,
          email: data.email,
          name:{
            firstName:data.name.firstName,
            lastName:data.name.lastName,
          },
          address:{
            city:data.address.city,
            street:data.address.street,
            zipcode:data.address.zipcode,
          },
          phone:data.phone,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
      });
      console.log(response)
      if (response.data.success) {
        reset();
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error)
      setErrMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    if (auth.token) {
      navigate(from, { replace: true });
    }
  }, [auth.token]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className="flex  items-center justify-center w-full h-max py-10">
      <div className="flex flex-col w-3/4 md:w-2/5">
        <Link
          to="/"
          className="flex w-full flex-row items-center justify-center text-lg md:text-xl font-semibold tracking-wider  dark:text-gray-500"
        >
          Fake
          <span className="text-yellow-600">Store</span>
          <ShoppingBag className="text-2xl mx-1" />
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full border-2 mt-4
          border-gray-300 rounded-md shadow-lg p-8"
        >
          <h1 className="text-2xl font-medium dark:text-gray-500 ">Sign Up</h1>
          <div className="flex flex-col gap-1 ">
            <TextField
              id="username"
              inputRef={inputRef}
              label="username"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
              {...register("username", { required: true })}
            />
          </div>
          <div className="flex flex-row gap-2 ">
            <TextField
              id="firstname"
              type="text"
              label="firstName"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.name?.firstName}
              helperText={
                errors.name?.firstName ? errors.name.firstName.message : ""
              }
              {...register("name.firstName", { required: true })}
            />
            <TextField
              id="lastname"
              type="text"
              label="lastName"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.name?.lastName}
              helperText={
                errors.name?.lastName ? errors.name.lastName.message : ""
              }
              {...register("name.lastName", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <TextField
              id="email"
              type="email"
              label="email"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              {...register("email", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <TextField
              id="phone"
              type="number"
              label="phone"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ""}
              {...register("phone", { required: true })}
            />
          </div>
          <div className="flex flex-row gap-1">
            <TextField
              id="city"
              type="text"
              label="City"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.address?.city}
              helperText={
                errors.address?.city ? errors.address.city.message : ""
              }
              {...register("address.city", { required: true })}
            />
            <TextField
              id="street"
              type="text"
              label="Street"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.address?.street}
              helperText={
                errors.address?.street ? errors.address.street.message : ""
              }
              {...register("address.street", { required: true })}
            />
            <TextField
              id="zipcode"
              type="number"
              label="Zipcode"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.address?.zipcode}
              helperText={
                errors.address?.zipcode ? errors.address.zipcode.message : ""
              }
              {...register("address.zipcode", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <TextField
              id="password"
              type="password"
              label="password"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              {...register("password", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <TextField
              id="confirmPassword"
              type="password"
              label="confirmPassword"
              variant="outlined"
              onFocus={() => setErrMsg(null)}
              error={!!errors.password}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
              {...register("confirmPassword", { required: true })}
            />
          </div>
          {errMsg && <span className="text-red-500">{errMsg}</span>}

          <Button
            type="submit"
            variant="contained"
            className="  w-full  py-2 rounded-md "
          >
            Sign up
          </Button>
        </form>
        <div className="flex flex-col items-center mt-6 w-full">
          <span
            className="text-gray-400 text-xs my-2 flex
       flex-row items-center w-full"
          >
            <span className="flex-grow border-2 w-full border-gray-300 dark:border-gray-400" />
            <span className="flex-grow w-full text-center  border-gray-400">
              already have an account?
            </span>
            <span className="flex-grow border-2 w-full border-gray-300 dark:border-gray-400" />
          </span>
          <Button
          variant="outlined"
            onClick={()=>navigate("/login")}
            className="w-full mt-2 py-1  border-2 shadow-md text-center"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
