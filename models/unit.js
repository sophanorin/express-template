"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), created_at: undefined, update_at: undefined };
    }
  }
  Unit.init(
    {
      name_kh: DataTypes.STRING,
      name_en: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Unit",
    }
  );
  return Unit;
};
