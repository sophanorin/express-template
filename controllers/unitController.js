const expressAsyncsHandler = require("express-async-handler");
const { Unit } = require("../models");

exports.getUnits = expressAsyncsHandler(async (req, res, next) => {
  try {
    const units = await Unit.findAll({
      include: [],
    });

    res.json(units);
  } catch (error) {
    res.status(422).send({ error: err });
  }
});
