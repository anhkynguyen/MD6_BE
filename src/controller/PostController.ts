
import {Request, Response} from "express";

import PostService from "../service/PostService";



class PostController {
    private postService;


    constructor() {
        this.postService = PostService;

    }

    getAllSong = async (req: Request, res: Response) => {
        try {
            let data;
            let orders;
            let posts = await this.postService.getAll1();

            if (req["decoded"]) {

                data = [posts,orders];
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
                res.status(200).json(post);
            }
            else {
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

            let check = await this.postService.checkUser1(idUser,idPost);


            if (check === true && (req["decoded"].role === 'seller')) {
                let songs = await this.postService.removePost1(idPost);
                res.status(200).json(songs);
            }
            else {
                res.status(401).json('invalid');
            }
        } catch (e) {
            res.status(500).json(e.message)
        }

    }










    // findByIdSong = async (req: Request, res: Response) => {
    //     try {
    //         let idSong = req.params.idSong
    //         let songs = await songService.findById(idSong);
    //         res.status(200).json(songs)
    //     } catch (e) {
    //         res.status(500).json(e.message)
    //     }
    // }
    // findCategory = async (req: Request, res: Response) => {
    //     try {
    //         let categories= await categoryService.getAllCategory();
    //         res.status(200).json(categories)
    //     } catch (e) {
    //         res.status(500).json(e.message)
    //     }
    //
    // }
    // searchNameSong = async (req: Request,res: Response) => {
    //
    //     try{
    //         let songs = await this.songService.findByNameSong(req.params.nameSong)
    //         res.status(200).json(songs)
    //     }catch (e){
    //         res.status(500).json(e.message)
    //     }
    //
    // }
    //
    // findSongByIdUser = async (req: Request,res: Response) =>{
    //     try {
    //         let songs = await this.songService.findSongByIdUser(req.params.idUser)
    //         return res.status(200).json(songs)
    //     } catch (err) {
    //         res.status(500).json(err.message)
    //     }
    // }
    // countSong = async (req: Request,res: Response)=> {
    //     try {
    //         let idSong = req.params.idSong
    //         let counts = await this.songService.checkCount(idSong)
    //         res.status(200).json(counts)
    //     } catch (err) {
    //         res.status(500).json(err.message)
    //     }
    // }
    //
    // findSongByName = async (req: Request,res: Response) => {
    //     try {
    //         let playlists;
    //         let data;
    //         let name = req.query.name
    //         let songs = await this.songService.findSongByName(name)
    //         let categories = await categoryService.getAllCategory();
    //         if (req["decoded"]) {
    //             playlists = await playlistService.getMyPlaylist(req["decoded"].idUser);
    //             data = [songs, categories, playlists];
    //         } else {
    //             data = [songs, categories];
    //         }
    //         res.status(200).json(data)
    //     } catch (err) {
    //         res.status(500).json(err.message)
    //     }
    // }
    //
    // findSong = async (req: Request,res: Response) => {
    //     try {
    //         let name = req.query.name
    //         let songs = await this.songService.findSongByName(name)
    //         let categories = await categoryService.getAllCategory();
    //         let data = [songs, categories];
    //         res.status(200).json(data)
    //     } catch (err) {
    //         res.status(500).json(err.message)
    //     }
    // }
}

export default new PostController();