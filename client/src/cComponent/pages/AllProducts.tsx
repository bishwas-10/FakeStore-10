import axios from "axios";
import Card, { ProductsProps } from "../Card";
import { Link } from "react-router-dom";
import Loading from "../reusable/Loading";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";

const fetchAllProducts = async () => {
  const response = await instance({
    url: "/products",
    method: "GET",
  });
  console.log(response.data);
return response.data.products;

   
};

export default function AllProducts() {
  const { isLoading, data } = useQuery<any[]>({
    queryKey: ["all-products"],
    queryFn: fetchAllProducts,
    staleTime: 30000,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4 my-12 flex flex-wrap items-center justify-center gap-4">
      {data?.map((product: ProductsProps) => {
        return (
          <Link key={product.id} to={"/product/" + product.id}>
            <Card product={product} />
          </Link>
        );
      })}
    </div>
  );
}
