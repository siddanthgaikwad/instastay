import dotenv from 'dotenv';
dotenv.config();
// console.log("Cloudinary ENV:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("Cloudinary ENV:", process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY);


import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {connectToDb} from "./src/config/db.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import "./src/config/Cloudinary.js";


import authRoutes from './src/routes/User.js';
import postRoutes from "./src/routes/Post.js";
import categoryRoutes from "./src/routes/Category.js";
import bugRoutes from "./src/routes/Bug.js";
import paymentRoutes from "./src/routes/Booking.js";
import orderRoutes from "./src/routes/Order.js";

// Database
connectToDb();

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(cors());
app.use(fileUpload({useTempFiles : true}))



const PORT = process.env.PORT || 3000;

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(request,response)=>{
    // console.log("Welcome");
    response.send("Welcome");
});

// Routes
app.use("/auth/api",authRoutes);
app.use("/api/post",postRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/bugs",bugRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/order",orderRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running http://localhost:${PORT}`);
})