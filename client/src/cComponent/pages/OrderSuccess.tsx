import { Button, Typography } from "@mui/material";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";


function OrderSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentIntentId = queryParams.get("payment_intent");



  return (
    <>
      {!paymentIntentId && <Navigate to="/" replace={true} />}
      <main className="w-full min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <Typography sx={{color:"text.textSecondary"}} className="text-base font-semibold ">Order Successfully Placed</Typography>
          <h1 className="mt-4 sm:text-lg md:text-xl text-xs font-bold tracking-tight  px-4 ">
            Order Number #{paymentIntentId}
          </h1>
          <p className="mt-6  ">
            You can check your order in My Account - My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              onClick={()=>navigate("/")}
              variant="contained"
              className="rounded-md  px-3.5 py-2.5 text-sm font-semibold
              "
            >
              Go back home
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderSuccess;
