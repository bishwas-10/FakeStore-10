import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { addProduct } from "../../../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { axiosPrivate, instance } from "../../../../api/instance";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useLogout from "../../../../hooks/useLogout";
import { TCategorySchema } from "./AddCategory";



export const productSchema = z.object({
  id: z.string().optional(),
  updatedAt: z.string().optional(),
  addedAt: z.string().optional(),
  title: z.string().min(1, "title is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((value) => /^\d+(\.\d+)?$/.test(value), {
      message: "Price must contain only numeric characters",
    }),
  category: z.string().min(1, "category is required"),
  description: z.string().min(1, "description is required"),
  image: z.any().refine((base64Data) => {
    // Check if the base64 data starts with 'data:image'
    return base64Data && base64Data.startsWith("data:image");
  }, "Only image files in base64 format are supported."),
  topPicks: z.boolean().default(false),
  rating: z.object({
    rate: z
      .string()
      .min(1, "Rate must be a number")
      .refine((value) => /^\d+(\.\d+)?$/.test(value), {
        message: "Rate must contain only numeric characters",
      }), // Ensure "rate" is validated as a number
    count: z
      .string()
      .min(1, "Count must be a number")
      .refine((value) => /^\d+$/.test(value), {
        message: "Count must contain only numeric characters",
      }), // Ensure "count" is validated as a number
  }),
});

export type TProductSchema = z.infer<typeof productSchema>;

const AddProducts = () => {
  const [imageName, setImageName] = useState<string>("");
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const logout = useLogout();
  const product = useSelector(
    (state: RootState) => state.product.newlyAddedProduct
  );
  const [category, setCategory] = useState<string>(product?.category as string);
  const [topPicks, setTopPicks] = useState<string>(product?.topPicks ?"true":"false");
  const [categories, setCategories] = useState<TCategorySchema[]>([]);
  const controller = new AbortController();
  const handleOrderChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    setValue("category", event.target.value as string);
  };
  const handleTopPicksChange = (event: SelectChangeEvent) => {
    const value = event.target.value === 'true'; // Convert string to boolean
    setTopPicks(event.target.value);
    setValue("topPicks", value);
   
  };
  const categoryCall = async () => {
    try {
      const response = await axiosPrivate.get("/categories", {
        signal: controller.signal,
      });
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error: any) {
      if (error.response.statusText === "Unauthorized" || "Forbidden") {
        // logout();
      }
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title,
      price: product?.price,
      image: product?.image,
      description: product?.description,
      category: product?.category,
      topPicks: product?.topPicks,
      rating: {
        rate: product?.rating.rate,
        count: product?.rating.count,
      },
    },
    reValidateMode: "onChange",
  });

  const convert2base64 = (file: any) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageName(file.name);
      setValue("image", reader.result?.toString() as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    convert2base64(file);
  };
  const onSubmit = async (data: TProductSchema) => {
    try {
      console.log(data)
      const response = await instance({
        url: product?.id ? `/products/${product?.id}` : `/products`,
        method: product?.id ? "PUT" : "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${auth.token}`,
        },
        data: {
          title: data.title,
          category: data.category,
          price: data.price,
          image: data.image,
          description: data.description,
          topPicks:data.topPicks,
          rating: {
            rate: data.rating.rate,
            count: data.rating.count,
          },
        },
      });

      if (response.data.success) {
        if (response.data.message === "edited successfully") {
          dispatch(addProduct(response.data.product));
        } else {
          dispatch(addProduct(data));
        
        }
        reset();
        toast.success(response.data.message);
      }
      reset();
    } catch (error: any) {
      if (error.response.status === 403 || error.response.status === 401) {
        logout();
      }
      console.log(error);
    }
  };
  useEffect(() => {
    categoryCall();
  }, []);
  // const editProduct = async (data: TProductSchema) => {
  //   console.log(data);
  //   const productData = await instance({
  //     url: `/products/${data.id}`,
  //     method: "PUT",
  //     data: {
  //       title: data.title,
  //       category: data.category,
  //       price: data.price,
  //       image: data.image,
  //       description: data.description,
  //       rating: {
  //         rate: data.rating.rate,
  //         count: data.rating.count,
  //       },
  //     },
  //   });
  //   if (productData.data.success) {
  //     console.log(productData.data.product);
  //     dispatch(addProduct(productData.data.product));
  //     reset();
  //   }
  // };

  return (
    <div className="w-full flex flex-col md:flex-row gap-2 p-4">
      <div className=" w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4 ease-in-out "
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-row w-full gap-6 ">
              <div className="flex flex-col gap-1">
                <TextField
                  id="title"
                  label="title"
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ""}
                  {...register("title", { required: true })}
                />
              </div>

              <div className="flex ">
                <Box style={{ height: "20px" }} className="text-sm ">
                  <FormControl
                    variant="standard"
                    style={{
                      fontSize: "14px",
                      lineHeight: "10px",
                      height: "20px",
                    }}
                    className="w-40"
                    error={!!errors.category}
                  >
                    <InputLabel
                      style={{
                        fontSize: "14px",
                        lineHeight: "10px",
                        textAlign: "center",
                      }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      className="text-sm"
                      labelId="orderstatus labelid"
                      id="order_status"
                      value={category}
                      label="Order Status"
                      onChange={handleOrderChange}
                    >
                      {categories.length !== 0 &&
                        categories.map((category, index) => {
                          return (
                            <MenuItem
                              key={index}
                              style={{ fontSize: "14px", lineHeight: "10px" }}
                              value={category.title}
                            >
                              {category.title}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <TextField
                id="price"
                label="price"
                variant="outlined"
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ""}
                {...register("price", { required: true })}
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
                {watch("image") && watch("image").length !== 0 && (
                  <strong>Selected file: {imageName}</strong>
                )}
              </div>
              <>
                {errors.image && (
                  <span className="text-red-500">{`${errors.image.message}`}</span>
                )}
              </>
            </div>
            <div className="flex ">
              <Box style={{ height: "20px" }} className="text-sm ">
                <FormControl
                  variant="standard"
                  style={{
                    fontSize: "14px",
                    lineHeight: "10px",
                    height: "20px",
                  }}
                  className="w-40"
                  error={!!errors.topPicks}
                >
                  <InputLabel
                    style={{
                      fontSize: "14px",
                      lineHeight: "10px",
                      textAlign: "center",
                    }}
                  >
                    Top Picks
                  </InputLabel>
                  <Select
                    className="text-sm"
                    id="toppicks"
                    value={topPicks}
                    label="Top Picks"
                    onChange={handleTopPicksChange}
                  >
                    <MenuItem value={false.toString()}>false</MenuItem>
                    <MenuItem value={true.toString()}>true</MenuItem>
                    
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div className="flex flex-col gap-1 mt-6">
              <FormLabel>Rating</FormLabel>
              <TextField
                id="rate"
                label="rate"
                variant="outlined"
                error={!!errors.rating?.rate}
                helperText={
                  errors.rating?.rate ? errors.rating.rate?.message : ""
                }
                {...register("rating.rate", { required: true })}
              />

              <TextField
                id="count"
                label="count"
                variant="outlined"
                error={!!errors.rating?.count}
                helperText={
                  errors.rating?.count ? errors.rating.count?.message : ""
                }
                {...register("rating.count", { required: true })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <TextField
                id="description"
                label="description"
                variant="outlined"
                multiline
                maxRows={4}
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                {...register("description", { required: true })}
              />
            </div>{" "}
          </div>

          <Button
            type="submit"
            className="bg-blue-500 text-white disabled:bg-gray-500 py-2 rounded"
          >
            {product?.id ? "Edit" : "Add"}
          </Button>
        </form>
      </div>
      <div className=" w-full md:w-1/2 p-4">
        {product && (
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <Card sx={{ maxWidth: "100%", padding: "10px" }}>
              <div className="w-full flex items-center justify-center">
                <img
                  className="object-contain h-80 w-72 obe"
                  src={product.image}
                  alt={product.title}
                />
              </div>

              <CardContent className="flex flex-col gap-2">
                <Typography variant="body1" color="text.secondary">
                  <strong>Title:</strong> {product.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  <strong>Price:</strong> {product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Category:</strong> {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Top Picks:</strong> {product.topPicks? "true":"false"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Rate:</strong> {product.rating.rate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Count:</strong> {product.rating.count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Description:</strong> {product.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="small" className="w-full">
                  <Link to="/admin/products"> Back to Product</Link>
                </Button>
              </CardActions>
            </Card>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProducts;
