import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Post} from "../model/post";
import {User} from "../model/user";


class PostService {
    private postRepository
    private userRepository


    constructor() {
        this.postRepository = AppDataSource.getRepository(Post);
        this.userRepository = AppDataSource.getRepository(User);

    }

    getAll2 = async () => {
        let sql = `select *
                   from post p
                            join user u on p.idUser = u.idUser
                   where NOT u.status = 'off'`;
        let posts = await this.postRepository.query(sql);
        console.log(posts)
        if (!posts) {
            return 'No posts found'
        }
        return posts;
    }

    findById = async (id) => {
        let sql = `select *
                   from user u
                            join post p on u.idUser = p.idUser
                   where p.idPost = ${id}`;
        let post = await this.postRepository.query(sql)
        return post;
    }


    save = async (post) => {
        return this.postRepository.save(post);
    };


    get12Post = async () => {
        let sql = `SELECT *
                   FROM post
                   ORDER BY date DESC limit 12`;
        return this.postRepository.query(sql)

    }


    updatePost = async (idPost, newPost) => {


        let post = await this.postRepository.findOneBy({idPost: idPost})


        if (!post) {
            return null
        }

        await this.postRepository.update({idPost: idPost}, newPost)
        return newPost.idUser;
    }


    removePost1 = async (idPost) => {
        let posts = await this.postRepository.findOneBy({idPost: idPost});
        if (!posts) {
            return null
        }
        await this.postRepository.delete({idPost: idPost});
        return posts.idUser;
    }


    checkUser1 = async (idUser, idPost) => {
        let sql = `select u.idUser
                   from user u
                            join post p on p.idUser = u.idUser

                   where p.idPost = ${idPost}`;
        let checkIdUser = await this.postRepository.query(sql);


        if (checkIdUser[0].idUser === idUser) {
            return true;
        }
        return false;
    }


    checkSeller = async (idPost) => {
        let sql = `select u.idUser
                   from user u
                            join post p on p.idUser = u.idUser

                   where p.idPost = ${idPost}`;
        let idUser = await this.postRepository.query(sql);

        let users = await this.userRepository.findOneBy({idUser: idUser[0].idUser});

        return users
    }


}

export default new PostService();