import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
require('dotenv').config();
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/users',userRouter);


module.exports=app;