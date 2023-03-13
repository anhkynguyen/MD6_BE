"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const PostController_1 = __importDefault(require("../controller/PostController"));
exports.postRouter = (0, express_1.Router)();
exports.postRouter.use(auth_1.auth);
exports.postRouter.get('', PostController_1.default.getAllSong);
exports.postRouter.post('/add', PostController_1.default.createPost);
exports.postRouter.delete('/remove/:idPost', PostController_1.default.removePost);
exports.postRouter.put('/edit/:idPost', PostController_1.default.editPost);
//# sourceMappingURL=post-router.js.map