const expressAsyncsHandler = require("express-async-handler");
const { PostType } = require("../models");

exports.getPostTypes = expressAsyncsHandler(async (req, res, next) => {
  try {
    const postTypes = await PostType.findAll({
      include: [],
    });

    res.json(postTypes);
  } catch (error) {
    res.status(422).send({ error: err });
  }
});
