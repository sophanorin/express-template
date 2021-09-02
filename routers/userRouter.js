const express = require("express");
const userControllers = require("../controllers/userControllers");
const upload = require("../utils/multer");
const { isAuth } = require("../utils/utils");

const userRouter = express.Router();

userRouter.get("/getUserPosts/:id", isAuth, userControllers.getUserPosts);
userRouter.get("/getUser/:id", isAuth, userControllers.getUser);
userRouter.post(
  "/updateUser/:id",
  upload.single("avatar"),
  isAuth,
  userControllers.updateUser
);

userRouter.post("/changePassword/:userId", userControllers.changPassword);

userRouter.post("/signup", upload.single("avatar"), userControllers.signup);
userRouter.post("/signin", userControllers.signin);

module.exports = userRouter;
