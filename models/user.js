"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Avatar, Post }) {
      // define association here
      this.belongsTo(Avatar, { as: "avatar", targetKey: "id" });
      this.hasMany(Post, {
        as: "posts",
        foreignKey: "userId",
      });
    }
    toJSON() {
      return { ...this.get(), avatarId: undefined };
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      avatarId: DataTypes.INTEGER,
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      modelName: "User",
      sequelize,
    }
  );
  return User;
};
