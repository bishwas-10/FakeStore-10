import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDb from './utils/connectDb';


//router
import authRouter from "./routes/auth";
import productRouter from "./routes/product";
import cartRouter from "./routes/cart"
import customerRouter from "./routes/customer";

const app = express();
app.set("trust proxy", 1); // trust first proxy
//http://localhost:3000,
app.use(cors({
    origin:'http://localhost:3000',
    methods: "GET,POST, PUT, DELETE, PATCH",
    credentials: true,
    exposedHeaders: ['Access-Control-Allow-Origin'],
}));



app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/users",authRouter);
app.use("/api",productRouter);
app.use("/api",cartRouter);
app.use("/api",customerRouter)
const server = http.createServer(app);


connectDb().then(()=>{
    server.listen(4000, ()=>console.log("server is listening to port 4000"))
}).catch((err)=>console.log("error",err));


