import { createSlice } from "@reduxjs/toolkit";
import { TProductSchema } from "../components/pages/sub-components/add-products";


// const initialState:TProductSchema={
//     title: "",
//     price:"",
//     category:"",
//     description: "",
//     image:null,
// }

interface ProductStateProps{
    products:TProductSchema[];
    status:'idle'|'loading'|'success'|'failed',
    errorMessage:string | null;
    newlyAddedProduct:TProductSchema | null;
}

const initialState:ProductStateProps={
    products:[],
    status:'idle'||'loading'||'success'||'failed',
    errorMessage:null,
    newlyAddedProduct:null
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addProduct(state,action){
           console.log(action.payload)
           state.newlyAddedProduct= { ...action.payload}
        }
    }

})

export const{addProduct}= productSlice.actions;

export default productSlice.reducer;