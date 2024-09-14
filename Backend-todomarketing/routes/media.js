import express from "express";
import { DeleteFile, GetDetails, GetMyGallery, RemoveBg, SaveFile, UpdateFile } from "../middlewares/media.js";
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

userRouter.get("/getMyGallery", GetMyGallery);
userRouter.post("/saveFile", upload.single('file'), SaveFile);
userRouter.post("/removeBg", upload.single('file'), RemoveBg);
userRouter.patch("/updateFile", upload.single('file'), UpdateFile);
userRouter.get("/getDetail", GetDetails);
userRouter.delete("/deleteFile", DeleteFile);

export default userRouter;
