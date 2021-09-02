"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Posts",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        description: {
          type: Sequelize.TEXT,
        },
        priceId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Prices",
            key: "id",
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
        },
        quantityId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Quantities",
            key: "id",
          },
        },
        categoryId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Categories",
            key: "id",
          },
        },
        locationId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Locations",
            key: "id",
          },
        },
        postTypeId: {
          type: Sequelize.INTEGER,
          references: {
            model: "PostTypes",
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
      {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamp: false,
        updatedAt: false,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Posts");
    await queryInterface.dropTable("Users");
    await queryInterface.dropTable("Prices");
    await queryInterface.dropTable("Categories");
    await queryInterface.dropTable("Locations");
    await queryInterface.dropTable("Quantities");
  },
};
