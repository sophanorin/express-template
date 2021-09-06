"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
          validate: {
            notNull: { msg: "User must have a name" },
            notEmpty: { msg: "name must not be empty" },
          },
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false,
          validate: {
            notNull: { msg: "User must have a name" },
            notEmpty: { msg: "name must not be empty" },
          },
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: { msg: "User must have a gender" },
            notEmpty: { msg: "gender must not be empty" },
          },
        },
        phone_number: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notNull: { msg: "User must have a phone_number" },
            notEmpty: { msg: "phone_number must not be empty" },
          },
        },
        avatarId: {
          references: {
            model: "Avatars",
            key: "id",
          },
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notNull: { msg: "username must have a phone_number" },
            notEmpty: { msg: "username must not be empty" },
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
          is: {
            args: /^[0-9a-f]{64}$/i,
            msg: "Your password must be strong",
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
    await queryInterface.dropTable("Users");
  },
};
