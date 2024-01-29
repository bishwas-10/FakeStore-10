import {model, Schema , Document} from "mongoose";

export interface ProductProps extends Document {
    id:number;
    title:string;
    price:string;
    category?:string;
    description?:string;
    image:string;
}


const productSchema = new Schema<ProductProps>({
    id:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    category:{
        type:String,
    },
    image:{
        type:String,
        required:true
    }
})

const Product = model<ProductProps>('product', productSchema);

export default Product;