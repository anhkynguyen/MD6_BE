import { Request, Response } from "express";
declare class UserController {
    private userServices;
    private postServices;
    constructor();
    showMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    showSellerProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    changePassword1: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkOff: (req: any, res: any) => Promise<any>;
    checkRequest: (req: any, res: any) => Promise<any>;
}
declare const _default: UserController;
export default _default;
