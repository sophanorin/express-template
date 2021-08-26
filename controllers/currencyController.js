const expressAsyncsHandler = require("express-async-handler");
const { isAuth } = require("../utils/utils");
const { Currency } = require("../models");

exports.getCurrencies = expressAsyncsHandler(async (req, res, next) => {
  try {
    const currencies = await Currency.findAll({
      include: [],
    });
    res.json(currencies);
  } catch (error) {
    res.status(422).send({ error: err });
  }
});
