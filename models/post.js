"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User,
      Image,
      Location,
      Quantity,
      Category,
      Price,
      PostType,
    }) {
      // define association here
      this.belongsTo(Price, {
        as: "price",
        foreignKey: "priceId",
      });
      this.hasMany(Image, {
        as: "images",
        foreignKey: "id",
      });
      this.belongsTo(Location, { as: "location", foreignKey: "locationId" });
      this.belongsTo(Quantity, { as: "quantity", foreignKey: "quantityId" });
      this.belongsTo(Category, { as: "category", foreignKey: "categoryId" });
      this.belongsTo(PostType, { as: "postType", foreignKey: "postTypeId" });
      this.belongsTo(User, { as: "user", foreignKey: "userId" });
    }

    toJSON() {
      return {
        ...this.get(),
        userId: undefined,
        categoryId: undefined,
        priceId: undefined,
        locationId: undefined,
        quantityId: undefined,
        postTypeId: undefined,
      };
    }
  }
  Post.init(
    {
      description: DataTypes.TEXT,
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
