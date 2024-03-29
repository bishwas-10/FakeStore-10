import {  createSlice } from "@reduxjs/toolkit";
import { TCartSchema } from "../components/pages/Orders";


interface CartStateProps{
    carts:TCartSchema[];
    checkOutItems:TCartSchema[];
    status:"idle" | "loading" | "success" |"failed";
    errorMessage:string |null;
    selectedCart:TCartSchema |null;
} 

const initialState:CartStateProps = {
  carts: [],
  checkOutItems:[],
  status: "idle",
  errorMessage: null,
  selectedCart: null,
};


const customerSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchAllCarts(state,action){
      state.carts=action.payload;
      state.status="success";
    },
    setCheckOutItems(state,action){
      state.checkOutItems=action.payload;
    },
    addCart(state, action) {
      state.selectedCart = { ...action.payload };
    },
    removeCarts(state) {
      state.carts = [];
      state.status = "idle";
    },
  },
  
});

export const { removeCarts, addCart,fetchAllCarts,setCheckOutItems } = customerSlice.actions;

export default customerSlice.reducer;
