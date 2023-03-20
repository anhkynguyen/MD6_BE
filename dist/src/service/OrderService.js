"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const order_1 = require("../model/order");
class OrderService {
    constructor() {
        this.getAllOrderService = async () => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                            join provision pr on o.idProvision = pr.idProvision
        `;
            let orders = await this.orderRepository.query(sql);
            console.log(orders);
            if (!orders) {
                return 'No posts found';
            }
            return orders;
        };
        this.getOrderInUserService = async (id) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                            join provision pr on o.idProvision = pr.idProvision
                   where o.idUser = ${id}`;
            let orders = await this.orderRepository.query(sql);
            if (!orders) {
                return 'No posts found';
            }
            return orders;
        };
        this.getOrderInSellerService = async (id) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                            join provision pr on o.idProvision = pr.idProvision
                   where o.idPost = ${id}`;
            let orders = await this.orderRepository.query(sql);
            if (!orders) {
                return 'No posts found';
            }
            return orders;
        };
        this.saveOrder = async (order) => {
            return this.orderRepository.save(order);
        };
        this.changeStatusOrder = async (id) => {
            let checkOrder = await this.orderRepository.findOneBy({ idOrder: id });
            if (!checkOrder) {
                return null;
            }
            else {
                if (checkOrder.status === 'Wait') {
                    checkOrder.status = 'Approved';
                    await this.orderRepository.save(checkOrder);
                }
            }
        };
        this.getOrderInDay = async (id, time) => {
            let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                            join provision pr on o.idProvision = pr.idProvision
                   where o.idPost = ${id}
                     and o.endTime > '${time}'`;
            let orders = await this.orderRepository.query(sql);
            if (orders.length == 0) {
                return true;
            }
            else {
                return false;
            }
        };
        this.orderRepository = data_source_1.AppDataSource.getRepository(order_1.Orders);
    }
}
exports.default = new OrderService();
//# sourceMappingURL=OrderService.js.map