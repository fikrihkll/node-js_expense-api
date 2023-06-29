'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('expenses', {
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
        allowNull: false,
      },
      fund_source_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      nominal: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        unique: false
      },
      date: {
        type: Sequelize.DATE,
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
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('expenses');
  }
};
