import {Router} from "express";
import {adminAuth} from "../middleware/admin";
import {auth} from "../middleware/auth";
import adminController from "../controller/AdminController";

export const adminRouter = Router();
adminRouter.use(auth);
adminRouter.get('', adminAuth, adminController.getAllUser)
adminRouter.get('/lock/:id', adminController.lockUser)
adminRouter.delete('/:id', adminController.remove)


