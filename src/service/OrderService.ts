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

        let sql = `select * from orders o
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

        let sql = `select * from orders o
                                     join post p on o.idPost = p.idPost
                                     join user u on p.idUser = u.idUser
                                     join provision pr on o.idProvision = pr.idProvision
                   where  o.idPost  = ${id}`

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
        console.log(1111111111,id)
        let checkOrder = await this.orderRepository.findOneBy({idOrder: id})
        console.log(2222222222,checkOrder)
        if (!checkOrder) {
            return null
        } else {
            if (checkOrder.status === 'Wait') {
                checkOrder.status = 'Approved'
                await this.orderRepository.save(checkOrder)


            }
        }

    }





















}

export default new OrderService();