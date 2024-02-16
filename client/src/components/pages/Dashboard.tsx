import { Overview } from "./sub-components/overview";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../cComponent/reusable/Loading";
import { axiosPrivate, instance } from "../../../api/instance";
import useLogout from "../../../hooks/useLogout";
import useAuth from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../store/soldOrderSlice";
import { RootState } from "../../store/store";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const logout = useLogout();
  const orderstatus = useSelector((state: RootState) => state.order);
  console.log(orderstatus);
  const controller = new AbortController();
  const saleCall = async () => {
    try {
      const response = await instance({
        url: "/carts",
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      console.log(response.data.cart);
      dispatch(fetchAllOrders(response.data.cart));

      return response.data.cart;
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };
  const { isLoading, data, isError, error, refetch } = useQuery<any>({
    queryKey: ["sold-carts"],
    queryFn: saleCall,
  });
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error occured 404 {error.message}</p>;
  }
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight ">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <button>Download</button>
          </div>
        </div>
        <div defaultValue="overview" className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className=" border-2  rounded-md cursor-pointer hover:shadow-2xl transition-all">
                <CardContent>
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <span className="text-sm font-medium">Total Revenue</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      ${orderstatus.totalRevenue}
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className=" border-2  rounded-md cursor-pointer hover:shadow-2xl transition-all">
                <CardContent>
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium">Sales</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      +{orderstatus.totalSales}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className=" border-2  rounded-md cursor-pointer hover:shadow-2xl transition-all">
                <CardContent>
                  <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <h1 className="text-sm font-medium">Active Now</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <h1>
                  <p>Overview</p>
                </h1>
                <div className="">
                  <Overview />
                </div>
              </div>
              <div className="col-span-3 border-2 border-gray-300 h-max p-2">
                <span>
                  <Typography variant="h5" fontWeight={600}>Recent Sales</Typography>
                  <p>You made {orderstatus.orders.filter((item)=>item.paymentStatus==="paid").length} sales this month.</p>
                </span>
                <div className="pt-4" onClick={()=>navigate("orders")}>
                  {orderstatus.orders.map((order, index) => {
                    return (
                      order.paymentStatus === "paid" && (
                        <Box
                          key={index}
                          className="flex flex-row justify-between"
                        >
                         
                         <Typography fontSize={"14px"} fontWeight={600}> {order.product.title}</Typography>
                        <span>{order.updatedAt}</span>
                        </Box>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
