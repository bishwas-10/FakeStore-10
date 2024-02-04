import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../api/instance";
import { z } from "zod";

export const customerSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  addedAt: z.string().optional(),
  email: z.string({ required_error: "email is required" }),
  username: z.string({ required_error: "username is required" }),
  password: z.string(),
  name: z.object({
    firstName: z.string({ required_error: "first name is required" }),
    lastName: z.string({ required_error: "last name is required" }),
  }),
  address: z.object({
    city: z.string({ required_error: "city is required" }),
    street: z.string().optional(),
    zipcode: z.string().optional(),
  }),
  phone: z.string({ required_error: "phone number is required" }),
});

export type TCustomerSchema = z.infer<typeof customerSchema>;

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
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await instance({
      url: "/customers",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.customers;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer(state,action){
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
      }),
      builder.addCase(fetchCustomers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {removeCustomers,addCustomer} = customerSlice.actions;

export default customerSlice.reducer;
