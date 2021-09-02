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
      this.belongsTo(Unit, { as: "unit", targetKey: "id" });
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
      charset: "utf8",
      collate: "utf8_general_ci",
      sequelize,
      modelName: "Quantity",
    }
  );
  return Quantity;
};
