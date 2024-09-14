import express from "express";
import { GetInfo, GetAllClassrooms, UpdateInfo } from "../middlewares/teacher.js";
const userRouter = express.Router();

userRouter.get("/getInfo", GetInfo);
userRouter.patch("/updateInfo", UpdateInfo);
userRouter.get("/getAllClassrooms", GetAllClassrooms);

export default userRouter;
