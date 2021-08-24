"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Image, Location, Quantity, Category }) {
      // define association here
      this.hasMany(Image, { as: "images" });
      this.belongsTo(Location, { as: "location" });
      this.belongsTo(Quantity, { as: "quantity" });
      this.belongsTo(Category, { as: "category" });
      this.belongsTo(User, { as: "user" });
    }
    toJSON() {
      return {
        ...this.get(),
        quantityId: undefined,
        categoryId: undefined,
        locationId: undefined,
      };
    }
  }
  Post.init(
    {
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
