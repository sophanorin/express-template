const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      gender: user.gender,
      phone_number: user.phone_number,
      username: user.username,
    },
    process.env.JWT_SECRET || "somethingsecret",
    { expiresIn: "30d" }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) res.status(401).send({ message: "Invalid token" });
        else {
          req.user = decode;
          next();
        }
      }
    );
  } else res.status(401).send({ message: "No token" });
};

module.exports = { generateToken, isAuth };
