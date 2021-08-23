const express = require("express");
const postControllers = require("../controllers/postControllers");
const { isAuth } = require("../utils.js");

const postRouter = express.Router();

postRouter.post("/insertPost", isAuth, postControllers.insertPost);
postRouter.get("/getPosts", postControllers.getPosts);
postRouter.get("/getPost/:id", postControllers.getPostById);
postRouter.put("/updatePost", isAuth, postControllers.updatePost);
postRouter.delete("/deletePostById", isAuth, postControllers.deletePostById);

module.exports = postRouter;
