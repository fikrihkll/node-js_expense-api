const { fieldIsRequired } = require("../utils/constant");
const { isValidDateTime } = require("../utils/dateValidation");
const { getInternalServerErrorServiceModel, getBadRequestServiceModel, getSuccessResponseServiceModel } = require("../utils/baseResponse");
const Expense = require("../models/expense");

const validateExpenseItemData = (item) => {
    const { budget_id, fund_source_id, description, category, nominal, date } = item;

    let validationMessages = [];

    if (!budget_id) {
        validationMessages.push(fieldIsRequired('budget_id'));
    }
    if (!fund_source_id) {
        validationMessages.push(fieldIsRequired('fund_source_id'));
    }

    if (!description) {
        validationMessages.push(fieldIsRequired('description'));
    }

    if (!category) {
        validationMessages.push(fieldIsRequired('category'));
    }

    if (!nominal) {
        validationMessages.push(fieldIsRequired('nominal'));
    } else if (typeof nominal !== 'number' || nominal <= 0) {
        validationMessages.push('nominal must be a positive number.');
    }

    if (!date) {
        validationMessages.push(fieldIsRequired('date'));
    } else if (!isValidDateTime(date)) {
        validationMessages.push('date must be a valid date in YYYY-MM-DD HH:mm:ss format.');
    }

    if (validationMessages.length > 0) {
        return getBadRequestServiceModel(validationMessages);
    } else {
        return getSuccessResponseServiceModel();
    }
}

exports.validateExpenseData = (body, userId) => {
    
    let validationMessages = [];

    if (!userId) {
        validationMessages.push('userId can not be found');
    }

    if (!body.values) {
        validationMessages.push(fieldIsRequired('values'));
    }

    if (!Array.isArray(body.values)) {
        validationMessages.push('values must be array');
    }

    for (item of body.values) {
        const result = validateExpenseItemData(item);
        if (result.status === false) {
            validationMessages.push(...result.message);
        }
    }

    if (validationMessages.length > 0) {
        return getBadRequestServiceModel(validationMessages);
    } else {
        return getSuccessResponseServiceModel();
    }
}

exports.createExpenses = async (body, userId) => {
    try {
        for(item of body.values) {
            const { budget_id, fund_source_id, description, category, nominal, date } = item;

            await Expense.create({
                user_id: userId,
                budget_id, 
                fund_source_id,
                description,
                category,
                nominal,
                date
            });
        }

        return getSuccessResponseServiceModel();
    } catch (error) {
        return getInternalServerErrorServiceModel(error);
    }
}

exports.getExpenseByBudgetId = async (budgetId) => {
    try {
        const result = await Expense.findAll({
            where: {
                budget_id: budgetId
            }
        });
        return getSuccessResponseServiceModel(result);
    } catch (error) {
        return getInternalServerErrorServiceModel(error);
    }
}