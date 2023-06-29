
const expenseService = require('../services/expenseService');
const { getErrorResponse, getSuccessResponse } = require('../utils/baseResponse');

exports.uploadExpenses = async (req, res) => {
    const validationResult = expenseService.validateExpenseData(req.body, req.decodedToken.id);
    if (validationResult.status === true) {
        const result = await expenseService.createExpenses(req.body, req.decodedToken.id);
        if (result.status === true) {
            return res.status(201).json(getSuccessResponse());
        } else {
            return res.status(result.code).json(getErrorResponse(result.message)); 
        }
    } else {
        return res.status(validationResult.code).json(getErrorResponse(validationResult.message));
    }
}

exports.get = async (req, res) => {
    const budgetId = req.query.budget_id;
    const result = await expenseService.getExpenseByBudgetId(budgetId);
    if (result.status === true) {
        return res.status(200).json(getSuccessResponse(result.data));
    } else {
        return res.stats(result.code).json(getErrorResponse(result.message));
    }
}