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
import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { dateFormatter } from "../../../utils/dateFormatter";

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
  const unsold = orderstatus.orders.map((order) =>
    order.paymentStatus === "not paid" ? order.quantity : 0
  ) as number[];
  const unsoldQty = unsold.reduce((acc, curr) => acc + curr, 0);
  const { isLoading, data, isError, error } = useQuery<any>({
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
            <Button variant="contained">Download</Button>
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
                    <div className="text-sm font-medium">
                      Total Sold Product
                    </div>
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
                  <Link
                    to={"orders"}
                    className="flex flex-col items-start justify-between space-y-0 pb-2"
                  >
                   <Box className="flex flex-row items-center justify-between w-full ">
                   <h1 className="text-sm font-medium">Unsold Product</h1>
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
                   </Box>
                 
                  <Box>
                    <div className="text-2xl font-bold">
                      {
                        orderstatus.orders.filter(
                          (order) => order.paymentStatus === "not paid"
                        ).length
                      }
                    </div>
                    <span className="text-sm">
                      Total Qnty:
                      {unsoldQty}
                    </span>
                  </Box>
                  </Link>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <div className="col-span-4 border-2 border-gray-300  p-4 shadow-lg">
                <Typography variant="h5" fontWeight={600}>
                  Overview
                </Typography>
                <div className="mt-4">
                  <Overview />
                </div>
              </div>
              <div className="col-span-3 border-2 border-gray-300 h-max p-4 shadow-lg">
                <span>
                  <Typography variant="h5" fontWeight={600}>
                    Recent Sales
                  </Typography>
                  <p>You made {orderstatus.totalSales} sales this month.</p>
                </span>
                <div
                  className="pt-4 flex flex-col gap-2"
                  onClick={() => navigate("orders")}
                >
                  {orderstatus.orders.map((order, index) => {
                    return (
                      order.paymentStatus === "paid" && (
                        <Box
                          key={index}
                          className="flex flex-row items-center justify-between"
                        >
                          <Box className="flex flex-col  items-start w-60">
                            <Typography fontSize={"14px"} fontWeight={600}>
                              {order.product.title}
                            </Typography>
                            <Typography fontSize={"12px"}>
                              {order.customer.email}
                            </Typography>
                          </Box>
                          <Box className="flex flex-col  items-center">
                            <Typography fontSize={"14px"} fontWeight={500}>
                              Qty: {order.quantity}
                            </Typography>
                            <span className="text-sm">
                              Per Product:{" "}
                              <span className="font-bold">
                                ${order.totalAmount}
                              </span>
                            </span>
                          </Box>
                          <Box className="flex flex-col  items-end">
                            <Typography fontSize={"14px"} fontWeight={600}>
                              $
                              {parseInt(order.quantity) *
                                parseInt(order.totalAmount)}
                            </Typography>
                            <span>
                              {dateFormatter(order.updatedAt as string)}
                            </span>
                          </Box>
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
