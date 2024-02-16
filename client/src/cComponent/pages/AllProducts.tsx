import axios from "axios";
import Card, { ProductsProps } from "../Card";
import { Link } from "react-router-dom";
import Loading from "../reusable/Loading";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";
import { Typography } from "@mui/material";

const fetchAllProducts = async () => {
  const response = await instance({
    url: "/products",
    method: "GET",
  });
  console.log(response.data);
  return response.data.products;
};

export default function AllProducts() {
  const { isLoading, data,error,isError } = useQuery<any[]>({
    queryKey: ["all-products"],
    queryFn: fetchAllProducts,
    staleTime: 30000,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError ) {
    return <span>Error occured 404<p className="text-md font-medium ">{error.message}</p> </span>;
  }
  return (
    <>
      <Typography variant="h6" fontWeight={500} className="py-6 px-10">
        All products available at FakeStore
      </Typography>
      <div className="px-8 my-12 flex flex-wrap items-center justify-center gap-4">
        {data?.map((product: ProductsProps) => {
          return (
            <Link key={product.id} to={"/product/" + product.id}>
              <Card product={product} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
