const FundSource = require("../models/fundSource");
const { getBadRequestServiceModel, getSuccessResponseServiceModel, getInternalServerErrorServiceModel } = require("../utils/baseResponse");
const { fieldIsRequired } = require("../utils/constant");

exports.validateFundSourceData = (body, userId) => {
    const { name, fund_type, nominal, budget_id } = body;

    let validationMessages = [];
    if (!name) {
        validationMessages.push(fieldIsRequired('name'));
    }

    if (!fund_type) {
        validationMessages.push(fieldIsRequired('fund_type'));
    }
    
    if (!nominal) {
        validationMessages.push(fieldIsRequired('nominal'));
    } else if (typeof nominal !== 'number' || nominal <= 0) {
        validationMessages.push('nominal must be a positive number.');
    }
    
    if (!budget_id) {
        validationMessages.push(fieldIsRequired('budget_id'));
    }
    
    if (!userId) {
        validationMessages.push(fieldIsRequired('userId can not be found'));
    }

    if (validationMessages.length > 0) {
        return getBadRequestServiceModel(validationMessages);
    } else {
        return getSuccessResponseServiceModel();
    }
}

exports.createFundSource = async (body, userId) => {
    try {
        const { name, fund_type, nominal, budget_id } = body;

        const fundSource = await FundSource.create({
            user_id: userId,
            name, fund_type, nominal, budget_id
        });

        return getSuccessResponseServiceModel(fundSource);
    } catch (error) {
        return getInternalServerErrorServiceModel(error);
    }
}

exports.getFundSourcesByBudgetId = async (budgetId) => {
    try {
        const fundSources = await FundSource.findAll({
            where: {
                budget_id: budgetId
            }
        });
        return getSuccessResponseServiceModel(fundSources);
    } catch (error) {
        return getInternalServerErrorServiceModel(error);
    }
}