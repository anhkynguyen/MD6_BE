import {User} from "../model/user";
import {AppDataSource} from "../data-source";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {SECRET} from "../middleware/auth";
import * as nodemailer from 'nodemailer';


class UserServices {
    private userRepository;


    constructor() {
        this.userRepository = AppDataSource.getRepository(User)


    }

    getAll1 = async () => {
        let sql = `select *
                   from user
                   where role = 'user'`
        let users = await this.userRepository.query(sql);
        return users;
    }


    getUserRequest = async () => {
        let sql = `select *
                   from user
                   where category = 'Wait'`
        let users = await this.userRepository.query(sql);
        return users;
    }


    getWaitUser = async () => {
        let sql = `select *
                   from user
                   where category = 'Wait'`
        let users = await this.userRepository.query(sql);
        return users;
    }


    getMyProfile = async (idUser) => {
        let users = await this.userRepository.findOneBy({idUser: idUser});
        return users;
    }

    checkOldPassword = async (idUser, password) => {
        let userCheck = await this.userRepository.findOneBy({idUser: idUser});
        if (!userCheck) {
            return "User not found";
        } else {
            let passwordCompare = await bcrypt.compare(password, userCheck.password);
            if (passwordCompare) {
                return true;
            } else {
                return false;
            }
        }
    }

    checkNewPassword = async (idUser, password) => {
        let userCheck = await this.userRepository.findOneBy({idUser: idUser});
        if (!userCheck) {
            return "User not found";
        } else {
            let passwordCompare = await bcrypt.compare(password, userCheck.password);
            if (passwordCompare) {
                return true;
            } else {
                return false;
            }
        }
    }

    changePassword = async (idUser, password) => {
        let user = await this.userRepository.findOneBy({idUser: idUser});
        if (!user) {
            return "User not found";
        } else {
            user.password = await bcrypt.hash(password, 10);
            return this.userRepository.update({idUser: idUser}, user);
        }
    }

    register1 = async (user) => {
        let userCheck = await this.userRepository.findOneBy({username: user.username});
        if (userCheck) {
            return "Username already registered";
        }
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepository.save(user)
    }

    checkUser = async (user) => {
        let userCheck = await this.userRepository.findOneBy({username: user.username});
        if (!userCheck) {
            return "User not found";
        } else {
            if (userCheck.status === 'lock' || userCheck.category === 'Wait') {
                return "your account has been locked";
            } else {
                let passwordCompare = await bcrypt.compare(user.password, userCheck.password);
                if (!passwordCompare) {
                    return "Wrong password"
                } else {
                    let payload = {
                        idUser: userCheck.idUser,
                        username: userCheck.username,
                        role: userCheck.role
                    }
                    const token = jwt.sign(payload, SECRET, {
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
                        ask: userCheck.ask,
                        category: userCheck.category,
                        status: userCheck.status
                    }
                    return userRes;
                }
            }
        }


    }


    offline1 = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id})
        if (!checkUser) {
            return null
        } else {
            if (checkUser.status === 'active') {
                checkUser.status = 'off'
                await this.userRepository.save(checkUser)

            } else {
                checkUser.status = 'active'
                await this.userRepository.save(checkUser)

            }
        }

    }


    changeStatus = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id})
        if (!checkUser) {
            return null
        } else {
            if (checkUser.status === 'active') {
                checkUser.status = 'lock'
                await this.userRepository.save(checkUser)

            } else if (checkUser.status === 'lock') {
                checkUser.status = 'active'
                await this.userRepository.save(checkUser)

            } else {
                return 'account is offline'
            }
        }

    }


    changeCategory = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id})
        if (!checkUser) {
            return null
        } else {
            if (checkUser.category === 'Wait') {
                checkUser.category = 'Add'
                await this.userRepository.save(checkUser)

                let email = checkUser.gmail
                console.log(111111111111,email)
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


            }

        }

    }


    // edit = async (id, user) => {
    //     let checkUser = await this.userRepository.findOneBy({idUser :id})
    //     if(!checkUser) {
    //         return null
    //     }
    //     user.password = checkUser.password;
    //     await this.userRepository.update({idUser : id},user)
    //     checkUser = await this.userRepository.findOneBy({idUser : id})
    //     let payload = {
    //         idUser: checkUser.idUser,
    //         username: checkUser.username,
    //         role: checkUser.role
    //     }
    //     const token = jwt.sign(payload, SECRET, {
    //         expiresIn: 36000000
    //     });
    //     let userRes = {
    //         idUser: checkUser.idUser,
    //         username: checkUser.username,
    //         role: checkUser.role,
    //         avatar: checkUser.avatar,
    //         token : token
    //     }
    //     return userRes;
    // }
    //
    removeUser1 = async (id) => {
        let user = await this.userRepository.findOneBy({idUser: id});
        if (!user) {
            return null;
        }
        return this.userRepository.delete({idUser: id})
    }


    userRequest = async (id) => {
        let checkUser = await this.userRepository.findOneBy({idUser: id})
        if (!checkUser) {
            return null
        } else {
            if (checkUser.ask === 'No') {
                checkUser.ask = 'Yes'
                await this.userRepository.save(checkUser)

            }
        }

    }


    changeRole = async (id) => {
        console.log(2222222222)
        let checkUser = await this.userRepository.findOneBy({idUser: id})
        if (!checkUser) {
            return null
        } else {
            const d = new Date();
            let year = d.getFullYear();

            console.log(year - checkUser.birthday.split('-')[0])
            if (checkUser.role === 'user' && year - checkUser.birthday.split('-')[0] > 18) {
                checkUser.role = 'seller'
                await this.userRepository.save(checkUser)
                return " Bạn đã đăng ký thành công"
            } else {
                return 'Bạn chưa đủ tuổi'
            }
        }

    }


}

export default new UserServices();