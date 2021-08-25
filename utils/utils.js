const jwt = require("jsonwebtoken");
const cloudinary = require("./cloudinary");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      gender: user.gender,
      phone_number: user.phone_number,
      username: user.username,
      avatar: user.avatar,
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
  } else res.status(401).send({ message: "Unauthorization" });
};

/**
 *
 * @param {string} file
 * @returns {string} { secure_url }
 */
const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      resolve({
        url: res.secure_url,
      });
    });
  });
};

module.exports = { generateToken, isAuth, cloudinaryImageUploadMethod };
