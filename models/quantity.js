"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quantity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Unit }) {
      // define association here
      this.belongsTo(Unit, { as: "unit" });
    }
    toJSON() {
      const obj = this.get();
      return {
        ...obj,
        unitId: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Quantity.init(
    {
      amount: DataTypes.DECIMAL,
      unitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Quantity",
    }
  );
  return Quantity;
};
