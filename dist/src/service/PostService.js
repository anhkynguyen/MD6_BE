"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const post_1 = require("../model/post");
const user_1 = require("../model/user");
class PostService {
    constructor() {
        this.getAll2 = async () => {
            let sql = `select * from post p join user u on p.idUser = u.idUser`;
            let posts = await this.postRepository.query(sql);
            console.log(posts);
            if (!posts) {
                return 'No posts found';
            }
            return posts;
        };
        this.findById = async (id) => {
            let sql = `select * from user u join post p on u.idUser = p.idUser  where p.idPost = ${id}`;
            let post = await this.postRepository.query(sql);
            return post;
        };
        this.save = async (post) => {
            return this.postRepository.save(post);
        };
        this.get12Post = async () => {
            let sql = `SELECT * FROM post ORDER BY date DESC limit 12`;
            return this.postRepository.query(sql);
        };
        this.updatePost = async (idPost, newPost) => {
            let post = await this.postRepository.findOneBy({ idPost: idPost });
            if (!post) {
                return null;
            }
            await this.postRepository.update({ idPost: idPost }, newPost);
            return newPost.idUser;
        };
        this.removePost1 = async (idPost) => {
            let posts = await this.postRepository.findOneBy({ idPost: idPost });
            if (!posts) {
                return null;
            }
            await this.postRepository.delete({ idPost: idPost });
            return posts.idUser;
        };
        this.checkUser1 = async (idUser, idPost) => {
            let sql = `select u.idUser
                      from user u
                         join post p on p.idUser = u.idUser

                where p.idPost = ${idPost}`;
            let checkIdUser = await this.postRepository.query(sql);
            if (checkIdUser[0].idUser === idUser) {
                return true;
            }
            return false;
        };
        this.checkSeller = async (idPost) => {
            let sql = `select u.idUser
                   from user u
                            join post p on p.idUser = u.idUser

                   where p.idPost = ${idPost}`;
            let idUser = await this.postRepository.query(sql);
            console.log(111111111111, idUser[0].idUser);
            let users = await this.userRepository.findOneBy({ idUser: idUser[0].idUser });
            console.log(2222222222222, users);
            return users;
        };
        this.postRepository = data_source_1.AppDataSource.getRepository(post_1.Post);
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new PostService();
//# sourceMappingURL=PostService.js.map