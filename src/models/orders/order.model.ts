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

export {addOrder,getDoneOrders,getRunningOrders};