import Order, { OrderType, StatusEnum } from "./order.mongo";

const addOrder = async (orderData: Partial<OrderType>): Promise<OrderType | null> => {
  try {
    const order = await Order.create(orderData);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Error creating order');
  }
};

interface RunningOrder {
  _id: string;
  status: StatusEnum;
  orderedTime: Date;
}

const getRunningOrders = async (userId: string): Promise<RunningOrder[]> => {
  try {
    // Fetch orders with `.lean()` to get plain JavaScript objects
    const orders = await Order.find({
      orderedBy: userId,
      status: { $in: [StatusEnum.PENDING, StatusEnum.ACCEPTED] },
    })
      .select('_id status historyTime.orderedTime')
      .sort({ 'historyTime.orderedTime': -1 })
      .lean(); // Convert to plain JavaScript objects

    // Use type assertion to explicitly define the shape of each order
    return orders.map((order) => ({
      _id: order._id.toString(), // Convert _id to string
      status: order.status as StatusEnum, // Assert that status is of type StatusEnum
      orderedTime: order.historyTime.orderedTime,
    }));
  } catch (error) {
    console.error('Error fetching running orders:', error);
    throw new Error('Error fetching running orders');
  }
};
interface DoneOrder {
  _id: string;
  status: StatusEnum;
  orderedTime: Date;
}

const getDoneOrders = async (userId: string): Promise<DoneOrder[]> => {
  try {
    // Fetching the orders with `.lean()` to get plain JavaScript objects
    const orders = await Order.find({
      orderedBy: userId,
      status: { $in: [StatusEnum.ACCEPTED, StatusEnum.CANCELLED] },
    })
      .select('_id status historyTime.orderedTime')
      .sort({ 'historyTime.orderedTime': -1 })
      .lean(); // Convert to plain JavaScript objects

    // Type guard to ensure the orders have the expected structure
    return orders.map((order) => {
      if (typeof order._id === 'string' && order.status in StatusEnum) {
        return {
          _id: order._id, // `_id` should already be a string from `.lean()`
          status: order.status as StatusEnum,
          orderedTime: order.historyTime.orderedTime,
        };
      } else {
        throw new Error('Unexpected order format');
      }
    });
  } catch (error) {
    console.error('Error fetching done orders:', error);
    throw new Error('Error fetching done orders');
  }
};

const getOrderDetails = async (orderId: string): Promise<OrderType | null> => {
  try {
    const order = await Order.findById(orderId)
      .select('-__v -createdAt -updatedAt') // Exclude unnecessary fields
      .lean(); // Use lean() for better performance if you don't need full Mongoose documents

    if (!order) {
      return null;
    }

    return order as OrderType;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw new Error('Unable to fetch order details');
  }
};

const changeStatus = async (orderId: string): Promise<OrderType | null> => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status === StatusEnum.PENDING) {
      order.status = StatusEnum.CANCELLED;
    } else if (order.status === StatusEnum.CANCELLED) {
      order.status = StatusEnum.PENDING;
    } else {
      throw new Error('Status change is only allowed between "pending" and "cancelled"');
    }

    order.historyTime.updatedTime = new Date();
    const updatedOrder = await order.save();
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

const getAllPendingOrders = async (): Promise<OrderType[]> => {
  try {
    const orders = await Order.find({ status: StatusEnum.PENDING })
      .select('-__v -createdAt -updatedAt')
      .sort({ 'historyTime.orderedTime': -1 });

    return orders;
  } catch (error) {
    console.error('Error fetching all pending orders:', error);
    throw new Error('Error fetching all pending orders');
  }
};

const getAllAcceptedOrders = async (): Promise<OrderType[]> => {
  try {
    const orders = await Order.find({ status: StatusEnum.ACCEPTED })
      .select('-__v -createdAt -updatedAt')
      .sort({ 'historyTime.orderedTime': -1 });

    return orders;
  } catch (error) {
    console.error('Error fetching all accepted orders:', error);
    throw new Error('Error fetching all accepted orders');
  }
};

const getAllCancelledOrders = async (): Promise<OrderType[]> => {
  try {
    const orders = await Order.find({ status: StatusEnum.CANCELLED })
      .select('-__v -createdAt -updatedAt')
      .sort({ 'historyTime.orderedTime': -1 });

    return orders;
  } catch (error) {
    console.error('Error fetching all cancelled orders:', error);
    throw new Error('Error fetching all cancelled orders');
  }
};

const getAllDeliveredOrders = async (): Promise<OrderType[]> => {
  try {
    const orders = await Order.find({ status: StatusEnum.DELIVERED })
      .select('-__v -createdAt -updatedAt')
      .sort({ 'historyTime.orderedTime': -1 });

    return orders;
  } catch (error) {
    console.error('Error fetching all delivered orders:', error);
    throw new Error('Error fetching all delivered orders');
  }
};

const getAllOrders = async (): Promise<OrderType[]> => {
  try {
    const orders = await Order.find({})
      .select('-__v -createdAt -updatedAt')
      .sort({ 'historyTime.orderedTime': -1 });

    return orders;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw new Error('Error fetching all orders');
  }
};

const changeOrderStatusByAdmin = async (orderId: string, newStatus: StatusEnum): Promise<OrderType | null> => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = newStatus;
    order.historyTime.updatedTime = new Date();
    const updatedOrder = await order.save();
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order status by admin:', error);
    throw error;
  }
};

export {
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
};
