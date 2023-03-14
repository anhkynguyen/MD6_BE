import {Request, Response} from "express";
import UserService from "../service/UserService";
import * as nodemailer from 'nodemailer';


class UserController {
    private userServices;


    constructor() {
        this.userServices = UserService;

    }


    showMyProfile = async (req: Request, res: Response) => {
        try {
            let id = req.params
            console.log(6666666666666,id.id)
            let response = await this.userServices.getMyProfile(id.id);
            return res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    checkOldPassword = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.checkOldPassword(req.params.idUser, req.body.password);
            return res.status(200).json(response);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    checkNewPassword = async (req: Request, res: Response) => {
        try {
            let response = await this.userServices.checkNewPassword(req.params.idUser, req.body.password);
            return res.status(200).json(response);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    changePassword = async (req: Request, res: Response) => {
        try {
            let checkOldPassword = await this.userServices.checkOldPassword(req.params.idUser, req.body.oldPassword)
            let checkNewPassword = await this.userServices.checkNewPassword(req.params.idUser, req.body.newPassword)
            if (checkOldPassword === "User not found") {
                return res.status(200).json("User not found");
            } else if (!checkOldPassword) {
                return res.status(200).json("Old password does not match");
            } else {
                if (checkNewPassword === "User not found") {
                    return res.status(200).json("User not found");
                } else if (checkNewPassword) {
                    return res.status(200).json("New password is match with old password");
                } else {
                    await this.userServices.changePassword(req.params.idUser, req.body.newPassword)
                    return res.status(200).json("Success")
                }
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    register = async (req: Request, res: Response) => {


        try {
            let user = await this.userServices.register1(req.body);


            let email = req.body.gmail
            console.log(111111111111)
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: 'tranhoangloc502@gmail.com', // Địa chỉ email của bạn
                    pass: 'enlixpabkfmylwhr', // Mật khẩu của bạn

                },
            });



// // Gửi email
            await transporter.sendMail({
                    from: 'tranhoangloc502@gmail.com', // Địa chỉ email của bạn
                    to: `${email}`, // Địa chỉ email của người nhận
                    subject: 'Đăng ký thành công',
                    text: 'Chúc mừng! Bạn đã đăng ký thành công.',
                },
                (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + 'lalalalala');
                    }
                });



            return res.status(201).json(user)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }





    login = async (req: Request, res: Response) => {


        try {
            let response = await this.userServices.checkUser(req.body)

            return res.status(200).json(response)


        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    // editUser = async (req: Request, res: Response) => {
    //     try {
    //         let user = await this.userServices.edit(req.params.idUser, req.body);
    //         return res.status(201).json(user)
    //     } catch (e) {
    //         res.status(500).json(e.message)
    //     }
    // }

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












}


export default new UserController();