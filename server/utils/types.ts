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

export const customerSchema = z.object({
  email:z.string({required_error:"email is required"}),
  username:z.string({required_error:"username is required"}),
  password:z.string(),
  name: z.object({
    firstName:z.string({required_error:"first name is required"}),
    lastName:z.string({required_error:"last name is required"})
  }),
  address:z.object({
    city:z.string({required_error:"city is required"}),
    street:z.string().optional(),
    zipcode:z.string().optional()
  }),
  phone:z.string({required_error:"phone number is required"}),
})


export const CartPropsSchema = z.object({
  quantity:z.number().default(0),
  customerId: z.number({required_error:"customerId is required"}),
  product:
    z.string({required_error:"productId is required"}),
    
  
  status: z.string({required_error:"paid status is required"}),
  addedDate: z.string({required_error:"added date is required"}),
});