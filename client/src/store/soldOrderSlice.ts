import { createSlice } from "@reduxjs/toolkit";

import { TCartSchema } from "../components/pages/Orders";

interface CartStateProps {
  orders: TCartSchema[];
  status: "idle" | "loading" | "success" | "failed";
  errorMessage: string | null;
  selectedCart: TCartSchema | null;
  totalRevenue: number;
  totalSales: number;
}

const initialState: CartStateProps = {
  orders: [],
  status: "idle",
  errorMessage: null,
  selectedCart: null,
  totalRevenue: 0,
  totalSales: 0,
};

const soldOrderSlice = createSlice({
  name: "sold-order",
  initialState,
  reducers: {
    fetchAllOrders(state, action) {
      const allOrder = action.payload;
      let arr  = allOrder.map(
        (order: TCartSchema) => order.paymentStatus ==="paid" ?
         parseInt(order.quantity) * parseInt(order.totalAmount) :0
     );
     state.totalRevenue = arr.reduce((total:number, currentValue:number) => total + currentValue, 0);
    
      
      let quant = allOrder.map(
        (order: TCartSchema) =>  order.paymentStatus ==="paid" ?
         parseInt(order.quantity) :0
      );
      state.totalSales = quant.reduce((total:number, currentValue:number) => total + currentValue, 0);

      state.orders = action.payload;

      state.status = "success";
    },
  },
});

export const { fetchAllOrders } = soldOrderSlice.actions;

export default soldOrderSlice.reducer;
