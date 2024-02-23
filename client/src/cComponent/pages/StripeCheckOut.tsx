import  { useState, useEffect } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../../Stripe.css";
import useAuth from "../../../hooks/useAuth";
import { UserInfoProps } from "../../context/AuthProvider";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const API_KEY= process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe(
  "pk_test_51OlnFVSBM61PqvQCgrRcVzgKTIXK9BLo7QmxGWbCJNYS5yeacpXObgJ9IRFiaUJK7fKpIeruUcO0GT9s0UtBXwaE00VEykGLH9"
);

export default function StripeCheckOut() {
  const checkOutItems = useSelector(
    (state: RootState) => state.cart.checkOutItems
  );
  const axiosPrivate = useAxiosPrivate();
  const [clientSecret, setClientSecret] = useState("");
  const { auth } = useAuth();
  const decoded: UserInfoProps | undefined = auth.token
    ? (jwtDecode<JwtPayload>(auth.token as string) as UserInfoProps)
    : undefined;
 
  const createPaymentIntent = async () => {
    try {
      const response = await axiosPrivate("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          name: decoded?.UserInfo.username,
          address: {
            postal_code: checkOutItems[0].shippingAddress?.zipcode,
            city: checkOutItems[0].shippingAddress?.city,
            state: checkOutItems[0].shippingAddress?.street,
            country: "NE",
          },
          product: {
            title:checkOutItems[0].product.title,
            totalPrice:checkOutItems.map((item)=>parseInt(item.quantity)*parseInt(item.totalAmount)).reduce((acc,curr)=>acc+curr,0),
           
          },
        },
      });
      console.log(response);
      if (response) {
        setClientSecret(response.data.clientSecret);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  } as StripeElementsOptions;

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
