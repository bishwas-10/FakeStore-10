import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "./reusable/Loading";
import { TCategorySchema } from "../components/pages/sub-components/AddCategory";
import { useDispatch } from "react-redux";
import { fetchAllCategories } from "../store/categorySlice";
import { Box } from "@mui/material";
import { instance } from "../../api/instance";


const CategoryHome = () => {

  const dispatch = useDispatch();
  const fetchCategories = async () => {
    const response = await instance({
      url: `/categories`,
      method: "GET",
    });

    if (response.data.success) {
      dispatch(fetchAllCategories(response.data.categories));
      return response.data.categories;
    } else {
      throw new Error(response.data.message);
    }
  };
  const { isLoading, data, isError, error } = useQuery({
    queryKey: [`categories`],
    queryFn: () => fetchCategories(),
  });

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
      {data?.map((item: TCategorySchema, index: number) => (
        <Link key={index} to={"/categories/" + item.title}>
          <Box
            sx={{ bgcolor: "background.main" }}
            className="w-80 border p-2 flex flex-col gap-2 border-gray-200 rounded-md hover:shadow-lg transition-all cursor-pointer"
          >
            <p className="text-lg font-bold text-center tracking-wide  uppercase">{item.title}</p>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: 400, height: 300 }}
              className=" rounded-sm object-cover"
            />
          </Box>
        </Link>
      ))}
    </div>
  );
};

export default CategoryHome;
