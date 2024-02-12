import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/instance";
import { TCustomerSchema } from "../components/pages/sub-components/editCustomers";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AxiosInstance } from "axios";


interface CustomerStateProps {
  customers: TCustomerSchema[];
  status: "idle" | "loading" | "success" | "failed";
  errorMessage: string | null;
  selectedCustomer: TCustomerSchema | null;
}

const initialState: CustomerStateProps = {
  customers: [],
  status: "idle" || "loading" || "success" || "failed",
  errorMessage: null,
  selectedCustomer:null
};
 const controller = new AbortController();
    
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    console.log("aayena")
   const axiosPrivate = useAxiosPrivate();
    console.log(controller,axiosPrivate)
    const response = await axiosPrivate.get('/customers', {
      signal: controller.signal
  })
  console.log(response,"yo ho")
    return response.data.customers;
  }
);
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    fetchAllCustomers(state,action){
      state.customers=action.payload;
      state.status="success";
    },
    addCustomer(state,action){
      console.log({ ...action.payload })
      state.selectedCustomer = { ...action.payload };

    },
    removeCustomers(state) {
      state.customers = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.status="success";
      }),
      builder.addCase(fetchCustomers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {removeCustomers,addCustomer,fetchAllCustomers} = customerSlice.actions;

export default customerSlice.reducer;
