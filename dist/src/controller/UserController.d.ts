import { Request, Response } from "express";
declare class UserController {
    private userServices;
    constructor();
    showMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkOldPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkNewPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    changePassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    checkOff: (req: any, res: any) => Promise<any>;
}
declare const _default: UserController;
export default _default;
