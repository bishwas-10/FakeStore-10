import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormLabel, TextField } from "@mui/material";
import { Image, UploadIcon } from "lucide-react";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const productSchema = z.object({
  title: z.string().min(1,"title is required"),
  price: z.string().min(1,"title is required"),
  category: z.string().min(1,"title is required"),
  description: z.string().min(1,"title is required"),
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type TProductSchema = z.infer<typeof productSchema>;

const AddProducts = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      
      image: selectedFile,
    },
    reValidateMode: "onChange",
  });
console.log(errors)
  const onSubmit = async (data: TProductSchema) => {
    console.log("aayo");
    console.log(data);
  };

  return (
    <div className=" w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-4 ease-in-out w-[50%]"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <TextField
              id="title"
              label="title"
              variant="outlined"
              error={!!errors.title} 
              helperText={errors.title ? "title is required" : ""}
              {...register("title", { required: true })}
            />

           
          </div>
          <div className="flex flex-col gap-1">
            <TextField
              id="category"
              label="category"
              variant="outlined"
              error={!!errors.category} 
              helperText={errors.category ? "category is required" : ""}
              {...register("category", { required: true })}
            />

            
          </div>

          <div className="flex flex-col gap-1">
            <TextField
              id="price"
              label="price"
              variant="outlined"
              error={!!errors.price} 
              helperText={errors.price ? "Price is required" : ""}
              {...register("price", { required: true })}
            />

           
          </div>
          <div className="flex flex-col gap-1">
            <TextField
           
              id="description"
              label="description"
              variant="outlined"
              multiline
              maxRows={4}
              error={!!errors.description} // Set error prop based on the presence of errors
              helperText={errors.description ? "Description is required" : ""} // Display error message if there are errors
              {...register("description", { required: true })}
              
            />

          </div>
          <div className="flex flex-col gap-1">
            <div>
              <Button variant="outlined">
                <input
                  type="file"
                  className="hidden"
                  id="fileInput"
                  onChange={handleFileChange}
                  
                />
                <FormLabel htmlFor="fileInput" className="flex flex-row gap-2 items-center">
                  <UploadIcon />
                  <span className="whitespace-nowrap text-sm">choose your image</span>
                </FormLabel>
              </Button>
              {selectedFile && (
        <div className="flex items-center gap-2">
          <span>Selected file: {selectedFile.name}</span>
          {/* You can add a button to remove the selected file if needed */}
        </div>
      )}
              {errors.image && (
                <span className="text-red-500">error uploading file</span>
              )}
              
            </div>
          </div>
        </div>
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
