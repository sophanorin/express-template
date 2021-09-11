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
  // sequelize.sync({ force: true });
  // await db.PostType.create({ name_en: "Sell", name_kh: "លក់" });
  // await db.PostType.create({ name_en: "Buy", name_kh: "ទិញ" });
  // await db.Unit.create({ name_en: "Tons", name_kh: "តោន" });
  // await db.Unit.create({ name_en: "Kg", name_kh: "គីឡូក្រាម" });
  // await db.Unit.create({ name_en: "G", name_kh: "ក្រាម" });
  // await db.Unit.create({ name_en: "Ml", name_kh: "មីលីក្រាម" });
  // await db.Currency.create({ name_en: "riel", name_kh: "រៀល" });
  // await db.Currency.create({ name_en: "dollar", name_kh: "ដុល្លារ" });
  // await db.Category.create({ name_en: "rice", name_kh: "អង្ករ" });
  // await db.Category.create({ name_en: "unhusked rice", name_kh: "ស្រូវ" });
  // await db.User.create({
  //   first_name: "Sophanorin",
  //   last_name: "Hoeu",
  //   gender: "male",
  //   phone_number: "0123456789",
  //   username: "admin",
  //   password: "$2b$08$/yn1sjxC1wdkBvqMN02/PukQdb6wgjYjuXSYGRvggjGdeYYtAQ2XC",
  // });
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
