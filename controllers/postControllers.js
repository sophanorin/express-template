const expressAsyncsHandler = require("express-async-handler");
const {
  Post,
  Quantity,
  Category,
  Location,
  Image,
  User,
} = require("../models");

exports.insertPost = expressAsyncsHandler(async (req, res, next) => {
  const { price, description, quantity, category, location, images, userId } =
    req.body;

  try {
    const post = await Post.create(
      {
        price,
        description,
        userId,
        category,
        quantity,
        location,
        images,
      },
      {
        include: [
          { model: Quantity, as: "quantity" },
          { model: Category, as: "category" },
          { model: Location, as: "location" },
          { model: Image, as: "images" },
          { model: User, as: "user" },
        ],
      }
    );

    res.json(post);
  } catch (error) {
    res.status(422).send({ error: err });
  }
});

exports.getPosts = expressAsyncsHandler(async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: ["user", "category", "location", "quantity"],
    });
    res.json(posts);
  } catch (error) {
    res.status(422).send({ error: err });
  }
});

exports.getPostById = expressAsyncsHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({
      where: { id },
      include: ["user", "category", "location", "quantity"],
    });
    if (post) res.json(post);
    else res.status(404).json({ message: "post note found" });
  } catch (error) {
    res.status(422).send({ error: err });
  }
});

exports.updatePost = expressAsyncsHandler(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      const post = await Post.update(
        { ...req.body },
        {
          where: { id },
          include: ["user", "category", "location", "quantity"],
        }
      );
      if (post) res.json({ message: "post was updated successfully!" });
      else res.status(404).json({ message: "post note found" });
    } catch (error) {
      res.status(422).send({ error: err });
    }
  } else {
    res.json({ message: "params doesn't avalaible" });
  }
});

exports.deletePostById = expressAsyncsHandler(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      const post = await Post.destroy({
        where: { id },
      });
      if (post) res.json({ message: "post was deleted successfully!" });
      else res.status(404).json({ message: "post note found" });
    } catch (error) {
      res.status(422).send({ error: err });
    }
  } else {
    res.json({ message: "params doesn't avalaible" });
  }
});
