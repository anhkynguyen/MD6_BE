"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderService_1 = __importDefault(require("../service/OrderService"));
const ProvisionService_1 = __importDefault(require("../service/ProvisionService"));
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
                let price = await this.provisionService.getPrice(order.idProvision);
                let checkOrder = await this.orderService.getOrderInDay(order.idPost, order.starTime);
                let x = new Date(order.endTime);
                let y = new Date(order.starTime);
                order.dateOfOrder = new Date();
                if (y > x) {
                    console.log(55555555, false);
                }
                else {
                    console.log(66666666666, true);
                }
                let z = (x.getMinutes() - y.getMinutes());
                if (y > x) {
                    res.json("chonj sai roi");
                }
                else {
                    if (checkOrder == false) {
                        res.json(" Bạn chưa thể thuê dịch vụ");
                    }
                    else if (checkOrder == true) {
                        if (y.getDate() > (order.dateOfOrder).getDate()) {
                            if (z === 0) {
                                order.total = ((x.getDate() - y.getDate()) * 24 + (x.getHours() - y.getHours())) * price;
                                order = await this.orderService.saveOrder(req.body);
                                res.status(200).json(order);
                            }
                            else if (z === 30) {
                                order.total = ((x.getDate() - y.getDate()) * 24 + (x.getHours() - y.getHours())) * price + 35000;
                                order = await this.orderService.saveOrder(req.body);
                                res.status(200).json(order);
                            }
                            else if (+y.getDate === (order.dateOfOrder).getDate()) {
                                if (y.getHours() > (order.dateOfOrder).getHours()) {
                                    if (z === 0) {
                                        order.total = ((x.getDate() - y.getDate()) * 24 + (x.getHours() - y.getHours())) * price;
                                        order = await this.orderService.saveOrder(req.body);
                                        res.status(200).json(order);
                                    }
                                    else if (z === 30) {
                                        order.total = ((x.getDate() - y.getDate()) * 24 + (x.getHours() - y.getHours())) * price + 35000;
                                        order = await this.orderService.saveOrder(req.body);
                                        res.status(200).json(order);
                                    }
                                }
                                else {
                                    res.json('starTime is false');
                                }
                                res.json('Hãy chọn lại ngày thuê dịch vụ');
                            }
                        }
                    }
                }
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
        this.provisionService = ProvisionService_1.default;
    }
}
exports.default = new OrderController();
//# sourceMappingURL=OrderController.js.map