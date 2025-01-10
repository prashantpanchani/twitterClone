import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

import  authRoutes from './routes/authRoutes.js';
import  userRoutes from './routes/userRoutes.js';
import  postRoutes from './routes/postRoutes.js';


import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});


const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());


app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(PORT,()=>{
    console.log('Server started at http://localhost:'+PORT);
    connectMongoDB();
})