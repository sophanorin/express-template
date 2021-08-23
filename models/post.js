"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product, User }) {
      // define association here
      this.belongsTo(User);
    }
  }
  Post.init(
    {
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
