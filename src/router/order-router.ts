import {Router} from "express";
import {auth} from "../middleware/auth";
import OrderController from "../controller/OrderController";



export const orderRouter = Router();
orderRouter.use(auth)

orderRouter.get('',OrderController.getAllOrders)
orderRouter.get('/showOrderInUser/:id',OrderController.getOrdersInUser)  // tag 17 & 18 sprint 2
orderRouter.get('/showOrderInSeller/:id',OrderController.getOrdersInSeller) // tag 7 & 8 sprint 2
orderRouter.post('/add',OrderController.createOrder) // tạo Order
orderRouter.put('/changeStatusOrder/:id',OrderController.checkStatusOrder) // tag 9 chưa gửi tin nhắn cho người thuê
