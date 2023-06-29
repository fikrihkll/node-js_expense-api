const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
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

module.exports = User;