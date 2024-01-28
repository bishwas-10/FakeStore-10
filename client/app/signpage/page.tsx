"use client";
import React, { useEffect, useState } from "react";
import SignIn from "./sign-component/signIn";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  signInFailure,
  signInSuccess,
} from "@/store/userSlice";
import { setToken } from "@/store/tokenSlice";
import { ToastContainer, toast } from "react-toastify";
const Page = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white  dark:bg-black py-10 px-10  flex items-center justify-center">
      <div className="flex md:flex-row rounded-md    flex-col  h-max">
        
        <div className="h-max dark:bg-black p-5  bg-white border-2 border-gray-400">
          <SignIn />
        </div>
      </div>
      <ToastContainer autoClose={600} />
    </div>
  );
};

export default Page;

