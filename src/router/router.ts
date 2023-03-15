import {Router} from "express";

import {userRouter} from "./user-router";
import {adminRouter} from "./admin-router";
import {postRouter} from "./post-router";

export  const router = Router()

router.use('/users',userRouter);
router.use('/admins',adminRouter);
router.use('/post',postRouter);

