import { Request, Response } from "express";
declare class AdminController {
    private userServices;
    constructor();
    getAllUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    lockUser: (req: any, res: any) => Promise<any>;
    remove: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: AdminController;
export default _default;
