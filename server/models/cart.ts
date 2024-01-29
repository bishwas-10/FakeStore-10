import { Document, Schema, model } from "mongoose";
import User from "./users";
import Product from "./product";

export interface CartProps extends Document {
  id: number;
  customerId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
  status: string;
  paidDate: Date;
}

const cartSchema = new Schema<CartProps>({
  id: {
    type: Number,
    required: true,
  },
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
  paidDate: {
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