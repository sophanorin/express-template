"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Prices",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        amount: {
          type: Sequelize.DECIMAL,
        },
        currencyId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Currencies",
            key: "id",
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { charset: "utf8", collate: "utf8_general_ci", timestamp: false }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Prices");
    await queryInterface.dropTable("Currencies");
  },
};
