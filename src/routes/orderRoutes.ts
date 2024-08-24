import { Router } from "express";
import { createOrder,fetchDoneOrders,fetchRunningOrders,fetchOrderDetails,changeOrderStatus } from "../controllers/order.controller";
const orderRouter: Router = Router();

orderRouter.post('',createOrder);
orderRouter.get('/running/:userId',fetchRunningOrders);
orderRouter.get('/done/:userId',fetchDoneOrders);
orderRouter.get('/details/:orderId',fetchOrderDetails);
orderRouter.put('/changeStatus/:orderId',fetchOrderDetails);
export default orderRouter;