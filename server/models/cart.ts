import mongoose, { Document, Schema, model } from "mongoose";
import User from "./users";
import Product from "./product";

export interface CartProps extends Document {
  quantity: number;
  customerId: number;
  product: mongoose.Schema.Types.ObjectId;
  status: string;
  addedDate: String;
}

const cartSchema = new Schema<CartProps>(
  {
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    customerId: {
      type: Number,
      ref: User,
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },

    addedDate: {
      type: String,
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
  }
);

const Cart = model<CartProps>("cart", cartSchema);
export default Cart;
