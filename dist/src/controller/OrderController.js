"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderService_1 = __importDefault(require("../service/OrderService"));
class OrderController {
    constructor() {
        this.getAllOrders = async (req, res) => {
            try {
                let data;
                let orders = await this.orderService.getAllOrderService();
                if (req["decoded"]) {
                    data = [orders];
                }
                else {
                }
                res.status(200).json(orders);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getOrdersInUser = async (req, res) => {
            try {
                let id = req.params;
                let orders = await this.orderService.getOrderInUserService(id.id);
                res.status(200).json(orders);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getOrdersInSeller = async (req, res) => {
            try {
                let id = req.params;
                let orders = await this.orderService.getOrderInSellerService(id.id);
                res.status(200).json(orders);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createOrder = async (req, res) => {
            try {
                let order = req.body;
                order.total = order.time * 70000;
                order = await this.orderService.saveOrder(req.body);
                res.status(200).json(order);
            }
            catch (e) {
                console.log(e);
                res.status(500).json(e.message);
            }
        };
        this.checkStatusOrder = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.orderService.changeStatusOrder(id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.orderService = OrderService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=OrderController.js.map