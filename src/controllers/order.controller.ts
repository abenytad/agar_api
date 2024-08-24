import { Request,Response } from "express";
import { OrderType } from "../models/orders/order.mongo";
import { addOrder,getDoneOrders,getRunningOrders } from "../models/orders/order.model";

const createOrder=async(req:Request,res:Response)=>{
    try{
     const data=req.body;
     const order=await addOrder(data);
     return res.status(201);
    }catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
}

const fetchRunningOrders=async(req:Request,res:Response)=>{
    try{
    const {userId}:{userId?:string}=req.params;
     const orders=await getRunningOrders(userId);
     return res.status(200).json(orders);
    }catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
}

const fetchDoneOrders=async(req:Request,res:Response)=>{
    try{
    const {userId}:{userId?:string}=req.params;
     const orders=await getDoneOrders(userId);
     return res.status(200).json(orders);
    }catch (err) {
    return res.status(404).json({ error: `${err}` });
  }
}

export {createOrder,fetchDoneOrders,fetchRunningOrders};