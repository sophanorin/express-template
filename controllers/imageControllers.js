const expressAsyncsHandler = require("express-async-handler");
const { cloudinaryImageUploadMethod } = require("../utils/utils");

exports.uploadImages = expressAsyncsHandler(async (req, res, next) => {
  let urls = [];

  for (const file of req.files) {
    const { path } = file;
    const res = await cloudinaryImageUploadMethod(path);
    urls.push(res);
  }

  res.json(urls);
});
