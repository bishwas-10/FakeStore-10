import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TProductSchema } from "../components/pages/sub-components/add-products";
import { instance } from "../../api/instance";
import { TCategorySchema } from "../components/pages/sub-components/AddCategory";


const addedCategory={
    title: "", 
    description: "",
    image:null,
    products:[]
}

interface CategoryStateProps {
  category: TCategorySchema[];
  status: "idle" | "loading" | "success" | "failed";
  errorMessage: string | null;
  newlyAddedCategory: TCategorySchema | null;
}
const initialState: CategoryStateProps = {
  category: [],
  status: "idle" || "loading" || "success" || "failed",
  errorMessage: null,
  newlyAddedCategory: addedCategory,
};



const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchAllCategories(state,action){
      state.category=action.payload;
      state.status="success";
    },
    addCategory(state, action) {
     state.newlyAddedCategory=action.payload;
    },
    removeCategories(state) {
      state.category = [];
      state.status = "idle";
    },
  },
  
});

export const { addCategory, removeCategories,fetchAllCategories } = categorySlice.actions;

export default categorySlice.reducer;
