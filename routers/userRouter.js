const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userControllers = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/signup", userControllers.signup);
userRouter.post("/signin", userControllers.signin);

module.exports = userRouter;
