import express from "express";
import {  LoginTeacher, RegisterTeacher } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/loginTeacher", LoginTeacher);
authRouter.post("/registerTeacher", RegisterTeacher);
authRouter.get("/health", (req,res)=>res.status(200).send("OK"));

export default authRouter;
