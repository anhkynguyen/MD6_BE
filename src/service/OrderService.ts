import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Orders} from "../model/order";


class OrderService {
    private orderRepository


    constructor() {
        this.orderRepository = AppDataSource.getRepository(Orders);


    }

    getAllOrderService = async () => {
        let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                            join provision pr on o.idProvision = pr.idProvision
        `
        let orders = await this.orderRepository.query(sql);
        console.log(orders)
        if (!orders) {
            return 'No posts found'
        }
        return orders;
    }


    getOrderInUserService = async (id) => {

        let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                            join provision pr on o.idProvision = pr.idProvision
                   where o.idUser = ${id}`

        let orders = await this.orderRepository.query(sql);


        if (!orders) {
            return 'No posts found'
        }
        return orders;
    }


    getOrderInSellerService = async (id) => {

        let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                            join provision pr on o.idProvision = pr.idProvision
                   where o.idPost = ${id}`

        let orders = await this.orderRepository.query(sql);

        if (!orders) {
            return 'No posts found'
        }
        return orders;
    }


    saveOrder = async (order) => {
        return this.orderRepository.save(order);
    };


    changeStatusOrder = async (id) => {
        let checkOrder = await this.orderRepository.findOneBy({idOrder: id})
        if (!checkOrder) {
            return null
        } else {
            if (checkOrder.status === 'Wait') {
                checkOrder.status = 'Approved'
                await this.orderRepository.save(checkOrder)


            }
        }

    }


    getOrderInDay = async (id, time) => {


        let sql = `select *
                   from orders o
                            join post p on o.idPost = p.idPost
                            join user u on p.idUser = u.idUser
                            join provision pr on o.idProvision = pr.idProvision
                   where o.idPost = ${id}
                     and o.endTime > '${time}'`

        let orders = await this.orderRepository.query(sql);
        if (orders.length == 0) {
            return true
        } else {
            return false
        }
    }


}

export default new OrderService();