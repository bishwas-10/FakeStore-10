import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../api/instance";
import { TCartSchema } from "../components/pages/Orders";


interface CartStateProps{
    carts:TCartSchema[];
    status:"idle" | "loading" | "success" | "failed";
    errorMessage:string |null;
    selectedCart:TCartSchema |null;
} 

const initialState:CartStateProps = {
  carts: [],
  status: "idle",
  errorMessage: null,
  selectedCart: null,
};

export const fetchCarts = createAsyncThunk("customers/fetchCarts", async (token:string) => {
  const response = await instance({
    url: "/carts",
    method: "GET",
    headers: {
      "Content-type": "application/json",
        authorization: `Bearer ${token}`,
    },
  });
 if(response.data.success){
    return response.data.cart;
 }

});

const customerSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      state.selectedCart = { ...action.payload };
    },
    removeCarts(state) {
      state.carts = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.status="success";
      }),
      builder.addCase(fetchCarts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { removeCarts, addCart } = customerSlice.actions;

export default customerSlice.reducer;
