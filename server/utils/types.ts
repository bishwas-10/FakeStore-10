import * as z from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 15;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const productSchema = z.object({
    title:z.string({required_error:"title is required"}),
    price:z.number({required_error:"price is required"}),
    category:z.string().optional(),
    description:z.string().optional(),
    image:z
    .string({required_error:"image is required"})
    ,
});



export const CartPropsSchema = z.object({
  customerId: z.number({required_error:"customerId is required"}),
  products: z.array(
    z.object({
      productId: z.number({required_error:"productId is required"}),
      quantity: z.number().default(0),
    })
  ),
  status: z.string({required_error:"paid status is required"}),
  addedDate: z.string({required_error:"added date is required"}),
});