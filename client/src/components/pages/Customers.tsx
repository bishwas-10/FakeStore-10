import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, PencilIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {  addCustomer, fetchAllCustomers, fetchCustomers, removeCustomers } from "../../store/customerSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { TCustomerSchema } from "./sub-components/editCustomers";
import { dateFormatter } from "../../../utils/dateFormatter";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import useLogout from "../../../hooks/useLogout";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../cComponent/reusable/Loading";

const Customers = () => {
  const customers = useSelector((state: RootState) => state.customer.customers);
const logout = useLogout();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

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
const customerCall =async()=>{
  try {
    const response = await axiosPrivate.get('/customers', {
      signal: controller.signal
  })
  if(response.data.success){
    dispatch(fetchAllCustomers(response.data.customers));
    return response.data.customers;
    
  }
  } catch (error:any) {
    if(error.response.status=== 403 || error.response.status=== 401){
      logout();
    }
    console.log(error);
  }
  

    
}
const { isLoading, data, isError, error,refetch } = useQuery<any>({
  queryKey: ["all categories"],
  queryFn: customerCall,
});


if (isLoading) {
  return <Loading />;
}


if (isError) {
  return <p>Error occured 404 {error.message}</p>;
}

  return (
    <div className="px-4">
      <div className="h-20 w-full p-4 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide uppercase">
            Customer section
          </h1>
          <p className="mt-2 ">
            WHere you can all different customers and check all the customers
            listed below with pagination features
          </p>
        </div>
        
      </div>

      <div className=" flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full min-h-screen">
        <div className="my-4  flex flex-row gap-2 justify-center items-center">
            <FormControl className="w-40">
              <InputLabel id="demo-simple-select-label">
                Customers per page
              </InputLabel>
              <Select
                labelId="customersPerPage"
                id="customersPerPage"
                value={productsPerPage}
                label="customersPerPage"
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
            {currentPage < Math.ceil(customers.length / productsPerPage) && (
              <Button
                variant="text"
                onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
              >
                {currentPage + 1}
              </Button>
            )}

            {currentPage < Math.ceil(customers.length / productsPerPage) && (
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
                      Math.ceil(customers.length / productsPerPage)
                    )
                  }
                >
                  <ChevronsRight />
                </Button>
              </>
            )}
          </div>
          <div className=" shadow-md rounded my-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-center cursor-pointer">S.N.</th>
                  <th className="py-3 px-0 text-center">Email</th>
                  <th className="py-3 px-0 text-center">Username</th>
                  <th className="py-3 px-0 text-center">
                    <div className="flex flex-row justify-around">
                      <div className="w-full borders">First Name</div>
                      <div className="w-full borders">Last Name</div>
                    </div>
                  </th>
                  <th className="py-3 px-0 text-center">
                    <div className="flex flex-row justify-around">
                      <div className="w-full borders">City</div>
                      <div className="w-full borders">Street</div>
                      <div className="w-full borders">Zipcode</div>
                    </div>
                  </th>
                  <th className="py-3 px-0 text-center">Phone</th>
                  <th className="py-3 px-0 text-center">last updated</th>
                  <th className="py-3 px-0 text-center">Edit</th>
                </tr>
              </thead>
              <tbody className=" text-sm font-medium">
              {customers.length !== 0 && (
                  <>
                    {customers?.map((customer, index) => {
                      if (pageStartIndex <= index && pageEndIndex >= index) {
                    return (
                      <tr key={index} className="border-b border-gray-200 ">
                        <td className="py-3 px-0 text-center whitespace-nowrap">
                          <span className="font-medium">
                            {index+1}
                          </span>
                        </td>
                        <td className="py-3 px-0 text-center">
                         {customer.email}
                        </td>
                        <td className="py-3 px-0 text-center">
                          <div className="flex items-center justify-center">
                            {customer.username}
                          </div>
                        </td>
                        <td className="py-3 px-0 text-center">
                          <div className="flex flex-row justify-around">
                            <div className="w-full borders p-2">
                              {customer.name.firstName}
                            </div>
                            <div className="w-full borders p-2">
                              {customer.name.firstName}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-0 text-center">
                          <div className="flex flex-row justify-around">
                            <div className="w-full borders p-2">
                              {customer.address.city}
                            </div>
                            <div className="w-full borders p-2">
                              {customer.address.zipcode}
                            </div>
                            <div className="w-full borders p-2">
                              {customer.address.street}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-0 text-center">
                          <span className="flex items-center justify-center">
                            {customer.phone}
                          </span>
                        </td>

                        <td className="py-3 px-0 text-center">
                          <p className="text-center ">{dateFormatter(customer?.updatedAt as string)}</p>
                        </td>

                        <td className="py-3 px-0 text-center">
                            <div className="w-full flex items-center justify-center transform hover:text-purple-500 hover:scale-120">
                            <Link to={'editcustomers'}>  <PencilIcon onClick={()=>dispatch(addCustomer(customer))}/></Link>
                            </div>
                        </td>
                      </tr>
                    );
                  }})}</>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
