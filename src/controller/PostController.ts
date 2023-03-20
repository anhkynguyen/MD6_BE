import {Request, Response} from "express";

import PostService from "../service/PostService";
import postService from "../service/PostService";


class PostController {
    private postService;


    constructor() {
        this.postService = PostService;

    }

    getAllPosts = async (req: Request, res: Response) => {
        try {
            let data;
            let orders;
            let posts = await this.postService.getAll2();

            if (req["decoded"]) {

                data = [posts, orders];
            } else {
                // data = [posts];

            }
            res.status(200).json(posts);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    createPost = async (req: Request, res: Response) => {
        try {
            let posts = await this.postService.save(req.body);
            res.status(200).json(posts)
        } catch (e) {
            console.log(e)
            res.status(500).json(e.message)
        }

    }

    editPost = async (req: Request, res: Response) => {

        try {
            let idPost = req.params.idPost;
            let idUser = req["decoded"].idUser;

            let check = await this.postService.checkUser1(idUser, idPost);
            if (check === true && (req["decoded"].role === 'seller')) {
                let post = await this.postService.updatePost(idPost, req.body);

                console.log(11111111111, req.body)
                res.status(200).json(post);
            } else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }

    }


    removePost = async (req: Request, res: Response) => {
        try {
            let idPost = req.params.idPost;

            let idUser = req["decoded"].idUser;

            let check = await this.postService.checkUser1(idUser, idPost);


            if (check === true && (req["decoded"].role === 'seller')) {
                let songs = await this.postService.removePost1(idPost);
                res.status(200).json(songs);
            } else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }

    }


    getLimitPost = async (req: Request, res: Response) => {

        try {
            let posts = await this.postService.get12Post()
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }


    findByIdPost = async (req: Request, res: Response) => {
        try {
            console.log(req.params.id)
            let idPost = req.params.id
            let post = await postService.findById(idPost)
            res.status(200).json(post)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

}

export default new PostController();