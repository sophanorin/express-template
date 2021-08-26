"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Image, Location, Quantity, Category, Price }) {
      // define association here
      this.belongsTo(Price, { as: "price" });
      this.hasMany(Image, { as: "images" });
      this.belongsTo(Location, { as: "location" });
      this.belongsTo(Quantity, { as: "quantity" });
      this.belongsTo(Category, { as: "category" });
      this.belongsTo(User, { as: "user" });
    }

    toJSON() {
      return {
        ...this.get(),
        userId: undefined,
        categoryId: undefined,
        priceId: undefined,
        locationId: undefined,
        quantityId: undefined,
      };
    }
  }
  Post.init(
    {
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
