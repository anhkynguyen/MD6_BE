"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = __importDefault(require("../service/PostService"));
class PostController {
    constructor() {
        this.findByIdPost = async (req, res) => {
            try {
                let idPost = req.params.id;
                let post = await this.postService.findById(idPost);
                res.status(200).json(post);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getAllPosts = async (req, res) => {
            try {
                let data;
                let orders;
                let posts = await this.postService.getAll1();
                if (req["decoded"]) {
                    data = [posts, orders];
                }
                else {
                }
                res.status(200).json(posts);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.createPost = async (req, res) => {
            try {
                let posts = await this.postService.save(req.body);
                let a = posts.date.getTime();
                res.status(200).json(posts);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.editPost = async (req, res) => {
            try {
                let idPost = req.params.idPost;
                let idUser = req["decoded"].idUser;
                let check = await this.postService.checkUser1(idUser, idPost);
                if (check === true && (req["decoded"].role === 'seller')) {
                    let post = await this.postService.updatePost(idPost, req.body);
                    res.status(200).json(post);
                }
                else {
                    res.status(401).json('invalid');
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.removePost = async (req, res) => {
            try {
                let idPost = req.params.idPost;
                let idUser = req["decoded"].idUser;
                let check = await this.postService.checkUser1(idUser, idPost);
                if (check === true && (req["decoded"].role === 'seller')) {
                    let songs = await this.postService.removePost1(idPost);
                    res.status(200).json(songs);
                }
                else {
                    res.status(401).json('invalid');
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.getLimitPost = async (req, res) => {
            try {
                let posts = await this.postService.get12Post();
                res.status(200).json(posts);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.postService = PostService_1.default;
    }
}
exports.default = new PostController();
//# sourceMappingURL=PostController.js.map