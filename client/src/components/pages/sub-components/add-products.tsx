import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormLabel, TextField } from "@mui/material";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { addProduct } from "../../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  title: z.string().min(1, "title is required"),
  price: z.string().min(1, "title is required"),
  category: z.string().min(1, "title is required"),
  description: z.string().min(1, "title is required"),
  image: z.any().refine(
    (base64Data) => {
      // Check if the base64 data starts with 'data:image'
      return base64Data && base64Data.startsWith("data:image");
    },
    "Only image files in base64 format are supported."
  ),
});

export type TProductSchema = z.infer<typeof productSchema>;

const AddProducts = () => {
  const [selectedFile, setSelectedFile] = useState<string>();
  const [imageName, setImageName] = useState<string>("");
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) => state.product);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      image: selectedFile,
    },
    reValidateMode: "onChange",
  });

  const convert2base64 = (file: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageName(file.name);
      setSelectedFile(reader.result?.toString());
      setValue("image", reader.result?.toString() as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    convert2base64(file);
  };
  const onSubmit = async (data: TProductSchema) => {
    dispatch(addProduct(data));
  };

  return (
    <div className="w-full flex flex-row gap-2 p-4">
      <div className="w-1/2">
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
                {!watch("image") || watch("image").length === 0 ? (
                  <Button variant="outlined">
                    <input
                      type="file"
                      className="hidden"
                      id="fileInput"
                      onChange={handleFileChange}
                    />
                    <FormLabel
                      htmlFor="fileInput"
                      className="flex flex-row gap-2 items-center"
                    >
                      <UploadIcon />
                      <span className="whitespace-nowrap text-sm">
                        choose your image
                      </span>
                    </FormLabel>
                  </Button>
                ) : (
                  <strong>Selected file: {imageName}</strong>
                )}
              </div>
              <>
                {errors.image && (
                  <span className="text-red-500">{`${errors.image.message}`}</span>
                )}
              </>
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
      <div className="w-1/2 p-4">
        {product && (
          <div className="w-64 border border-gray-400 rounded-md hover:shadow-lg transition-all cursor-pointer">
            <div className="w-full h-44 relative bg-white rounded-t-md p-4">
              <div className="absolute z-10 top-2 right-2 flex flex-row items-center justify-center h-6 py-3 px-2 bg-red-500 rounded-full">
                <p className="text-sm font-semibold text-white">
                  $ {product?.price}
                </p>
              </div>
              <div className="">
              <img
                src={product.image}
                alt={product.title}
                className="p-4 w-full h-40 object-fit"
              />
              </div>
            </div>
            <div className="w-full h-32 rounded-b-md flex flex-col border-t border-gray-600 bg-gray-100">
              <div className="flex flex-row w-full pt-1 px-2">
                <div className="flex items-center ">
                  <p className="text-sm font-semibold ml-2">22</p>
                </div>
              </div>
              <div className="flex flex-col flex-grow items-center justify-between ">
                <div className="flex flex-row  w-full pt-1 px-2">
                  <p className="text-sm font-semibold line-clamp-2 text-slate-800 hover:text-red-400">
                    {product.title}
                  </p>
                </div>
                <p className="flex flex-row w-full text-xs font-semibold px-2 py-1  text-gray-500 text-justify overflow-hidden">
                  <p className="line-clamp-2">{product.description}</p>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProducts;
