import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLabel } from "@mui/material";
export const productSchema = z.object({
  title: z.string({ required_error: "title is required" }),
  price: z.string({ required_error: "price is required" }),
  category: z.string().optional(),
  description: z.string().optional(),
//   image: z.object({
//     url: z.string().url(),
//     alt: z.string(),
//     width: z.number().int(),
//     height: z.number().int(),
//   }),
});

export type TProductSchema = z.infer<typeof productSchema>;

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: TProductSchema) => {
    console.log("aayo")
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 mt-4 ease-in-out"
      >
        <div className="flex flex-col gap-2 w-[100%]">
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="title">title</FormLabel>
            <input
              type="text"
              id="title"
              className="px-4 py-2 rounded"
              // onChange={(e) => handleInputChange("projectTitle", e.target.value)}
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="category">category</FormLabel>
            <input
              type="string"
              id="category"
              className="px-4 py-2 rounded"
              // onChange={(e) => handleInputChange("projectTitle", e.target.value)}
              {...register("category", { required: true })}
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
      
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="price">price</FormLabel>
            <input
              type="text"
              id="price"
              className="px-4 py-2 rounded"
              // onChange={(e) => handleInputChange("projectTitle", e.target.value)}
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="description">Description</FormLabel>
            <textarea
              id="description"
              rows={6}
              cols={50}
              placeholder="Enter description..."
              className="w-full px-3 py-2 border rounded-md bg text-gray-700 
              leading-tight focus:outline-none focus:shadow-outline"
              //onChange={(e) => handleInputChange("description", e.target.value)}
              {...register("description")}
            ></textarea>
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          {/* <div className="flex flex-col gap-1">
            <FormLabel htmlFor="image">Image</FormLabel>
            <input
              type="file"
              id="image"
              className="px-4 py-2 rounded"
              // onChange={(e) => handleInputChange("projectTitle", e.target.value)}
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-500">{errors.image.message}</span>
            )}
          </div> */}
        </div>

        {/* Existing email, password, confirmPassword inputs */}
        {/* ... */}

        <button
          type="submit"
          className="bg-blue-500 text-white disabled:bg-gray-500 py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
