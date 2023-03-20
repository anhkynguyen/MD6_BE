import {Request, Response} from "express";

import OrderService from "../service/OrderService";
import ProvisionService from "../service/ProvisionService";


class OrderController {
    private orderService;
    private provisionService;


    constructor() {
        this.orderService = OrderService;
        this.provisionService = ProvisionService;


    }

    getAllOrders = async (req: Request, res: Response) => {
        try {
            let data;

            let orders = await this.orderService.getAllOrderService();

            if (req["decoded"]) {

                data = [orders];
            } else {
                // data = [posts];

            }
            res.status(200).json(orders);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    getOrdersInUser = async (req: Request, res: Response) => {
        try {
            let id = req.params
            let orders = await this.orderService.getOrderInUserService(id.id);


            res.status(200).json(orders);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    getOrdersInSeller = async (req: Request, res: Response) => {
        try {
            let id = req.params


            let orders = await this.orderService.getOrderInSellerService(id.id);


            res.status(200).json(orders);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    createOrder = async (req: Request, res: Response) => {

        try {
            let order = req.body
            let price = await this.provisionService.getPrice(order.idProvision)

            let checkOrder = await this.orderService.getOrderInDay(order.idPost, order.starTime)


            let x = new Date(order.endTime)
            let y = new Date(order.starTime)
            order.dateOfOrder = new Date()
            let z = (x.getMinutes() - y.getMinutes())


            if (checkOrder == false) {
                res.json(" Bạn chưa thể thuê dịch vụ")
            } else if (checkOrder == true) {
                if (y.getDate() > (order.dateOfOrder).getDate()) {
                    if (z === 0) {
                        order.total = ((x.getDate() - y.getDate()) * 24 + (x.getHours() - y.getHours())) * price
                        order = await this.orderService.saveOrder(req.body);
                        res.status(200).json(order)
                    } else if (z === 30) {

                        order.total = ((x.getDate() - y.getDate()) * 24 + (x.getHours() - y.getHours())) * price + 35000
                        order = await this.orderService.saveOrder(req.body);
                        res.status(200).json(order)
                    } else if (+y.getDate === (order.dateOfOrder).getDate()) {
                        if (y.getHours() > (order.dateOfOrder).getHours()) {
                            if (z === 0) {
                                order.total = ((x.getDate() - y.getDate()) * 24 + (x.getHours() - y.getHours())) * price
                                order = await this.orderService.saveOrder(req.body);
                                res.status(200).json(order)
                            } else if (z === 30) {

                                order.total = ((x.getDate() - y.getDate()) * 24 + (x.getHours() - y.getHours())) * price + 35000
                                order = await this.orderService.saveOrder(req.body);
                                res.status(200).json(order)
                            }
                        } else {
                            res.json('starTime is false')
                        }
                        res.json('Hãy chọn lại ngày thuê dịch vụ')
                    }

                }

            }

        } catch (e) {
            console.log(e)
            res.status(500).json(e.message)
        }

    }


    checkStatusOrder = async (req, res) => {
        try {
            let id = req.params.id

            let response = await this.orderService.changeStatusOrder(id)
            return res.status(200).json(response)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new OrderController();