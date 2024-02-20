import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDb from './utils/connectDb';
require("dotenv").config();
//middleware
import { verifyJWT } from './middleware/verifyJWT';
//router
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import cartRouter from "./routes/cart";
import categoryRouter from "./routes/category";
import customerRouter from "./routes/customer";
import getRouter from "./routes/getRoute";
import { handleRefreshToken } from './controller/refreshToken';



const app = express();
app.set("trust proxy", 1); // trust first proxy
//http://localhost:3000,
app.use(cors({
    origin:['http://localhost:3000','http://localhost:5173'],
    methods: "GET,POST, PUT, DELETE, PATCH",
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Origin'],
}));



app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = () => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/api/create-payment-intent", async (req, res) => {
  const { items } = req.body;
console.log("aayo")
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use("/api/users",authRouter);
app.get('/api/refresh',handleRefreshToken);
/*getproducts and categories */
app.use('/api',getRouter);
app.use(verifyJWT);
app.use("/api",categoryRouter);
app.use("/api",productRouter);
app.use("/api",cartRouter);
app.use("/api",customerRouter)
const server = http.createServer(app);


connectDb().then(()=>{
    server.listen(4000, ()=>console.log("server is listening to port 4000"))
}).catch((err)=>console.log("error",err));


