const expressAsyncsHandler = require("express-async-handler");
const { cloudinaryImageUploadMethod } = require("../utils/utils");

exports.uploadImages = expressAsyncsHandler(async (req, res, next) => {
  let urls = [];

  console.log("Files: ", req.files);

  if (req.files.length === 0)
    return res.status(500).json({ message: "File Empty" });

  for (const file of req.files) {
    const { path } = file;
    const res = await cloudinaryImageUploadMethod(path);
    urls.push(res);
  }

  res.json(urls);
});
