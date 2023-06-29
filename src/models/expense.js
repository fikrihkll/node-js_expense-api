const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('expense', {
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
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
    },
});

module.exports = Expense;