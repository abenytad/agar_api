import Order,{OrderType,StatusEnum} from "./order.mongo";

const addOrder=async (orderData:OrderType):Promise<OrderType | null>=>{
    return await Order.create(orderData);
}


const getRunningOrders = async (userId: string): Promise<{ _id: string; status?: string; orderedTime: Date }[]> => {
      const orders = await Order.find({ 
        orderedBy: userId,
        status: { $in: [StatusEnum.PENDING, StatusEnum.ACCEPTED] }
      })
      .select('_id status historyTime.orderedTime')
      .sort({ 'historyTime.orderedTime': -1 });
      return orders.map(order => ({
        _id: (order._id as unknown as string),
        status: order.status,
        orderedTime: order.historyTime.orderedTime
      }));
   
  };
  const getDoneOrders = async (userId: string): Promise<{ _id: string; status?: string; orderedTime: Date }[]> => {
    const orders = await Order.find({ 
      orderedBy: userId,
      status: { $in: [StatusEnum.ACCEPTED, StatusEnum.CANCELLED] } 
    })
    .select('_id status historyTime.orderedTime')
    .sort({ 'historyTime.orderedTime': -1 });
    return orders.map(order => ({
      _id: (order._id as unknown as string),
      status: order.status,
      orderedTime: order.historyTime.orderedTime
    }));
 
};
const getOrderDetails = async (orderId: string): Promise<OrderType | null> => {
  try {
    const order = await Order.findOne(
      { _id: orderId },
      { __v: 0, createdAt: 0, updatedAt: 0 } // 
    ).lean(); 

    return order as OrderType | null; 
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

const getAllPendingOrders = async (): Promise<OrderType[] | [] > => {
  const orders = await Order.find({
    status: { $in: [StatusEnum.PENDING]} 
  },{ __v: 0, createdAt: 0, updatedAt: 0 })
  .sort({ 'historyTime.orderedTime': -1 });
  return orders;
};

const getAllAcceptedOrders = async (): Promise<OrderType[] | [] > => {
  const orders = await Order.find({
    status: { $in: [StatusEnum.ACCEPTED]} 
  },{ __v: 0, createdAt: 0, updatedAt: 0 })
  .sort({ 'historyTime.orderedTime': -1 });
  return orders;
};
const getAllCancelledOrders = async (): Promise<OrderType[] | [] > => {
  const orders = await Order.find({
    status: { $in: [StatusEnum.CANCELLED]} 
  },{ __v: 0, createdAt: 0, updatedAt: 0 })
  .sort({ 'historyTime.orderedTime': -1 });
  return orders;
};
const getAllDeliveredOrders = async (): Promise<OrderType[] | [] > => {
  const orders = await Order.find({
    status: { $in: [StatusEnum.DELIVERED]} 
  },{ __v: 0, createdAt: 0, updatedAt: 0 })
  .sort({ 'historyTime.orderedTime': -1 });
  return orders;
};

const getAllOrders = async (): Promise<OrderType[] | [] > => {
  const orders = await Order.find({},{ __v: 0, createdAt: 0, updatedAt: 0 })
  .sort({ 'historyTime.orderedTime': -1 });
  return orders;
};


const changeOrderStatusByAdmin = async (orderId: string,newStatus:StatusEnum): Promise<OrderType | null> => {
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
    console.error('Error updating order status:', error);
    throw error; 
  }
};

export {addOrder,getDoneOrders,getRunningOrders,getOrderDetails,changeStatus,getAllAcceptedOrders,getAllCancelledOrders,getAllDeliveredOrders,getAllPendingOrders,getAllOrders,changeOrderStatusByAdmin};