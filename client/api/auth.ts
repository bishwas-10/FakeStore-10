import axios from "axios";

import { instance } from "./instance";
import { TSignInShema } from "@/app/signpage/sign-component/signIn";



export const getUser = async (token: string) => {
  try {
    const { data } = await instance.get("/", {
      headers: { Accept: "application/json", authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log("error getting user", error);
  }
};

export const userLogin = async (formData: TSignInShema) => {
  try {
    const { data } = await instance.post("/login", formData);
    
    return data;
  }  catch (error:any) {
    return error.response.data;
    
   }
};


export const userLogOut = async () => {
  try {
    const {data} = await instance.get("/users/signout");
    return data;
  
  } catch (error) {
    console.log(error)
  }
};