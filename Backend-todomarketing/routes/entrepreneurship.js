import express from "express";
import {
  EditMyEntrepreneurship,
  GetAllEntrepreneurships,
  GetBranch,
  GetEntrepreneurship,
  GetMyBranches,
  GetMyEntrepreneurships,
  NewBranch,
  NewEntrepreneurship,
  editMyBranch,
} from "../middlewares/entrepreneurship.js";
const userRouter = express.Router();

userRouter.post("/newEntrepreneurship", NewEntrepreneurship);
userRouter.post("/newBranch", NewBranch);
userRouter.get("/getBranch", GetBranch);
userRouter.get("/getEntrepreneurship", GetEntrepreneurship);
userRouter.get("/getMyBranches", GetMyBranches);
userRouter.get("/getMyEntrepreneurships", GetMyEntrepreneurships);
userRouter.get("/getAllEntrepreneurships", GetAllEntrepreneurships);
userRouter.patch("/editMyEntrepreneurship", EditMyEntrepreneurship);
userRouter.patch("/editMyBranch", editMyBranch);

export default userRouter;
