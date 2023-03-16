"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controller/UserController"));
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/register', UserController_1.default.register);
exports.userRouter.post('/login', UserController_1.default.login);
exports.userRouter.get('/off/:id', UserController_1.default.checkOff);
exports.userRouter.get('/showMyProfile/:id', UserController_1.default.showMyProfile);
exports.userRouter.get('/userRequest/:id', UserController_1.default.checkRequest);
exports.userRouter.get('/showSellerProfile/:id', UserController_1.default.showSellerProfile);
//# sourceMappingURL=user-router.js.map