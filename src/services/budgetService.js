const { Op } = require("sequelize");
const sequelize = require("../config/database");
const Budget = require("../models/budget");
const BudgetUser = require("../models/budgetUser");
const User = require("../models/user");
const { getInternalServerErrorServiceModel, getBadRequestServiceModel, getSuccessResponseServiceModel } = require("../utils/baseResponse");
const { fieldIsRequired } = require("../utils/constant");

exports.validateBudgetData = (body, userId) => {
    const { name, description, currency } = body;
    let validationMessages = [];

    if (!name) {
        validationMessages.push(fieldIsRequired('name'));
    }
    if (!currency) {
        validationMessages.push(fieldIsRequired('currency'));
    }
    if (!description) {
        validationMessages.push(fieldIsRequired('description'));
    }
    if (!userId) {
        validationMessages.push('userId can not be found');
    }

    if (validationMessages.length > 0) {
        return getBadRequestServiceModel(validationMessages);
    } else {
        return getSuccessResponseServiceModel();
    }
}

exports.createBudget = async (body, userId) => {
    try {
        const { name, description, currency } = body;

        try {
            const transaction = await sequelize.transaction();

            try {
                const budget = await Budget.create({
                    user_id: userId,
                    name, description, currency
                }, { transaction });
    
                await BudgetUser.create({
                    user_id: userId,
                    budget_id: budget.id
                }, { transaction });
    
                await transaction.commit();
                return getSuccessResponseServiceModel(budget);
            } catch (error) {
                await transaction.rollback();
                return getInternalServerErrorServiceModel(error);    
            }
        } catch (error) {
            return getInternalServerErrorServiceModel(error);
        }

    } catch (error) {
        return getInternalServerErrorServiceModel(error);
    }
}

exports.getBudgetsByUserId = async (userId) => {
    try {
        const result = await Budget.findAll({
            include: [
                {
                    model: User,
                    through: BudgetUser,
                    attributes: [
                        'name',
                        'image',
                        'email'
                    ]
                }
            ]
        });
        return getSuccessResponseServiceModel(result);
    } catch (error) {
        return getInternalServerErrorServiceModel(error);
    }
}

exports.validateBudgetUserData = (body) => {
    const { budget_id, user_id } = body;

    let validationMessages = [];

    if (!budget_id) {
        validationMessages.push(fieldIsRequired('budget_id'));
    }
    if (!user_id) {
        validationMessages.push(fieldIsRequired('user_id'));
    }

    if (validationMessages.length > 0) {
        return getBadRequestServiceModel(validationMessages);
    } else {
        return getSuccessResponseServiceModel();
    }
}

exports.assignBudgetUser = async (body) => {
    try {
        const { budget_id, user_id } = body;

        await BudgetUser.create({
            user_id, budget_id
        });
        return getSuccessResponseServiceModel();
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return getBadRequestServiceModel("user sudah ditambahkan");
        }
        return getInternalServerErrorServiceModel(error);
    }
}