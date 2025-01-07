import express from 'express';
import {router as authRoutes} from './routes/authRoutes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log('Server started at http://localhost:'+PORT);
    connectMongoDB();
})