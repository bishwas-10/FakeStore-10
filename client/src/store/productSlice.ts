import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TProductSchema } from "../components/pages/sub-components/add-products";
import { instance } from "../api/instance";


const addedProduct={
    title: "",
    price:'',
    category:"",
    description: "",
    image:null,
    rating:{
        rate:'',
        count:''
    }
}

interface ProductStateProps {
  products: TProductSchema[];
  status: "idle" | "loading" | "success" | "failed";
  errorMessage: string | null;
  newlyAddedProduct: TProductSchema | null;
}
const initialState: ProductStateProps = {
  products: [],
  status: "idle" || "loading" || "success" || "failed",
  errorMessage: null,
  newlyAddedProduct: addedProduct,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (token:string) => {
    const response = await instance({
      url: "/products",
      method: "GET",
      headers: {
        "Content-type": "application/json",
          authorization: `Bearer ${token}`,
      },
    });
    return response.data.products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.newlyAddedProduct = { ...action.payload };
    },
    removeProducts(state) {
      state.products = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status="success";
      }),
      builder.addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addProduct, removeProducts } = productSlice.actions;

export default productSlice.reducer;
