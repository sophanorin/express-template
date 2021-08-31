const expressAsyncsHandler = require("express-async-handler");
const { cloudinaryImageUploadMethod } = require("../utils/utils");
const {
  Post,
  Quantity,
  Category,
  Location,
  Image,
  User,
  Price,
  Unit,
  Currency,
} = require("../models");

exports.updatePost = expressAsyncsHandler(async (req, res, next) => {
  const { id } = req.params;

  const {
    description,
    price: amount,
    currencyId,
    categoryId,
    quantity,
    unitId,
    location,
  } = req.body;

  if (id) {
    try {
      const post = await Post.findOne({
        where: { id },
        include: [
          {
            model: Price,
            as: "price",
            include: [{ model: Currency, as: "currency" }],
          },
          {
            model: Quantity,
            as: "quantity",
            include: [{ model: Unit, as: "unit" }],
          },
          { model: Category, as: "category" },
          { model: Location, as: "location" },
          { model: Image, as: "images" },
          { model: User, as: "user" },
        ],
      });

      if (!post) {
        res.status(404).json({ message: "post not found" });
        return;
      }

      if (description) {
        post.description = description;
      }

      if (amount || currencyId) {
        post.price.update({ amount, currencyId });
      }

      if (categoryId) {
        post.category.update(categoryId);
      }

      if (quantity || unitId)
        post.quantity.update({ amount: quantity, unitId });

      if (location) post.location.update({ location });

      let urls = [];

      if (req.files) {
        for (const file of req.files) {
          const { path } = file;
          const url = await cloudinaryImageUploadMethod(path);
          urls.push(url);
        }

        post.images = urls;
      }

      post.save();

      res.json(post);
    } catch (error) {
      res.status(422).send({ error: err });
    }
  } else {
    res.json({ message: "params doesn't avalaible" });
  }
});

exports.insertPost = expressAsyncsHandler(async (req, res, next) => {
  const {
    description,
    price: amount,
    currencyId,
    categoryId,
    quantity,
    unitId,
    location,
    userId,
  } = req.body;

  try {
    let urls = [];

    for (const file of req.files) {
      const { path } = file;
      const res = await cloudinaryImageUploadMethod(path);
      urls.push(res);
    }

    const result = await Post.create(
      {
        description,
        userId,
        categoryId,
        price: {
          amount,
          currencyId,
        },
        quantity: {
          amount: quantity,
          unitId,
        },
        location: {
          location,
        },
        images: [...urls],
      },
      {
        include: [
          {
            model: Price,
            as: "price",
            include: [{ model: Currency, as: "currency" }],
          },
          {
            model: Quantity,
            as: "quantity",
            include: [{ model: Unit, as: "unit" }],
          },
          { model: Category, as: "category" },
          { model: Location, as: "location" },
          { model: Image, as: "images" },
          { model: User, as: "user" },
        ],
      }
    );

    const post = await Post.findOne({
      where: { id: result.id },
      include: [
        {
          model: Price,
          as: "price",
          include: [{ model: Currency, as: "currency" }],
        },
        {
          model: Quantity,
          as: "quantity",
          include: [{ model: Unit, as: "unit" }],
        },
        { model: Category, as: "category" },
        { model: Location, as: "location" },
        { model: Image, as: "images" },
        { model: User, as: "user" },
      ],
    });

    res.json(post);
  } catch (error) {
    res.status(422).send({ error: err });
  }
});

exports.getPosts = expressAsyncsHandler(async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Price,
          as: "price",
          include: [{ model: Currency, as: "currency" }],
        },
        {
          model: Quantity,
          as: "quantity",
          include: [{ model: Unit, as: "unit" }],
        },
        { model: Category, as: "category" },
        { model: Location, as: "location" },
        { model: Image, as: "images" },
        { model: User, as: "user" },
      ],
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
      include: [
        {
          model: Price,
          as: "price",
          include: [{ model: Currency, as: "currency" }],
        },
        {
          model: Quantity,
          as: "quantity",
          include: [{ model: Unit, as: "unit" }],
        },
        { model: Category, as: "category" },
        { model: Location, as: "location" },
        { model: Image, as: "images" },
        { model: User, as: "user" },
      ],
    });
    if (post) res.json(post);
    else res.status(404).json({ message: "post note found" });
  } catch (error) {
    res.status(422).send({ error: err });
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
