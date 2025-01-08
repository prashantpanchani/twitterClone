import express from 'express';
import {router as authRoutes} from './routes/authRoutes.js';
import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());


app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log('Server started at http://localhost:'+PORT);
    connectMongoDB();
})