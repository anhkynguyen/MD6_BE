"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const PostService_1 = __importDefault(require("../service/PostService"));
class UserController {
    constructor() {
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
        this.changePassword1 = async (req, res) => {
            try {
                let checkOldPassword = await this.userServices.checkOldPassword1(req.params.id, req.body.oldPassword);
                if (checkOldPassword === "User not found") {
                    return res.status(200).json("User not found");
                }
                else if (checkOldPassword === false) {
                    return res.status(200).json("Old password not true");
                }
                else {
                    await this.userServices.changePassword(req.params.id, req.body.newPassword);
                    return res.status(200).json("Success");
                }
            }
            catch (e) {
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
            console.log(1111111111111, req.body);
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
        this.findByName = async (req, res) => {
            try {
                let name = req.params.name;
                let response = await this.userServices.findByNameService(name);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByGender = async (req, res) => {
            try {
                let gender = req.params.gender;
                let response = await this.userServices.findByGenderService(gender);
                return res.status(200).json(response);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findByBirthday = async (req, res) => {
            try {
                let yearOne = req.body.yearOne;
                let yearSecond = req.body.yearSecond;
                let response = await this.userServices.findByBirthdayService(yearOne, yearSecond);
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