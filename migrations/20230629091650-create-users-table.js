'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      },
      fcm_token: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      },
      sso_auth_token: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
