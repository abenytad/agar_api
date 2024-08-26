import { Request, Response } from "express";
import { OrderType, StatusEnum } from "../models/orders/order.mongo";
import {
  addOrder,
  getDoneOrders,
  getRunningOrders,
  getOrderDetails,
  changeStatus,
  getAllAcceptedOrders,
  getAllCancelledOrders,
  getAllDeliveredOrders,
  getAllPendingOrders,
  getAllOrders,
  changeOrderStatusByAdmin
} from "../models/orders/order.model";
import { getUser } from "../models/users/user.model";
import { getItem } from "../models/items/items.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: Partial<OrderType> = req.body;
    const order = await addOrder(orderData);
    if (order) {
      return res.status(201).json(order);
    }
    return res.status(400).json({ message: "Error creating order" });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRunningOrdersController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await getRunningOrders(userId);
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getRunningOrdersController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDoneOrdersController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await getDoneOrders(userId);
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getDoneOrdersController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrderDetailsController = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const order = await getOrderDetails(orderId);
    if (order) {
      return res.status(200).json(order);
    }
    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    console.error("Error in getOrderDetailsController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOrderStatusController = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = await changeStatus(orderId);
    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    }
    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    console.error("Error in updateOrderStatusController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error in getAllOrdersController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeOrderStatusByAdminController = async (req: Request, res: Response) => {
  try {
    const { orderId, newStatus } = req.body;
    if (!Object.values(StatusEnum).includes(newStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updatedOrder = await changeOrderStatusByAdmin(orderId, newStatus);
    if (updatedOrder) {
      return res.status(200).json(updatedOrder);
    }
    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    console.error("Error in changeOrderStatusByAdminController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createOrder,
  getRunningOrdersController,
  getDoneOrdersController,
  getOrderDetailsController,
  updateOrderStatusController,
  getAllOrdersController,
  changeOrderStatusByAdminController
};
