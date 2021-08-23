require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routers
 */
app.use("/api/post", require("./routers/postRouter"));
app.use("/api/user", require("./routers/userRouter"));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
