import Card from "../Card";
import { Link } from "react-router-dom";
import Loading from "../reusable/Loading";
import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../api/instance";
import { Box, Typography } from "@mui/material";
import { TProductSchema } from "../../components/pages/sub-components/add-products";
import { useState } from "react";
import FilterProducts from "../FilterProducts";

const fetchAllProducts = async () => {
  const response = await instance({
    url: "/products",
    method: "GET",
  });
 
  return response.data.products;
};

export default function AllProducts() {
  const [category, setCategory] = useState<string | null>(null);

  const [price, setPrice] = useState<number[]>([0, 10000]);

  //rating
  const [rating, setRating] = useState<number[]>([0, 5]);

  const { isLoading, data, error, isError } = useQuery<any[]>({
    queryKey: ["all-products"],
    queryFn: fetchAllProducts,
    staleTime: 30000,
  });

  const filteredProducts = data
    ?.filter((item) =>
      category ? (category === "All" ? item : item.category === category) : item
    )
    ?.filter((item) => price[0] <= item.price && item.price <= price[1])
    ?.filter(
      (item) => rating[0] <= item.rating.rate && item.rating.rate <= rating[1]
    );

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <span>
        Error occured 404<p className="text-md font-medium ">{error.message}</p>{" "}
      </span>
    );
  }
  return (
    <Box className="w-full flex flex-col md:flex-row p-4">
      <Box
        sx={{ bgcolor: "background.paper" }}
        className="md:w-1/3 w-full py-6 px-4 h-max flex flex-col gap-4"
      >
        <Typography
          fontWeight={500}
          fontSize={"20px"}
          className=" tracking-wide capitalize"
        >
          Filter Products
        </Typography>
        {data && (
          <FilterProducts
            data={data}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
          />
        )}
      </Box>
      <Box className="flex flex-col w-full">
        <Typography
          fontWeight={500}
          fontSize={"20px"}
          className="py-6 px-6 tracking-wide capitalize"
        >
          All products available at FakeStore
        </Typography>
        <div className="px-8 my-12 flex flex-wrap items-center justify-center gap-4">
          {filteredProducts?.length !== 0 ? (
            filteredProducts?.map((product: TProductSchema) => {
              return (
                <Link key={product.id} to={"/product/" + product.id}>
                  <Card product={product} />
                </Link>
              );
            })
          ) : (
            <Box className="h-80 flex items-center justify-center">
              <Typography
                fontWeight={500}
                fontSize={"20px"}
                className="py-6 px-6 tracking-wide capitalize"
              >
                NO Products Available
              </Typography>
            </Box>
          )}
        </div>
      </Box>
    </Box>
  );
}
