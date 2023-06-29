const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const BudgetUser = sequelize.define('budget_user', {
    user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    budget_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
});

module.exports = BudgetUser;