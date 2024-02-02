import { createSlice } from "@reduxjs/toolkit";
import { TProductSchema } from "../components/pages/sub-components/add-products";


const initialState:TProductSchema={
    title: "",
    price:"",
    category:"",
    description: "",
    image:null,
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addProduct(state,action){
            console.log(action.payload)
           return {...state, ...action.payload}
        }
    }

})

export const{addProduct}= productSlice.actions;

export default productSlice.reducer;