"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User);
    }
  }
  Product.init(
    {
      imageUrl: DataTypes.STRING,
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
