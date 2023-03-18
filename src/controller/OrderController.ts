
import {Request, Response} from "express";

import OrderService from "../service/OrderService";



class OrderController {
    private orderService;


    constructor() {
        this.orderService = OrderService;

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


            order.total = order.time*70000
             order = await this.orderService.saveOrder(req.body);



            res.status(200).json(order)
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

    // editPost = async (req: Request, res: Response) => {
    //
    //     try {
    //         let idPost = req.params.idPost;
    //         let idUser = req["decoded"].idUser;
    //
    //         let check = await this.postService.checkUser1(idUser, idPost);
    //         if (check === true && (req["decoded"].role === 'seller')) {
    //             let post = await this.postService.updatePost(idPost, req.body);
    //
    //             console.log(11111111111,req.body)
    //             res.status(200).json(post);
    //         }
    //         else {
    //             res.status(401).json('invalid');
    //         }
    //     } catch (e) {
    //         res.status(500).json(e.message)
    //     }
    //
    // }
    //
    //
    // removePost = async (req: Request, res: Response) => {
    //     try {
    //         let idPost = req.params.idPost;
    //
    //         let idUser = req["decoded"].idUser;
    //
    //         let check = await this.postService.checkUser1(idUser,idPost);
    //
    //
    //         if (check === true && (req["decoded"].role === 'seller')) {
    //             let songs = await this.postService.removePost1(idPost);
    //             res.status(200).json(songs);
    //         }
    //         else {
    //             res.status(401).json('invalid');
    //         }
    //     } catch (e) {
    //         res.status(500).json(e.message)
    //     }
    //
    // }
    //
    //
    //
    //
    // getLimitPost = async (req: Request,res: Response) => {
    //
    //     try{
    //         let posts = await this.postService.get12Post()
    //         res.status(200).json(posts)
    //     }catch (e){
    //         res.status(500).json(e.message)
    //     }
    //
    // }

}

export default new OrderController();