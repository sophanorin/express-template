const express = require("express");
const currencyController = require("../controllers/currencyController");

const currencyRouter = express.Router();

currencyRouter.get("/getCurrencies", currencyController.getCurrencies);

module.exports = currencyRouter;
