"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Currency }) {
      // define association here
      this.belongsTo(Currency, { as: "currency" });
    }
    toJSON() {
      const obj = this.get();
      return { amount: obj.amount, currency: obj.currency };
    }
  }
  Price.init(
    {
      amount: DataTypes.DECIMAL,
      currencyId: DataTypes.INTEGER,
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      sequelize,
      modelName: "Price",
    }
  );
  return Price;
};
