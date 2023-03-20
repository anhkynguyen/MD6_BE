import { Request, Response } from "express";
declare class OrderController {
    private orderService;
    private provisionService;
    constructor();
    getAllOrders: (req: Request, res: Response) => Promise<void>;
    getOrdersInUser: (req: Request, res: Response) => Promise<void>;
    getOrdersInSeller: (req: Request, res: Response) => Promise<void>;
    createOrder: (req: Request, res: Response) => Promise<void>;
    checkStatusOrder: (req: any, res: any) => Promise<any>;
}
declare const _default: OrderController;
export default _default;
