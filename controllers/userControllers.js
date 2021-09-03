const expressAsyncsHandler = require("express-async-handler");
const {
  generateToken,
  cloudinaryImageUploadMethod,
  cloudinaryImageDestroyMethod,
} = require("../utils/utils.js");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
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
  PostType,
  Sequelize,
} = require("../models");

exports.signup = expressAsyncsHandler(async (req, res) => {
  const { first_name, last_name, gender, phone_number, username, password } =
    req.body;

  let cloudinary_res;
  if (req.file)
    cloudinary_res = await cloudinaryImageUploadMethod(req.file.path);

  if (cloudinary_res) {
    User.create(
      {
        first_name,
        last_name,
        gender,
        phone_number,
        username,
        avatar: cloudinary_res,
        password: bcrypt.hashSync(password, 8),
      },
      { include: [{ model: Avatar, as: "avatar" }] }
    )
      .then((user) => {
        res.json({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          phone_number: user.phone_number,
          username: user.username,
          password: user.password,
          avatar: user.avatar,
          token: generateToken(user),
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    User.create(
      {
        first_name,
        last_name,
        gender,
        phone_number,
        username,
        avatar: null,
        password: bcrypt.hashSync(password, 8),
      },
      { include: [{ model: Avatar, as: "avatar" }] }
    )
      .then((user) => {
        res.json({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          gender: user.gender,
          phone_number: user.phone_number,
          username: user.username,
          password: user.password,
          avatar: user.avatar,
          token: generateToken(user),
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

exports.signin = expressAsyncsHandler(async (req, res) => {
  const { username, phone_number, password } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { username: username || "" },
        { phone_number: phone_number || "" },
      ],
    },
    include: [
      { model: Avatar, as: "avatar" },
      { model: Post, as: "posts" },
    ],
  });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.send({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        phone_number: user.phone_number,
        avatar: user.avatar,
        token: generateToken(user),
        posts_count: user.posts.length,
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
          { model: PostType, as: "postType" },
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
    include: [
      { model: Avatar, as: "avatar" },
      { model: Post, as: "posts" },
    ],
  });
  if (user) {
    const _user = { ...user.get() };
    _user.post_count = _user.posts.length;
    _user.posts = undefined;
    _user.avatarId = undefined;
    _user.password = undefined;
    res.json(_user);
  } else res.status(404).send({ message: "User Not Found" });
});

exports.updateUser = expressAsyncsHandler(async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, gender, phone_number } = req.body;
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

    user.first_name = first_name;
    user.last_name = last_name;
    user.gender = gender;
    user.phone_number = phone_number;

    user.save();

    const new_user = { ...user.toJSON() };
    if (!new_user.avatar) new_user.avatar = avatar || null;

    if (!req.file) new_user.avatar = null;

    res.json(new_user);
  }
});

exports.changPassword = expressAsyncsHandler(async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  User.findOne({
    where: { id: userId },
    include: [{ model: Avatar, as: "avatar" }],
  })
    .then((user) => {
      if (bcrypt.compareSync(oldPassword, user.password)) {
        if (newPassword === confirmNewPassword) {
          const new_pas = bcrypt.hashSync(confirmNewPassword, 8);
          user.password = new_pas;
          user.save();

          const hot_user = { ...user.get(), password: new_pas };

          res.json({
            ...user.get(),
            token: generateToken(hot_user),
            password: undefined,
          });
        } else {
          res.status(500).json({
            message: "New passwords doesn't match",
            password: { status: "newPassword", data: false },
          });
        }
      } else {
        res.status(500).json({
          message: "Current passwords doesn't match",
          password: { status: "oldPassword", data: false },
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});
