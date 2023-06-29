'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fund_sources', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      budget_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      fund_type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      nominal: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        unique: false
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fund_sources');
  }
};
