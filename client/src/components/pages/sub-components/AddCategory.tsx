import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardActions, CardContent, FormLabel, TextField, Typography } from '@mui/material';
import { watch } from 'fs';
import { UploadIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { instance } from '../../../../api/instance';
import useAuth from '../../../../hooks/useAuth';
import { addProduct } from '../../../store/productSlice';
import { addCategory } from '../../../store/categorySlice';
import { ToastContainer, toast } from 'react-toastify';
import useLogout from '../../../../hooks/useLogout';


export const categorySchema = z.object({
    updatedAt: z.string().optional(),
    addedAt: z.string().optional(),
    title: z.string({ required_error: "title is required" }),
    id: z.string().optional(),
    
    description: z.string({ required_error: "description is required" }),
    image: z.any().refine((base64Data) => {
        // Check if the base64 data starts with 'data:image'
        return base64Data && base64Data.startsWith("data:image");
      }, "Only image files in base64 format are supported."),
    products: z.array(z.string().min(1,"product id is required")),
  });

  export type TCategorySchema = z.infer<typeof categorySchema>
const AddCategory = () => {
    const {auth} = useAuth();
    const logout = useLogout();
    const dispatch = useDispatch();
    const [imageName, setImageName] = useState<string>("");
    const category = useSelector(
        (state: RootState) => state.category.newlyAddedCategory
      );
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
        reset,
      } = useForm<TCategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
          title: category?.title,
          
          image: category?.image,
          description: category?.description,
         
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
      const onSubmit = async (data: TCategorySchema) => {
      try {
         const response = await instance({
          url: category?.id ? `/category/${category?.id}` : `/categories`,
          method: category?.id ? "PUT" : "POST",
          headers: {
            "Content-type": "application/json",
              authorization: `Bearer ${auth.token}`,
          },
          data: {
            title: data.title,
        
            image: data.image,
            description: data.description,
          
          },
        });
        
        if(response.data.success){
          if(response.data.message==="edited successfully"){
             dispatch(addCategory(response.data.category));
            
          }else{
            dispatch(addCategory(data)); 
            reset();
          }
           toast.success(response.data.message);
        }
      }  catch (error:any) {
        if(error.response.statusText==="Unauthorized" ||"Forbidden"){
          logout();
        }
        console.log(error);
      }
       
       
       
      };
    
  return (
    <div className="w-full flex flex-col md:flex-row gap-2 p-4">
    <div className=" w-full md:w-1/2">
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
          </div>{" "}
        </div>

        <Button
          type="submit"
          className="bg-blue-500 text-white disabled:bg-gray-500 py-2 rounded"
        >
          {category?.id ? "Edit" : "Add"}
        </Button>
      </form>
    </div>
    <div className=" w-full md:w-1/2 p-4">
      {category && (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
         
          <Card sx={{ maxWidth: "100%", padding: "10px" }}>
            <div className="w-full flex items-center justify-center">
              <img
                className="object-contain h-80 w-72 obe"
                src={category.image}
                alt={category.title}
              />
            </div>

            <CardContent className="flex flex-col gap-2">
              <Typography variant="body1" color="text.secondary">
                <strong>Title:</strong> {category.title}
              </Typography>
             
            
             
             
              <Typography variant="body2" color="text.secondary">
                <strong>Description:</strong> {category.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
               
                variant="outlined"
                size="small"
                className="w-full"
              >
               <Link to="/admin/categories"> Back to Product</Link>
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
    <ToastContainer/>
  </div>
  )
}

export default AddCategory