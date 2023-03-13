"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const post_1 = require("../model/post");
class PostService {
    constructor() {
        this.getAll1 = async () => {
            let sql = `select * from post p join user u on p.idUser = u.idUser`;
            let posts = await this.postRepository.query(sql);
            console.log(posts);
            if (!posts) {
                return 'No posts found';
            }
            return posts;
        };
        this.save = async (post) => {
            return this.postRepository.save(post);
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
        this.postRepository = data_source_1.AppDataSource.getRepository(post_1.Post);
    }
}
exports.default = new PostService();
//# sourceMappingURL=PostService.js.map