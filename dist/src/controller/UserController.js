"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const PostService_1 = __importDefault(require("../service/PostService"));
class UserController {
    constructor() {
        this.showSellerProfile = async (req, res) => {
            try {
                let id = req.params;
                let response = await this.postServices.checkSeller(id.id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.showMyProfile = async (req, res) => {
            try {
                let id = req.params;
                let response = await this.userServices.getMyProfile(id.id);
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
                console.log(e);
                res.status(500).json(e.message);
            }
        };
        this.register = async (req, res) => {
            try {
                let user = await this.userServices.register1(req.body);
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
        this.checkRequest = async (req, res) => {
            try {
                let id = req.params.id;
                let response = await this.userServices.userRequest(id);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.userServices = UserService_1.default;
        this.postServices = PostService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map