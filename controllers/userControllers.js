const expressAsyncsHandler = require("express-async-handler");
const { generateToken, isAuth } = require("../utils.js");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.signup = expressAsyncsHandler(async (req, res) => {
  const { name, gender, phone_number, username, password } = req.body;
  try {
    const user = await User.create({
      name,
      gender,
      phone_number,
      username,
      password: bcrypt.hashSync(password, 8),
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.gender,
      phone_number: user.phone_number,
      username: user.username,
      password: user.password,
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
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "The username or password is incorrect" });
});
