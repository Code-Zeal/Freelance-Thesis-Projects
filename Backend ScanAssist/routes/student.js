import express from "express";
import { DeleteStudent, GetInfo, GetStudent, NewStudent, UpdateInfo } from "../middlewares/student.js";
import multer from "multer";
import { addAssistance } from "../middlewares/attendance.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });


const userRouter = express.Router();
userRouter.get("/getAllStudent", GetInfo);
userRouter.get("/getStudent", GetStudent);
userRouter.post("/newStudent",upload.single('file'),NewStudent );
userRouter.post("/addAssistance",addAssistance);
userRouter.post("/updateInfo",upload.single('file'), UpdateInfo);
userRouter.delete("/deleteStudent", DeleteStudent);



export default userRouter;
