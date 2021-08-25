"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

(async () => {
  await sequelize.sync({ force: true });

  await db.Currency.create({ name: "riel" });
  await db.Currency.create({ name: "dollar" });
  await db.Category.create({ category: "rice" });
  await db.Category.create({ category: "noodle" });
  await db.User.create({
    name: "admin",
    gender: "male",
    phone_number: "0123456789",
    username: "admin",
    password: "admin",
  });
  await db.User.create({
    name: "customer",
    gender: "male",
    phone_number: "0123456789",
    username: "customer",
    password: "customer",
  });
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
