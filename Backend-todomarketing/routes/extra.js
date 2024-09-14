import express from "express";
import { IAQuestion, addBackground, createImage } from "../middlewares/extra.js";

const userRouter = express.Router();

userRouter.post("/createImage",createImage);
userRouter.post("/addBackground",addBackground);
userRouter.post("/AskIA",IAQuestion);
userRouter.get("/health",(req,res)=>res.status(200).send("OK"));

export default userRouter;
