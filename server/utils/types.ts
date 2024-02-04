import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 15;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const productSchema = z.object({
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
  email: z.string({ required_error: "email is required" }),
  username: z.string({ required_error: "username is required" }),
  password: z.string(),
  name: z.object({
    firstName: z.string({ required_error: "first name is required" }),
    lastName: z.string({ required_error: "last name is required" }),
  }),
  address: z.object({
    city: z.string({ required_error: "city is required" }),
    street: z.string().optional(),
    zipcode: z.string().optional(),
  }),
  phone: z.string({ required_error: "phone number is required" }),
});

export const CartPropsSchema = z.object({
  quantity: z.number().default(0),
  customerId: z.number({ required_error: "customerId is required" }),
  product: z.string({ required_error: "productId is required" }),

  status: z.string({ required_error: "paid status is required" }),
  addedDate: z.string({ required_error: "added date is required" }),
});
