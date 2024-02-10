import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { TextField } from "@mui/material";
import { instance } from "../../../api/instance";
import { jwtDecode } from "jwt-decode";
import { signInSuccess } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../store/tokenSlice";
import { RootState } from "../../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
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
  const {auth, setAuth, persist, setPersist } = useAuth();
 console.log(auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    const response = await instance({
      url: "/users/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: data.email,
        password: data.password,
      },
    });
    if (response.data.success) {
      console.log(response.data);
      setAuth({ token: response.data.accessToken });
      // dispatch(signInSuccess(response.data.user));
      // dispatch(setToken(response.data.token));
      navigate("/customers");
    }
  };
  const togglePersist = () => {
    setPersist((prevPersist) => ({
      ...prevPersist,
      persist: !prevPersist.persist,
    }));
  };
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  useEffect(() => {
    if (auth.token) {
      navigate(from, { replace: true });
    }
  }, [auth.token]);
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
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist?.persist as boolean}
          />
          <label htmlFor="persist">Trust This Device</label>
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
