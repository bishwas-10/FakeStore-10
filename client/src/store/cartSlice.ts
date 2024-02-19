import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/instance";
import { TCartSchema } from "../components/pages/Orders";


interface CartStateProps{
    carts:TCartSchema[];
    status:"idle" | "loading" | "success" |"failed";
    errorMessage:string |null;
    selectedCart:TCartSchema |null;
} 

const initialState:CartStateProps = {
  carts: [],
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
    addCart(state, action) {
      state.selectedCart = { ...action.payload };
    },
    removeCarts(state) {
      state.carts = [];
      state.status = "idle";
    },
  },
  
});

export const { removeCarts, addCart,fetchAllCarts } = customerSlice.actions;

export default customerSlice.reducer;
