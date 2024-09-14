import express from "express";
import { Login, LoginTeacher } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.post("/loginTeacher", LoginTeacher);

export default authRouter;
