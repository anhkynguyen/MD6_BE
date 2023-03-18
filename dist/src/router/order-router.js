"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const OrderController_1 = __importDefault(require("../controller/OrderController"));
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.use(auth_1.auth);
exports.orderRouter.get('', OrderController_1.default.getAllOrders);
exports.orderRouter.get('/showOrderInUser/:id', OrderController_1.default.getOrdersInUser);
exports.orderRouter.get('/showOrderInSeller/:id', OrderController_1.default.getOrdersInSeller);
exports.orderRouter.post('/add', OrderController_1.default.createOrder);
exports.orderRouter.put('/changeStatusOrder/:id', OrderController_1.default.checkStatusOrder);
//# sourceMappingURL=order-router.js.map