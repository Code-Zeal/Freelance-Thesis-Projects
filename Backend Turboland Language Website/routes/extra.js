import express from "express";
import { sendEmail } from "../middlewares/extra.js";

const userRouter = express.Router();

userRouter.post("/sendEmail",sendEmail);
userRouter.get("/health",(req,res)=>{
  res.status(200).send("OK")
});

export default userRouter;
