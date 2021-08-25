const expressAsyncsHandler = require("express-async-handler");
const { generateToken } = require("../utils/utils.js");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const { User } = require("../models");

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
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.send({
        id: user.id,
        name: user.name,
        gender: user.gender,
        phone_number: user.phone_number,
        avatar: user.avatar,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "The username or password is incorrect" });
});
