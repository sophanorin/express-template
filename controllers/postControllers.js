const expressAsyncsHandler = require("express-async-handler");

exports.insertPost = expressAsyncsHandler(async (req, res, next) => {
  res.send("Post post route");
});

exports.getPosts = expressAsyncsHandler(async (req, res, next) => {
  res.send("Get all post route");
});

exports.getPostById = expressAsyncsHandler(async (req, res, next) => {
  res.send("Get post by id route");
});

exports.updatePost = expressAsyncsHandler(async (req, res, next) => {
  res.send("Update post route");
});

exports.deletePostById = expressAsyncsHandler(async (req, res, next) => {
  res.send("Delete post by id");
});
