import express from "express";
import {
  NewClass,
  UpdateClass,
  RemoveClass,
  GetAllClassrooms
} from "../middlewares/classroom.js";
const userRouter = express.Router();

userRouter.get("/getAllClassrooms", GetAllClassrooms);
userRouter.post("/newClass", NewClass);
userRouter.patch("/updateClass", UpdateClass)
userRouter.delete("/removeClass", RemoveClass);

export default userRouter;
