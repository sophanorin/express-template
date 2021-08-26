const express = require("express");
const categoryControllers = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter.get("/getCategories", categoryControllers.getCategories);

module.exports = categoryRouter;
