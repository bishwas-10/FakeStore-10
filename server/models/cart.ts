import { Document, Schema, model } from "mongoose";
import User from "./users";
import Product from "./product";

export interface CartProps extends Document {
  customerId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
  status: string;
  addedDate: Date;
}

const cartSchema = new Schema<CartProps>({
 
  customerId: {
    type: Schema.Types.Number,
    ref: User,
    required: true,
  },

  products: [
    {
      productId: {
        type: Schema.Types.Number,
        ref: Product,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  addedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
});


const Cart = model<CartProps>('cart', cartSchema);
export default Cart;