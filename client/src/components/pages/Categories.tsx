import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  PencilIcon,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addProduct,
  fetchAllProducts,
  fetchProducts,
  removeProducts,
} from "../../store/productSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { instance } from "../../../api/instance";
import { TProductSchema } from "./sub-components/add-products";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { dateFormatter } from "../../../utils/dateFormatter";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/useLogout";
import { TCategorySchema } from "./sub-components/AddCategory";


const Categories = () => {
  const categories = useSelector((state: RootState) => state.category.category);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
const logout = useLogout();
 const {auth,setAuth}= useAuth();
  //pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(2);
  const [pageStartIndex, setPageStartIndex] = useState<number>(0);
  const [pageEndIndex, setPageEndIndex] = useState<number>(3);

  const handlePageSelection = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setPageStartIndex(productsPerPage * (currentPage - 1));
    setPageEndIndex(productsPerPage * currentPage - 1);
  }, [currentPage, productsPerPage]);

  const controller = new AbortController();
  const axiosPrivate = useAxiosPrivate();
  //fetchallproducts
const categoryCall =async()=>{
  try {
     const response = await axiosPrivate.get('/categories', {
      signal: controller.signal
  })
  if(response.data.success){
    console.log(response.data)
    //dispatch(fetchAllProducts(response.data.products));
  }
  }  catch (error:any) {
    if(error.response.statusText==="Unauthorized"||"Forbidden"){
      logout();
    }
    console.log(error);
  }
 

    
}
  //products
  const deleteCategory = async (id: string) => {
    try {
      const response = await instance({
      url: `/category/${id}`,
      method: "DELETE",
       headers: {
        "Content-type": "application/json",
          authorization: `Bearer ${auth.token}`,
      }, 
    });
    if (response.data.success) {
     categoryCall();
      toast.info(response.data.message);
      
    }else{
      toast.error(response.data.message);
    }
    }  catch (error:any) {
      if(error.response.statusText==="Unauthorized"){
        logout();
      }
      console.log(error);
    }
    
  };
  const editCategpory = (product: TCategorySchema) => {
   // dispatch(addProduct(product));
  };

  useEffect(() => {
    categoryCall();
    return () => {
      dispatch(removeProducts());
    };
  }, []);
  return (
    <div className="px-4">
      <div className="h-20 w-full p-4 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide uppercase">
            Product section
          </h1>
          <p className="mt-2 ">
            WHere you can add the products and check all the products listed
            below with pagination features
          </p>
        </div>
        <Button variant="outlined">
          <a href="/products/addproducts">add products</a>
        </Button>
      </div>

      <div className=" flex items-center justify-center font-sans overflow-hidden p-3">
        <div className="w-full">
          <div className=" shadow-md rounded my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-center ">S.N.</th>
                  <th className="py-3 px-0 text-center">Image</th>
                  <th className="py-3 px-0 text-center ">Title</th>
                 
                  
                  <th className="py-3 px-0 text-center">Description</th>
                 
                  <th className="py-3 px-0 text-center">Last Updated</th>

                  <th className="py-3 px-0 text-center">Edit</th>
                </tr>
              </thead>

              <tbody className=" text-sm font-medium">
                {categories.length !== 0 && (
                  <>
                    {categories?.map((category:TCategorySchema, index:number) => {
                      if (pageStartIndex <= index && pageEndIndex >= index) {
                        return (
                          <tr
                            key={category.title}
                            className="border-b border-gray-200 "
                          >
                            <td className="py-3 px-0 text-left whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                {index + 1}
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <img
                                src={category.image}
                                alt={category.title}
                                className="w-40 object-contain"
                              />
                            </td>
                            <td className="py-3 px-0 text-center">
                              <span>{category.title}</span>
                            </td>
                           
                          

                            <td className="py-3 px-0 text-center max-w-30 break-words">
                              {category.description}
                            </td>
                         
                            <td className="py-3 px-0 text-center">
                              <p className="text-center ">
                                {dateFormatter(category.updatedAt as string)}
                              </p>
                            </td>

                            <td className="py-3 px-0 text-center">
                              <div className="flex item-center justify-center">
                                <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                                  <Trash2
                                    onClick={() =>
                                      deleteCategory(category?.id as string)
                                    }
                                  />
                                </div>
                                <div className="w-6 mr-2  transform hover:text-purple-500 hover:scale-120">
                                  <Link to={"addproducts"}>
                                    <PencilIcon
                                      onClick={() => editCategpory(category)}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-4  flex flex-row gap-2 justify-center items-center">
        <FormControl className="w-40">
          <InputLabel id="demo-simple-select-label">
            Categories per page
          </InputLabel>
          <Select
            labelId="productsPerPage"
            id="productsPerPage"
            value={productsPerPage}
            label="productsPerPage"
            onChange={(e) => setProductsPerPage(e.target.value as number)}
          >
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>
        {currentPage > 1 && (
          <>
            <Button variant="text" onClick={() => handlePageSelection(1)}>
              <ChevronsLeft />
            </Button>
            <Button
              variant="text"
              onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
            >
              <ChevronLeft />
            </Button>
          </>
        )}
        {currentPage > 1 && (
          <Button
          variant="text"
          onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
        >
          {currentPage - 1}
        </Button>
        )}
        
        <Button variant="contained">{currentPage}</Button>
        {currentPage < Math.ceil(categories.length / productsPerPage) &&  <Button
          variant="text"
          onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
        >{currentPage + 1}
        </Button>}
       
          
        {currentPage < Math.ceil(categories.length / productsPerPage) && (
          <>
            <Button
              variant="text"
              onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="text"
              onClick={() =>
                handlePageSelection(
                  Math.ceil(categories.length / productsPerPage)
                )
              }
            >
              <ChevronsRight />
            </Button>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Categories;
