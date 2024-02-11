import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDb from './utils/connectDb';

//middleware
import { verifyJWT } from './middleware/verifyJWT';
//router
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import cartRouter from "./routes/cart"
import customerRouter from "./routes/customer";
import { refreshDummmy } from './controller/refreshDummy';
import { handleRefreshToken } from './controller/refreshToken';
import { getAllProducts, getProduct } from './controller/product';


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

app.use("/api/users",authRouter);
app.get('/api/refresh',handleRefreshToken);
//getproducts
app.get('/api/products',getAllProducts);
app.get('/api/products/:id',getProduct);


app.use(verifyJWT);
app.use("/api",productRouter);
app.use("/api",cartRouter);
app.use("/api",customerRouter)
const server = http.createServer(app);


connectDb().then(()=>{
    server.listen(4000, ()=>console.log("server is listening to port 4000"))
}).catch((err)=>console.log("error",err));


