import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TProductSchema } from "../components/pages/sub-components/add-products";
import { instance } from "../api/instance";


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

export const fetchProducts =createAsyncThunk('products/fetchProducts',async()=>{
    const response = await instance({
        url:'/products',
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    })
    return response.data.products;
})

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        addProduct(state,action){
           state.newlyAddedProduct= { ...action.payload}
        },
        removeProducts(state){
            state.products=[];
            state.status='idle'
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending, (state) => {
            // Add user to the state array
            state.status= 'loading'
          }),
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // Add user to the state array
            state.products= action.payload
          }),
           builder.addCase(fetchProducts.rejected, (state) => {
            // Add user to the state array
            state.status= 'failed'
          })
    }

})

export const{addProduct,removeProducts}= productSlice.actions;

export default productSlice.reducer;