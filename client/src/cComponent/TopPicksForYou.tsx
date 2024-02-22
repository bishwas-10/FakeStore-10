import Loading from "./reusable/Loading";
import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../../api/instance";
import { TProductSchema } from "../components/pages/sub-components/add-products";
import Card from "./Card";
import { Link } from "react-router-dom";

const TopPicksForYou = () => {
  const fetchProducts = async () => {
    const response = await axiosPrivate({
      url: `/products`,
      method: "GET",
    });

    if (response.data.success) {
      return response.data.products;
    } else {
      throw new Error(response.data.message);
    }
  };
  const { isLoading, data, isError, error } = useQuery<TProductSchema[]>({
    queryKey: [`all-products`],
    queryFn: () => fetchProducts(),
  });
  console.log(data);
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
    <div className=" mt-4 flex flex-wrap items-center justify-center gap-6 ">
      {data
        ?.filter((item) => item?.topPicks === true)
        .map((product, index) => {
          return (
            <Link key={product.id} to={"/product/" + product.id}>
              <Card key={index} product={product} />
            </Link>
          );
        })}
    </div>
  );
};

export default TopPicksForYou;
