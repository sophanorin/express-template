const expressAsyncsHandler = require("express-async-handler");
const { generateToken } = require("../utils/utils.js");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
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
  Sequelize,
} = require("../models");

exports.signup = expressAsyncsHandler(async (req, res) => {
  const { name, gender, phone_number, username, password } = req.body;

  const cloudinary_res = await cloudinary.uploader.upload(req.file.path);

  try {
    const user = await User.create({
      name,
      gender,
      phone_number,
      username,
      avatar: cloudinary_res.secure_url,
      password: bcrypt.hashSync(password, 8),
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.gender,
      phone_number: user.phone_number,
      username: user.username,
      password: user.password,
      avatar: user.avatar,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(422).send({ error: err });
  }
});

exports.signin = expressAsyncsHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  const user_post = await Post.findAll({
    where: { userId: user.id },
  });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.send({
        id: user.id,
        name: user.name,
        gender: user.gender,
        phone_number: user.phone_number,
        avatar: user.avatar,
        token: generateToken(user),
        posts_count: user_post.length,
      });
      return;
    }
  }
  res.status(401).send({ message: "The username or password is incorrect" });
});

exports.getUserPosts = expressAsyncsHandler(async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const posts = await Post.findAll({
        where: { userId: id },
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
      res.status(422).json({ message: error });
    }
  } else res.json({ message: "Params doesn't avaliable" });
});
