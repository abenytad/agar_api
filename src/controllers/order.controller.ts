import { Request,Response } from "express";
import { OrderType,StatusEnum } from "../models/orders/order.mongo";
import { addOrder,getDoneOrders,getRunningOrders,getOrderDetails ,changeStatus} from "../models/orders/order.model";
import { getUser } from "../models/users/user.model";
import { getItem } from "../models/items/items.model";
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

const fetchOrderDetails = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }
    const order = await getOrderDetails(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    const user = await getUser(order.orderedBy.toString());
    const orderedItemsPromises = order.orderedItems.map(async (itemId) => {
      const item = await getItem(itemId.toString());
      return item;
    });
    const orderedItems = await Promise.all(orderedItemsPromises);
    const data = {
      orderedBy: user?.name || 'Unknown User',
      orderedItems,
      deliverTo: order.deliverTo,
      city: order.city,
      status: order.status,
      orderedTime: order.historyTime.orderedTime,
    };
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching order details:', err); // Log error for debugging
    return res.status(500).json({ error: 'Internal Server Error' }); // Return a generic error message
  }
};

const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId }: { orderId: string } = req.body;
    const updatedOrder = await changeStatus(orderId);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(updatedOrder);
  } catch (err) {
    console.error('Error updating order status:', err);
    return res.status(500).json({ error: 'An error occurred while updating the order status' });
  }
};


export {createOrder,fetchDoneOrders,fetchRunningOrders,fetchOrderDetails,changeOrderStatus};