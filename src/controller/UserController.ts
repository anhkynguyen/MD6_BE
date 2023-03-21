import {Request, Response} from "express";
import UserService from "../service/UserService";
import PostService from "../service/PostService";


class UserController {
    private userServices;
    private postServices;


    constructor() {
        this.userServices = UserService;
        this.postServices = PostService;

    }


    showMyProfile = async (req: Request, res: Response) => {
        try {
            let id = req.params

            let response = await this.userServices.getMyProfile(id.id);
            return res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    showSellerProfile = async (req: Request, res: Response) => {
        try {
            let id = req.params

            let response = await this.postServices.checkSeller(id.id);
            return res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    changePassword1 = async (req: Request, res: Response) => {

        try {
            let checkOldPassword = await this.userServices.checkOldPassword1(req.params.id, req.body.oldPassword)
            if (checkOldPassword === "User not found") {
                return res.status(200).json("User not found");
            } else if (checkOldPassword === false) {
                return res.status(200).json("Old password not true");
            } else {
                await this.userServices.changePassword(req.params.id, req.body.newPassword)
                return res.status(200).json("Success")
            }

        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    register = async (req: Request, res: Response) => {


        try {
            let user = await this.userServices.register1(req.body);

            return res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    login = async (req: Request, res: Response) => {
        console.log(1111111111111,req.body)


        try {
            let response = await this.userServices.checkUser(req.body)

            return res.status(200).json(response)


        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    checkOff = async (req, res) => {
        try {
            let id = req.params.id
            let response = await this.userServices.offline1(id)
            return res.status(200).json(response)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    checkRequest = async (req, res) => {
        try {
            let id = req.params.id
            let response = await this.userServices.userRequest(id)
            return res.status(200).json(response)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    findByName = async (req, res) => {
        try {
            let name = req.params.name
            let response = await this.userServices.findByNameService(name)
            return res.status(200).json(response)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    findByGender = async (req, res) => {
        try {
            let gender = req.params.gender
            let response = await this.userServices.findByGenderService(gender)
            return res.status(200).json(response)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


    findByBirthday = async (req, res) => {
        try {
            let yearOne = req.body.yearOne
            let yearSecond = req.body.yearSecond
            let response = await this.userServices.findByBirthdayService(yearOne, yearSecond)
            return res.status(200).json(response)

        } catch (e) {
            res.status(500).json(e.message)
        }
    }


}


export default new UserController();