"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.belongsTo(Post, { as: "images" });
    }
    toJSON() {
      const { id, url, createdAt, updatedAt } = this.get();
      return { id, url, createdAt, updatedAt };
    }
  }
  Image.init(
    {
      url: DataTypes.STRING,
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
