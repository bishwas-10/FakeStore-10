import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button, TextField } from "@mui/material";
import { instance } from "../../../../api/instance";
import { jwtDecode } from "jwt-decode";
import { signInSuccess } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../store/tokenSlice";
import { RootState } from "../../../store/store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { ShoppingBag } from "lucide-react";
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

  const { auth, setAuth, persist, setPersist } = useAuth();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    try {
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
        console.log(response)
        setAuth({ token: response.data.accessToken });

        navigate(from, { replace: true });
      }
    } catch (error: any) {
      setErrMsg(error.response.data.message);
    }
  };
  const togglePersist = () => {
    setPersist((prevPersist) => ({
      ...prevPersist,
      persist: !prevPersist.persist,
    }));
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);
  useEffect(() => {
    if (auth.token) {
      navigate(from, { replace: true });
    }
  }, [auth.token]);
  const inputRef = useRef<HTMLInputElement>(null);;
  useEffect(()=>{
    if(inputRef.current){
     inputRef.current.focus() ;
    }
    
  },[])
  return (
    <div className="flex  items-center justify-center w-full h-screen">
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
          <h1 className="text-2xl font-medium dark:text-gray-500 ">Sign In</h1>
          <div className="flex flex-col gap-1 ">
            <TextField
            inputRef={inputRef}
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
          {errMsg && <span className="text-red-500">{errMsg}</span>}

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
            className="  w-full bg-yellow-500 text-white py-2 rounded-md focus:outline-none focus:bg-yellow-600 hover:bg-yellow-600"
          >
            Sign in
          </button>
        </form>
        <div className="flex flex-col items-center mt-6 w-full">
          <span
            className="text-gray-400 text-xs my-2 flex
         flex-row items-center w-full"
          >
            <span className="flex-grow border-2 w-full border-gray-300 dark:border-gray-400" />
            <span className="flex-grow w-80 text-center  border-gray-400">
              New to FakeStore?
            </span>
            <span className="flex-grow border-2 w-full border-gray-300 dark:border-gray-400" />
          </span>
          <Link to={'/signup'} className="w-full mt-2 py-1  border-2 shadow-md hover:bg-gray-200 transition-all text-center">Create your FakeStore Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
