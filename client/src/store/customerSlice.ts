import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../api/instance";
import { TCustomerSchema } from "../components/pages/sub-components/editCustomers";




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
  async (token:string) => {
    const response = await instance({
      url: "/customers",
      method: "GET",
      headers: {
        "Content-type": "application/json",
          authorization: `Bearer ${token}`,
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
        state.status="success";
      }),
      builder.addCase(fetchCustomers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {removeCustomers,addCustomer} = customerSlice.actions;

export default customerSlice.reducer;
