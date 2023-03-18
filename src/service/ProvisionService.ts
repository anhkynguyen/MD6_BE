import {Request, Response} from "express";
import {AppDataSource} from "../data-source";
import {Provision } from "../model/provision";




class PostService {
    private provisionRepository



    constructor() {
        this.provisionRepository = AppDataSource.getRepository(Provision);


    }

    getAllProvisionService = async () => {
        let sql = `select * from provision`;
        let provisions = await  this.provisionRepository.query(sql);
        // console.log(provisions)
        if (!provisions) {
            return 'No posts found'
        }
        return provisions;
    }





}

export default new PostService();