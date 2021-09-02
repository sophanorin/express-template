"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      //this.hasMany(Post, { as: "posts", foreignKey: "postTypeId" });
    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  PostType.init(
    {
      name_kh: DataTypes.STRING,
      name_en: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PostType",
    }
  );
  return PostType;
};
