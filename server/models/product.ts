import {model, Schema , Document} from "mongoose";

export interface ProductProps extends Document {
    title:string;
    price:number;
    category:string;
    description:string;
    image:string;
    rating:{
        rate:string;
        count:string;
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
        rate:{
            type:String,
            required:true
        },
        count:{
            type:String,
            required:true
        },
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
})

const Product = model<ProductProps>('product', productSchema);

export default Product;