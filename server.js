require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routers
 *
 * @param {String} Path
 * @param {Function} require
 */

app.use("/api/post", require("./routers/postRouter"));
app.use("/api/user", require("./routers/userRouter"));
app.use("/api/category", require("./routers/categoryRouter"));
app.use("/api/currency", require("./routers/currencyRouter"));
app.use("/api/unit", require("./routers/unitRouter"));
app.use("/api/postType", require("./routers/PostTypeRouter"));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
