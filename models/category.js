"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
    }
    toJSON() {
      return { ...this.get() };
    }
  }
  Category.init(
    {
      name_kh: DataTypes.STRING,
      name_en: DataTypes.STRING,
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
