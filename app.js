import express from "express";
import dotenv from "dotenv";
import colors from "colors"
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js"
import cors from 'cors'

//configure env
dotenv.config();

connectDB();

const app= express();

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest api
app.get("/",(req,res)=>{
    res.send("<h1>welcome to ecommerce app</h1>");
});

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
