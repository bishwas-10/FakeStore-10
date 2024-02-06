import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { TextField } from "@mui/material";
import { instance } from "../../../api/instance";
import { signInSuccess } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../store/tokenSlice";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

const LoginPage = () => {
    const isSignedIn = useSelector((state:RootState)=>state.user.isSignedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    const response = await instance({
        url:'/users/login',
        method:'POST',
        headers:{
            'Content-Type':'application/json',

        },
        data:{
            email:data.email,
            password:data.password
        }
    });
if(response.data.status){
  
    dispatch(signInSuccess(response.data.user));
    dispatch(setToken(response.data.token));
    navigate("/");
}
  };

  useEffect(()=>{
    if(isSignedIn){
        navigate("/")
    }
  },[])
  return (
    <div className="flex flex-row items-center justify-center w-full h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-1/3 border-1
            border-gray-300 rounded-md shadow-lg p-3"
      >
        <div className="flex flex-col gap-1 ">
          <TextField
            id="email"
            type="email"
            label="email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            {...register("email", { required: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <TextField
            id="password"
            type="password"
            label="password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            {...register("password", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="my-6  w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none focus:bg-blue-600 hover:bg-blue-600"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
