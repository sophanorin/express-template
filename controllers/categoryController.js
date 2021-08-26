const expressAsyncsHandler = require("express-async-handler");
const { Category } = require("../models");

exports.getCategories = expressAsyncsHandler(async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [],
    });

    res.json(categories);
  } catch (error) {
    res.status(422).send({ error: err });
  }
});
