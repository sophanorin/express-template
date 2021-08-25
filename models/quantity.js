"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quantity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
    }
    toJSON() {
      const obj = this.get();
      return { amount: obj.amount, unit: obj.unit };
    }
  }
  Quantity.init(
    {
      amount: DataTypes.DECIMAL,
      unit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quantity",
    }
  );
  return Quantity;
};
