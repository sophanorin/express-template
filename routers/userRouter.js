const express = require("express");
const userControllers = require("../controllers/userControllers");
const upload = require("../utils/multer");
const { isAuth } = require("../utils/utils");

const userRouter = express.Router();

userRouter.get("/getUserPosts/:id", isAuth, userControllers.getUserPosts);
userRouter.post("/signup", upload.single("avatar"), userControllers.signup);
userRouter.post("/signin", userControllers.signin);

module.exports = userRouter;
