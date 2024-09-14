import express from "express";
import {
  NewClass,
  UpdateClass,
  RemoveClass,
  JoinClass,
  DeleteDataClass,
  AssistantChecker,
} from "../middlewares/classroom.js";
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

userRouter.post("/newClass", NewClass);
userRouter.patch("/joinClass", JoinClass)
userRouter.patch("/updateClass", upload.single('file'), UpdateClass)
userRouter.post("/AssistantChecker", AssistantChecker)
userRouter.patch("/deleteDataClass", DeleteDataClass)
userRouter.delete("/removeClass", RemoveClass);

export default userRouter;
