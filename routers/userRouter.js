const express = require("express");
const userControllers = require("../controllers/userControllers");
const upload = require("../utils/multer");

const userRouter = express.Router();

userRouter.post("/signup", upload.single("avatar"), userControllers.signup);
userRouter.post("/signin", userControllers.signin);

module.exports = userRouter;
