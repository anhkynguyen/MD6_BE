"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
const data_source_1 = require("../data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
class UserServices {
    constructor() {
        this.getAll1 = async () => {
            let sql = `select * 
                   from  user where role = 'user'`;
            let users = await this.userRepository.query(sql);
            return users;
        };
        this.getUserRequest = async () => {
            let sql = `select * from user where ask = 'Yes'`;
            let users = await this.userRepository.query(sql);
            return users;
        };
        this.getMyProfile = async (idUser) => {
            console.log(7777777777, idUser);
            let users = await this.userRepository.findOneBy({ idUser: idUser });
            return users;
        };
        this.checkOldPassword = async (idUser, password) => {
            let userCheck = await this.userRepository.findOneBy({ idUser: idUser });
            if (!userCheck) {
                return "User not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(password, userCheck.password);
                if (passwordCompare) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        this.checkNewPassword = async (idUser, password) => {
            let userCheck = await this.userRepository.findOneBy({ idUser: idUser });
            if (!userCheck) {
                return "User not found";
            }
            else {
                let passwordCompare = await bcrypt_1.default.compare(password, userCheck.password);
                if (passwordCompare) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        this.changePassword = async (idUser, password) => {
            let user = await this.userRepository.findOneBy({ idUser: idUser });
            if (!user) {
                return "User not found";
            }
            else {
                user.password = await bcrypt_1.default.hash(password, 10);
                return this.userRepository.update({ idUser: idUser }, user);
            }
        };
        this.register1 = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (userCheck) {
                return "Username already registered";
            }
            user.password = await bcrypt_1.default.hash(user.password, 10);
            return this.userRepository.save(user);
        };
        this.checkUser = async (user) => {
            let userCheck = await this.userRepository.findOneBy({ username: user.username });
            if (!userCheck) {
                return "User not found";
            }
            else {
                if (userCheck.status === 'lock') {
                    return "your account has been locked";
                }
                else {
                    let passwordCompare = await bcrypt_1.default.compare(user.password, userCheck.password);
                    if (!passwordCompare) {
                        return "Wrong password";
                    }
                    else {
                        let payload = {
                            idUser: userCheck.idUser,
                            username: userCheck.username,
                            role: userCheck.role
                        };
                        const token = jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                            expiresIn: 36000000
                        });
                        let userRes = {
                            idUser: userCheck.idUser,
                            username: userCheck.username,
                            role: userCheck.role,
                            avatar: userCheck.avatar,
                            token: token,
                            gmail: userCheck.gmail,
                            birthday: userCheck.birthday,
                            gender: userCheck.gender,
                            status: userCheck.status
                        };
                        return userRes;
                    }
                }
            }
        };
        this.offline1 = async (id) => {
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                if (checkUser.status === 'active') {
                    checkUser.status = 'off';
                    await this.userRepository.save(checkUser);
                }
                else {
                    checkUser.status = 'active';
                    await this.userRepository.save(checkUser);
                }
            }
        };
        this.changeStatus = async (id) => {
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                if (checkUser.status === 'active') {
                    checkUser.status = 'lock';
                    await this.userRepository.save(checkUser);
                }
                else if (checkUser.status === 'lock') {
                    checkUser.status = 'active';
                    await this.userRepository.save(checkUser);
                }
                else {
                    return 'account is offline';
                }
            }
        };
        this.removeUser1 = async (id) => {
            let user = await this.userRepository.findOneBy({ idUser: id });
            if (!user) {
                return null;
            }
            return this.userRepository.delete({ idUser: id });
        };
        this.userRequest = async (id) => {
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                if (checkUser.ask === 'No') {
                    checkUser.ask = 'Yes';
                    await this.userRepository.save(checkUser);
                }
            }
        };
        this.changeRole = async (id) => {
            console.log(2222222222);
            let checkUser = await this.userRepository.findOneBy({ idUser: id });
            if (!checkUser) {
                return null;
            }
            else {
                const d = new Date();
                let year = d.getFullYear();
                console.log(year - checkUser.birthday.split('-')[0]);
                if (checkUser.role === 'user' && year - checkUser.birthday.split('-')[0] > 18) {
                    checkUser.role = 'seller';
                    await this.userRepository.save(checkUser);
                    return " Bạn đã đăng ký thành công";
                }
                else {
                    return 'Bạn chưa đủ tuổi';
                }
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
}
exports.default = new UserServices();
//# sourceMappingURL=UserService.js.map