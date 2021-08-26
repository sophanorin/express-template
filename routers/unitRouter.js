const express = require("express");
const unitControllers = require("../controllers/unitController");

const unitRouter = express.Router();

unitRouter.get("/getUnits", unitControllers.getUnits);

module.exports = unitRouter;
