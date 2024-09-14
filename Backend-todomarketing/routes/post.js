import express from "express";
import {
  AddCommentPost,
  AddFavoritesPost,
  AddLikedPost,
  DeletePost,
  EditPost,
  GetAllPosts,
  GetDetails,
  GetMyPosts,
  NewPost,
  RemoveFavoritePost,
  RemoveLikedPost,
  RemoveSavedPost,
  SavePost,
} from "../middlewares/post.js";
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

userRouter.post("/newPost",upload.single('file'), NewPost);
userRouter.post("/savePost", SavePost);
userRouter.post("/addFavoritesPost", AddFavoritesPost);
userRouter.post("/addLikedPost", AddLikedPost);
userRouter.post("/addCommentPost", AddCommentPost);
userRouter.patch("/editPost", EditPost);
userRouter.get("/getDetail", GetDetails);
userRouter.get("/getMyPosts", GetMyPosts);
userRouter.get("/getAll", GetAllPosts);
userRouter.delete("/removeFavoritePost", RemoveFavoritePost);
userRouter.delete("/removeSavedPost", RemoveSavedPost);
userRouter.delete("/removeLikedPost", RemoveLikedPost);
userRouter.delete("/deletePost", DeletePost);

export default userRouter;
