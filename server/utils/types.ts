import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 15;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const categorySchema = z.object({
  createdAt: z.string().optional(),
  title: z.string({ required_error: "title is required" }),
 
  
  description: z.string({ required_error: "description is required" }),
  image: z.string({ required_error: "image is required" }),
  products: z.array(z.string().min(1,"product id is required")).optional(),
});
export const productSchema = z.object({
  createdAt: z.string().optional(),
  title: z.string({ required_error: "title is required" }),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Price must contain only numeric characters",
    }),
  category: z.string({ required_error: "category is required" }),
  description: z.string({ required_error: "description is required" }),
  image: z.string({ required_error: "image is required" }),
  rating: z.object({
    rate: z
      .string({ required_error: "Rate is required" })
      .min(1, "Rate must be a number")
      .refine((value) => /^\d+(\.\d+)?$/.test(value), {
        message: "Rate must contain only numeric characters",
      }), // Ensure "rate" is validated as a number
    count: z
      .string({ required_error: "Count is required" })
      .min(1, "Count must be a number")
      .refine((value) => /^\d+$/.test(value), {
        message: "Count must contain only numeric characters",
      }), // Ensure "count" is validated as a number
  }),
});

export const customerSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  email: z.string().email().min(1,"email is required"),
  username: z.string().min(1,"username is required"),
  password: z.string().optional(),
  name: z.object({
    firstName: z.string().min(1,"first name is required"),
    lastName: z.string().min(1,"last name is required"),
  }),
  address: z.object({
    city: z.string().min(1,"city is required"),
    street: z.string().optional(),
    zipcode: z.string().optional(),
  }),
  phone: z.string().min(1,"phone is required"),
});

export const CartPropsSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
  quantity:  z
  .string()
  .min(1, "quantity is required")
  .refine((value) => /^\d+$/.test(value), {
    message: "quantity must contain only numeric characters",
  }),
  totalAmount: z
    .string()
    .min(1, "Price is required")
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Price must contain only numeric characters",
    }),
  customer: z.string().min(1,"customer id is required"),
  product: z.string().min(1,"product id is required"),
  shippingAddress: z.object({
    city: z.string().min(1,"city is required"),
    street: z.string().min(1,"street is required"),
    zipcode: z.string().optional(),
  }),
  orderStatus: z.string().min(1,"order status is required"),
  paymentMethod: z.string().min(1,"order method is required"),
  paymentStatus: z.string().min(1,"payment status is required"),
});
