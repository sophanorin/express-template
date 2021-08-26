"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {}

    toJSON() {
      return this.get().location;
    }
  }

  Location.init(
    {
      location: DataTypes.STRING,
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
