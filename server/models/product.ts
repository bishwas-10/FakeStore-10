import {model, Schema , Document} from "mongoose";

export interface ProductProps extends Document {
    title:string;
    price:number;
    category?:string;
    description?:string;
    image:string;
    rating?:{
        rate:string;
        count?:number;
    }
}


const productSchema = new Schema<ProductProps>({

    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
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
    },
    rating:{
        rate:String,
        count:Number,
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
})

const Product = model<ProductProps>('product', productSchema);

export default Product;