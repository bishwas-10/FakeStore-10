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