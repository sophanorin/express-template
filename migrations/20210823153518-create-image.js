"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Images",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        postId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Posts",
            key: "id",
          },
        },
        url: {
          type: Sequelize.STRING,
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
    await queryInterface.dropTable("Images");
  },
};
