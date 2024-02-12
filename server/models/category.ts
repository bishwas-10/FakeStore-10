import mongoose, {model, Schema , Document} from "mongoose";
import Product from "./product";

export interface CategoryProps extends Document {
    title:string;
    description:string;
    image:string;
    products: mongoose.Schema.Types.ObjectId[];
}


const categorySchema = new Schema<CategoryProps>({

    title:{
        type:String,
        required:true,
    },
  
    description:{
        type:String
    },
  
    image:{
        type:String,
        required:true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: Product,
        
    }]
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
})

const Category = model<CategoryProps>('category', categorySchema);

export default Category;