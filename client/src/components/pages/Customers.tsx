import { useEffect } from "react";
import { PencilIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {  addCustomer, fetchCustomers, removeCustomers } from "../../store/customerSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { TCustomerSchema } from "./sub-components/editCustomers";
import { dateFormatter } from "../../utils/dateFormatter";

const Customers = () => {
  const customers = useSelector((state: RootState) => state.customer.customers);
  const token = useSelector((state:RootState)=>state.token.token);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  useEffect(() => {
    dispatch(fetchCustomers(token as string));
    return () => {
      dispatch(removeCustomers());
    };
  }, []);

  return (
    <div className="px-4">
      <div className=" flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
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
                {customers.length !== 0 &&
                  customers.map((customer:TCustomerSchema, index) => {
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
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
