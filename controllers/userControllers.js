const expressAsyncsHandler = require("express-async-handler");
const {
  generateToken,
  cloudinaryImageUploadMethod,
  cloudinaryImageDestroyMethod,
} = require("../utils/utils.js");
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
  Avatar,
  Sequelize,
} = require("../models");

exports.signup = expressAsyncsHandler(async (req, res) => {
  const { name, gender, phone_number, username, password } = req.body;

  let cloudinary_res;
  if (req.file)
    cloudinary_res = await cloudinaryImageUploadMethod(req.file.path);

  try {
    let user;

    if (cloudinary_res) {
      user = await User.create(
        {
          name,
          gender,
          phone_number,
          username,
          avatar: cloudinary_res,
          password: bcrypt.hashSync(password, 8),
        },
        { include: [{ model: Avatar, as: "avatar" }] }
      );
    }

    user = await User.create(
      {
        name,
        gender,
        phone_number,
        username,
        password: bcrypt.hashSync(password, 8),
      },
      { include: [{ model: Avatar, as: "avatar" }] }
    );

    res.json({
      id: user.id,
      name: user.name,
      gender: user.gender,
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

exports.getUser = expressAsyncsHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: { model: Avatar, as: "avatar" },
  });
  if (user) res.send(user);
  else res.status(404).send({ message: "User Not Found" });
});

exports.updateUser = expressAsyncsHandler(async (req, res) => {
  const { id } = req.params;
  const { name, gender, phone_number } = req.body;
  const user = await User.findByPk(id, {
    include: { model: Avatar, as: "avatar" },
  });

  if (!user) res.status(404).send({ message: "User Not Found" });
  else {
    let cloundinary_upload_res;
    let cloudinary_destroy_res;
    let avatar;
    if (req.file) {
      if (user.avatar?.publicId) {
        cloudinary_destroy_res = await cloudinaryImageDestroyMethod(
          user.avatar.publicId
        );
        cloundinary_upload_res = await cloudinaryImageUploadMethod(
          req.file.path
        );
        user.avatar.update(cloundinary_upload_res);
      } else {
        cloundinary_upload_res = await cloudinaryImageUploadMethod(
          req.file.path
        );
        avatar = await Avatar.create(cloundinary_upload_res);

        user.setAvatar(avatar);
      }
    } else {
      user.avatarId = null;
      user.avatar = null;
    }

    user.name = name;
    user.gender = gender;
    user.phone_number = phone_number;

    user.save();

    const new_user = { ...user.toJSON() };
    if (!new_user.avatar) new_user.avatar = avatar || null;

    if (!req.file) new_user.avatar = null;

    res.json(new_user);
  }
});
