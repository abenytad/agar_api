import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import itemsRouter from './routes/itemsRoutes';
import orderRouter from './routes/orderRoutes';
require('dotenv').config();
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); 
app.use('/users',userRouter);
app.use('/items',itemsRouter);
app.use('/orders',orderRouter);


module.exports=app;