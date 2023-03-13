"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_router_1 = require("./user-router");
const admin_router_1 = require("./admin-router");
const post_router_1 = require("./post-router");
exports.router = (0, express_1.Router)();
exports.router.use('/users', user_router_1.userRouter);
exports.router.use('/admins', admin_router_1.adminRouter);
exports.router.use('/post', post_router_1.postRouter);
//# sourceMappingURL=router.js.map