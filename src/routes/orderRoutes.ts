import { Router } from "express";
import { createOrder,fetchDoneOrders,fetchRunningOrders } from "../controllers/order.controller";
const orderRouter: Router = Router();

orderRouter.post('',createOrder);
orderRouter.get('/running/:userId',fetchRunningOrders);
orderRouter.get('/done/:userId',fetchDoneOrders);
export default orderRouter;