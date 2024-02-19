import mongoose, { Document, Schema, model } from "mongoose";
import User from "./users";
import Product from "./product";
import Customer from "./customer";

export interface CartProps extends Document {
  quantity: number;
  totalAmount: string;
  customer: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  shippingAddress: {
    city?: string;
    street?: string;
    zipcode?: string;
  };
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
}

const cartSchema = new Schema<CartProps>(
  {
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: Customer,
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },
    shippingAddress: {
      city: {
        type: String,
        
      },
      street: {
        type: String,
        
      },
      zipcode: String,
    },

    orderStatus: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    paymentMethod: {
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
