const express = require("express");
const imageControllers = require("../controllers/imageControllers");
const upload = require("../utils/multer");
const { isAuth } = require("../utils/utils");

const imageRouter = express.Router();

imageRouter.post(
  "/uploadImage",
  isAuth,
  upload.array("images", 4),
  imageControllers.uploadImages
);

module.exports = imageRouter;
