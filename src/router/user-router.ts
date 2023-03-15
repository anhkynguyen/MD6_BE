import {Router} from "express";

import UserController from "../controller/UserController";



export const userRouter = Router();
userRouter.post('/register',UserController.register)

userRouter.post('/login',UserController.login)
userRouter.get('/off/:id', UserController.checkOff)
userRouter.get('/showMyProfile/:id', UserController.showMyProfile)
userRouter.get('/userRequest/:id', UserController.checkRequest)

