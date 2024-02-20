import React, { useState, useEffect } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import  "../../Stripe.css";
import { instance } from "../../../api/instance";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// const API_KEY= process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string;
const stripePromise = loadStripe("pk_test_51OlnFVSBM61PqvQCgrRcVzgKTIXK9BLo7QmxGWbCJNYS5yeacpXObgJ9IRFiaUJK7fKpIeruUcO0GT9s0UtBXwaE00VEykGLH9" );

export default function StripeCheckOut() {
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async()=>{
    try {
        const response =  await instance("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data:{ items: [{ id: "xl-tshirt" }] },
          })
          console.log(response)
          if(response){
            setClientSecret(response.data.clientSecret)
          }
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
   createPaymentIntent();
  }, []);

  const appearance = {
    theme: 'stripe',
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