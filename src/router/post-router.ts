import {Router} from "express";
import {adminAuth} from "../middleware/admin";
import {auth} from "../middleware/auth";
import PostController from "../controller/PostController";

export const postRouter = Router();
postRouter.use(auth)

postRouter.get('', PostController.getAllSong)
postRouter.post('/add', PostController.createPost)
postRouter.delete('/remove/:idPost', PostController.removePost)
postRouter.put('/edit/:idPost', PostController.editPost)
