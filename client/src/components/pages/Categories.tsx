import { useEffect, useState } from "react";
import {
  Box,
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
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { dateFormatter } from "../../../utils/dateFormatter";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useLogout from "../../../hooks/useLogout";
import { TCategorySchema } from "./sub-components/AddCategory";
import {
  addCategory,
  fetchAllCategories,

} from "../../store/categorySlice";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../cComponent/reusable/Loading";
import useAuth from "../../../hooks/useAuth";
import { instance } from "../../../api/instance";

const Categories = () => {
  const categories = useSelector((state: RootState) => state.category.category);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const logout = useLogout();
  const { auth } = useAuth();
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
  const categoryCall = async () => {
    try {
      const response = await instance.get("/categories", {
        signal: controller.signal,
      });
      if (response.data.success) {
        dispatch(fetchAllCategories(response.data.categories));
        return response.data.categories;
       
      }
    }  catch (error:any) {
      if(error.response.status=== 403 || error.response.status=== 401){
        logout();
      }
      console.log(error);
    }
  };

  const { isLoading, isError, error,refetch } = useQuery<any>({
    queryKey: ["all categories"],
    queryFn: categoryCall,
  });

  const deleteCategory = async (id: string) => {
    try {
      const response = await axiosPrivate({
        url: `/categories/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${auth.token}`,
        },
      });
      if (response.data.success) {
       
        toast.info(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      refetch();
    } catch (error: any) {
      if(error.response.status=== 403 || error.response.status=== 401){
        logout();
      }
      console.log(error);
    }
  };
  const editCategpory = (category: TCategorySchema) => {
    dispatch(addCategory(category));
  };
 
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Box className="w-full h-screen flex flex-col items-center justify-center">
    <p>Error occured 404 {error.message}</p>
    <p>Please refresh the page</p>
    </Box>;
  }
  
  return (
    <div className="px-4">
      <div className="h-20 w-full p-4 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide uppercase">
            Category section
          </h1>
          <p className="mt-2 ">
            WHere you can add different category and check all the categories
            listed below with pagination features
          </p>
        </div>
        <Button variant="contained">
          <Link to="addcategory">add categories</Link>
        </Button>
      </div>

      <div className=" flex items-center justify-center font-sans overflow-hidden p-3">
        <div className="w-full min-h-screen">
        
          <div className="  shadow-md rounded my-6">
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
                            <td className="p-3 flex items-center justify-center">
                              <img
                                src={category.image}
                                alt={category.title}
                                className="w-40 object-contain"
                              />
                            </td>
                            <td className="py-3 px-2 text-center">
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
                                  <Link to={"addcategory"}>
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
                  onClick={() =>
                    setCurrentPage((currentPage) => currentPage - 1)
                  }
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
            {currentPage < Math.ceil(categories.length / productsPerPage) && (
              <Button
                variant="text"
                onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
              >
                {currentPage + 1}
              </Button>
            )}

            {currentPage < Math.ceil(categories.length / productsPerPage) && (
              <>
                <Button
                  variant="text"
                  onClick={() =>
                    setCurrentPage((currentPage) => currentPage + 1)
                  }
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
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Categories;
