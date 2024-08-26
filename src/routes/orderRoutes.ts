import { Router } from "express";
import { createOrder,fetchDoneOrders,fetchRunningOrders,fetchOrderDetails,changeOrderStatus, fetchAllOrders, fetchAllDeliveredOrders, fetchAllPendingOrders, fetchAllCancelledOrders, fetchAllAcceptedOrders,changeStatusByAdmin} from "../controllers/order.controller";
const orderRouter: Router = Router();

orderRouter.post('',createOrder);
orderRouter.get('/running/:userId',fetchRunningOrders);
orderRouter.get('/done/:userId',fetchDoneOrders);
orderRouter.get('/details/:orderId',fetchOrderDetails);
orderRouter.put('/changeStatus/:orderId',changeOrderStatus);
orderRouter.get('/accepted',fetchAllAcceptedOrders);
orderRouter.get('/cancelled',fetchAllCancelledOrders);
orderRouter.get('/pending',fetchAllPendingOrders);
orderRouter.get('/delivered',fetchAllDeliveredOrders);
orderRouter.get('/',fetchAllOrders);
orderRouter.put('/:status',changeStatusByAdmin);
export default orderRouter;