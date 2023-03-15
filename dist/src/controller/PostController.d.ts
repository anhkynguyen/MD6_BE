import { Request, Response } from "express";
declare class PostController {
    private postService;
    constructor();
    findByIdPost: (req: Request, res: Response) => Promise<void>;
    getAllPosts: (req: Request, res: Response) => Promise<void>;
    createPost: (req: Request, res: Response) => Promise<void>;
    editPost: (req: Request, res: Response) => Promise<void>;
    removePost: (req: Request, res: Response) => Promise<void>;
    getLimitPost: (req: Request, res: Response) => Promise<void>;
}
declare const _default: PostController;
export default _default;
