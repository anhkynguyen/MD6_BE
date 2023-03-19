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
        let sql = `select * from post p join user u on p.idUser = u.idUser`;
        let posts = await this.postRepository.query(sql);
        console.log(posts)
        if (!posts) {
            return 'No posts found'
        }
        return posts;
    }

    findById = async (id) => {
        let sql = `select * from user u join post p on u.idUser = p.idUser  where p.idPost = ${id}`;
        let post = await this.postRepository.query(sql)
        return post;
    }



    save = async (post) => {
        return this.postRepository.save(post);
    };


    get12Post = async () => {
        let sql = `SELECT * FROM post ORDER BY date DESC limit 12`;
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
    // findByNameSong = async (value) => {
    //     let sql = `select *
    //                    from album
    //                             join song s on album.idAlbum = s.idAlbum where s.nameSong like '%${value}%'`
    //     let songs = await this.songRepository.query(sql);
    //     console.log(songs)
    //     if(!songs){
    //         return null;
    //     }
    //     return songs;
    //
    // }
    //
    // findSongByIdUser = async (id) => {
    //     let sql = `select *
    //                from song
    //                         join album a on song.idAlbum = a.idAlbum
    //                         join user u on a.idUser = u.idUser
    //                where a.idUser = ${id}`
    //     let songs = this.songRepository.query(sql)
    //     return songs
    // }
    //


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


    checkSeller = async ( idPost) => {
        let sql = `select u.idUser
                   from user u
                            join post p on p.idUser = u.idUser

                   where p.idPost = ${idPost}`;
      let idUser =  await this.postRepository.query(sql);
        console.log(111111111111,idUser[0].idUser)
        let users = await this.userRepository.findOneBy({idUser: idUser[0].idUser});
        console.log(2222222222222, users)
        return users
    }



    // checkCount = async (idSong)=>{
    //     let songs = await this.songRepository.findOneBy({idSong : idSong});
    //     if (!songs) {
    //         return null;
    //     }
    //     songs.count ++;
    //     return await this.songRepository.update({ idSong: idSong}, songs);
    // }
    //
    // top4Song = async () => {
    //     let sql = `select * from album join song s on album.idAlbum = s.idAlbum join category c on s.idCategory = c.idCategory join user u on album.idUser = u.idUser order by count desc limit 4`;
    //     let songs = await this.songRepository.query(sql);
    //     if (!songs) {
    //         return null;
    //     }
    //     return songs;
    // }
    //
    // findSongByName = async (name) => {
    //     let sql = `select * from album join song s on album.idAlbum = s.idAlbum join category c on s.idCategory = c.idCategory join user u on album.idUser = u.idUser where nameSong like "%${name}%"`;
    //     let songs = await this.songRepository.query(sql);
    //     if (!songs) {
    //         return null;
    //     }
    //     return songs;
    // }

}

export default new PostService();