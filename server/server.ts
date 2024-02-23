import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./utils/connectDb";
import * as path from 'path';
require("dotenv").config();
//middleware
import { verifyJWT } from "./middleware/verifyJWT";
//router
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import cartRouter from "./routes/cart";
import categoryRouter from "./routes/category";
import customerRouter from "./routes/customer";
import getRouter from "./routes/getRoute";
import { handleRefreshToken } from "./controller/refreshToken";

const app = express();
const PORT = process.env.PORT;

const endpointSecret = process.env.ENDPOINT_SECRET;
 const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// This is your test secret API key.
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks


app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err:any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



 app.set("trust proxy", 1); // trust first proxy
// http://localhost:3000,
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(
  cors({
    origin: ["https://eccomerce-admin1.onrender.com","https://fakestore-10.vercel.app", "http://localhost:5173","https://eccomerce-admin1.bishwas-projects.vercel.app"],
    methods: "GET,POST, PUT, DELETE, PATCH",
    credentials: true,
    exposedHeaders: ["Access-Control-Allow-Origin"],
  })
);

app.use(express.static("public"));
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// This is your test secret API key.
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



const calculateOrderAmount = () => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/api/create-payment-intent", async (req, res) => {
console.log(req.body)
  console.log("aayo");
  // Create a PaymentIntent with the order amount and currency
 
  const paymentIntent = await stripe.paymentIntents.create({
    description: 'Eccomerce Products',
  shipping: {
    name: req.body.name,
    address: {
      line1: 'dummy line',
      postal_code: req.body.address.postal_code,
      city: req.body.address.city,
      state: req.body.address.state,
      country: req.body.address.country,
    },
  },
  amount: req.body.product.totalPrice*100,
  currency: 'usd',
  payment_method_types: ['card'],
  });
 
 
  res.send({
    clientSecret: paymentIntent.client_secret,
 
  });
});

app.use("/api/users", authRouter);
app.get("/api/refresh", handleRefreshToken);
/*getproducts and categories */
app.use("/api", getRouter);
// app.use(verifyJWT);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", customerRouter);
const server = http.createServer(app);

connectDb()
  .then(() => {
    server.listen(PORT, () => console.log("server is listening to port 4000"));
  })
  .catch((err) => console.log("error", err));
