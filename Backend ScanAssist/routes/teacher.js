import express from "express";
import { GetInfo, UpdateInfo } from "../middlewares/teacher.js";
const userRouter = express.Router();

userRouter.get("/getInfo", GetInfo);
userRouter.patch("/updateInfo", UpdateInfo);


export default userRouter;
