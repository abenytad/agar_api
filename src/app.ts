import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

require('dotenv').config();
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



module.exports=app;