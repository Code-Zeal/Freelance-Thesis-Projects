import express from "express";
import { ChangeTypeAccount, GetFavoritesPost, GetInfo, GetLikedPost, GetSavedPost, StartFollow, StopFollowing, UpdateInfo } from "../middlewares/user.js";
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/data')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });
const userRouter = express.Router();

userRouter.get("/getInfo", GetInfo);
userRouter.get("/getSavedPost", GetSavedPost);
userRouter.get("/getFavoritesPost", GetFavoritesPost);
userRouter.get("/getLikedPost", GetLikedPost);
userRouter.post("/startFollow", StartFollow);
userRouter.post("/stopFollowing", StopFollowing);
userRouter.post("/changeTypeAccount", ChangeTypeAccount);
userRouter.patch("/updateInfo",upload.single('file'), UpdateInfo);

export default userRouter;
