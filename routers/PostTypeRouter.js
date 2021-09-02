const express = require("express");
const postTypeControllers = require("../controllers/postTypeController");

const postTypeRouter = express.Router();

postTypeRouter.get("/getPostTypes", postTypeControllers.getPostTypes);

module.exports = postTypeRouter;
