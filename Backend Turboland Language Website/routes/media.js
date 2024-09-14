import express from "express";
import multer from "multer";
import path from 'path';
import { DeleteFile, SaveFile } from "../middlewares/media.js";

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

userRouter.post("/saveFile", upload.single('file'), SaveFile);
userRouter.delete("/deleteFile", DeleteFile);

export default userRouter;
