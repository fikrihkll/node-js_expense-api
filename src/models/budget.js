const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Budget = sequelize.define('budget', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    currency: {
        type: Sequelize.STRING,
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
});

module.exports = Budget;