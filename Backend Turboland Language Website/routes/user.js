import express from "express";
import { GetInfo, GetMyClassrooms, UpdateInfo } from "../middlewares/user.js";

const userRouter = express.Router();

userRouter.get("/getInfo", GetInfo);
userRouter.patch("/updateInfo", UpdateInfo);
userRouter.get("/getMyClassrooms", GetMyClassrooms);

export default userRouter;
