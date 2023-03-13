"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const nodemailer = __importStar(require("nodemailer"));
class UserController {
    constructor() {
        this.showMyProfile = async (req, res) => {
            try {
                let response = await this.userServices.getMyProfile(req.params.idUser);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.checkOldPassword = async (req, res) => {
            try {
                let response = await this.userServices.checkOldPassword(req.params.idUser, req.body.password);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.checkNewPassword = async (req, res) => {
            try {
                let response = await this.userServices.checkNewPassword(req.params.idUser, req.body.password);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.changePassword = async (req, res) => {
            try {
                let checkOldPassword = await this.userServices.checkOldPassword(req.params.idUser, req.body.oldPassword);
                let checkNewPassword = await this.userServices.checkNewPassword(req.params.idUser, req.body.newPassword);
                if (checkOldPassword === "User not found") {
                    return res.status(200).json("User not found");
                }
                else if (!checkOldPassword) {
                    return res.status(200).json("Old password does not match");
                }
                else {
                    if (checkNewPassword === "User not found") {
                        return res.status(200).json("User not found");
                    }
                    else if (checkNewPassword) {
                        return res.status(200).json("New password is match with old password");
                    }
                    else {
                        await this.userServices.changePassword(req.params.idUser, req.body.newPassword);
                        return res.status(200).json("Success");
                    }
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.register = async (req, res) => {
            try {
                let user = await this.userServices.register1(req.body);
                let email = req.body.gmail;
                console.log(111111111111);
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: 'tranhoangloc502@gmail.com',
                        pass: 'enlixpabkfmylwhr',
                    },
                });
                await transporter.sendMail({
                    from: 'tranhoangloc502@gmail.com',
                    to: `${email}`,
                    subject: 'Đăng ký thành công',
                    text: 'Chúc mừng! Bạn đã đăng ký thành công.',
                }, (error, info) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent: ' + 'lalalalala');
                    }
                });
                return res.status(201).json(user);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.login = async (req, res) => {
            try {
                let response = await this.userServices.checkUser(req.body);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.checkOff = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.userServices.offline1(id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.userServices = UserService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map