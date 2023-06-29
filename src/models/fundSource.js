const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const FundSource = sequelize.define('fund_source', {
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
    deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
    },
});

module.exports = FundSource;