import { ChevronRight } from "lucide-react";
import  { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../Card";
import { useQuery } from "@tanstack/react-query";
import Loading from "../reusable/Loading";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { TProductSchema } from "../../components/pages/sub-components/add-products";
import { Box, Typography } from "@mui/material";
import FilterProducts from "../FilterProducts";

const EachCategoryProduct = () => {
  const { category } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category as string);

  const [price, setPrice] = useState<number[]>([0, 10000]);

  //rating
  const [rating, setRating] = useState<number[]>([0, 5]);

 


  const fetchCategory = async (CATEGORY: string) => {
    try {
      const response = await axiosPrivate({
        url: `/categories/${CATEGORY}`,
        method: "GET",
      });
      console.log(response);

      return response.data.products;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`Server responded with status ${error.response.status} and message:
              ${error.response.data.message}
              `);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error setting up the request");
      }
    }
  };

  const { isLoading, data, isError, error } = useQuery<any[]>({
    queryKey: [`category ${category && category}`],
    queryFn: () => fetchCategory(category as string),
  });

  const filteredProducts = data
    ?.filter((item) => (category? category==="All" ?item : item.category === category : item))
    ?.filter((item) => price[0] <= parseInt(item.price) &&  parseInt(item.price) <= price[1])
    ?.filter(
      (item) => rating[0] <=item.rating.rate &&  item.rating.rate <= rating[1]
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
    <Box
     
      className="w-full flex flex-col md:flex-row p-4"
    >
       <Box   sx={{ bgcolor: "background.paper" }} className="md:w-1/3 w-full py-6 px-4 h-max flex flex-col gap-4">
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
            category={selectedCategory}
            setCategory={setSelectedCategory}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
          />
        )}
      </Box>
     <Box className="flex flex-col w-full p-6">
     <div className="w-full flex flex-row items-center gap-2 text-lg capitalize">
        <Link to="/">home</Link>
        <ChevronRight />
        <p>{category}</p>
      </div>
      <div className="px-8 my-12 flex flex-wrap items-center justify-center gap-4">
      {filteredProducts?.length!==0 ? (
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
};

export default EachCategoryProduct;
