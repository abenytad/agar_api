import { Request, Response } from 'express';
import {
  OrderType,
  StatusEnum,
} from '../models/orders/order.mongo';
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
  changeOrderStatusByAdmin,
} from '../models/orders/order.model';
import { getUser } from '../models/users/user.model';
import { getItem } from '../models/items/items.model';

const handleError = (res: Response, err: any, message: string) => {
  console.error(message, err);
  return res.status(500).json({ error: message });
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const order = await addOrder(data);
    return res.status(201).json(order);
  } catch (err) {
    return handleError(res, err, 'Error creating order');
  }
};

const fetchRunningOrders = async (req: Request, res: Response) => {
  try {
    const { userId }: { userId?: string } = req.params;
    const orders = await getRunningOrders(userId || '');
    return res.status(200).json(orders);
  } catch (err) {
    return handleError(res, err, 'Error fetching running orders');
  }
};

const fetchDoneOrders = async (req: Request, res: Response) => {
  try {
    const { userId }: { userId?: string } = req.params;
    const orders = await getDoneOrders(userId || '');
    return res.status(200).json(orders);
  } catch (err) {
    return handleError(res, err, 'Error fetching done orders');
  }
};

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
    return handleError(res, err, 'Error fetching order details');
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
    return handleError(res, err, 'Error updating order status');
  }
};

const fetchAllPendingOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllPendingOrders();
    return res.status(200).json(orders);
  } catch (err) {
    return handleError(res, err, 'Error fetching pending orders');
  }
};

const fetchAllAcceptedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllAcceptedOrders();
    return res.status(200).json(orders);
  } catch (err) {
    return handleError(res, err, 'Error fetching accepted orders');
  }
};

const fetchAllCancelledOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllCancelledOrders();
    return res.status(200).json(orders);
  } catch (err) {
    return handleError(res, err, 'Error fetching cancelled orders');
  }
};

const fetchAllDeliveredOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllDeliveredOrders();
    return res.status(200).json(orders);
  } catch (err) {
    return handleError(res, err, 'Error fetching delivered orders');
  }
};

const fetchAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();
    return res.status(200).json(orders);
  } catch (err) {
    return handleError(res, err, 'Error fetching all orders');
  }
};

const changeStatusByAdmin = async (req: Request, res: Response) => {
  try {
    const { orderId, status }: { orderId: string; status: string } = req.body;

    let updatedOrder: OrderType | null = null;

    if (status === 'accept') {
      updatedOrder = await changeOrderStatusByAdmin(orderId, StatusEnum.ACCEPTED);
    } else if (status === 'reject') {
      updatedOrder = await changeOrderStatusByAdmin(orderId, StatusEnum.CANCELLED);
    } else if (status === 'delivered') {
      updatedOrder = await changeOrderStatusByAdmin(orderId, StatusEnum.DELIVERED);
    } else {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(updatedOrder);
  } catch (err) {
    return handleError(res, err, 'Error updating order status');
  }
};

export {
  createOrder,
  fetchDoneOrders,
  fetchRunningOrders,
  fetchOrderDetails,
  changeOrderStatus,
  fetchAllAcceptedOrders,
  fetchAllCancelledOrders,
  fetchAllDeliveredOrders,
  fetchAllPendingOrders,
  fetchAllOrders,
  changeStatusByAdmin,
};
