const budgetService = require("../services/budgetService");
const { getSuccessResponse, getErrorResponse } = require("../utils/baseResponse");

exports.createNewBudget = async (req, res) => {
    const validationResult = budgetService.validateBudgetData(req.body, req.decodedToken.id);
    if (validationResult.status === true) {
        const result = await budgetService.createBudget(req.body, req.decodedToken.id);
        if (result.status === true) {
            return res.status(201).json(getSuccessResponse(result.data));
        } else {
            return res.status(result.code).json(getErrorResponse(result.message));
        }
    } else {
        return res.status(validationResult.code).json(getErrorResponse(validationResult.message));
    }
}

exports.addBudgetUser = async (req, res) => {
    const validationResult = budgetService.validateBudgetUserData(req.body);
    if (validationResult.status === true) {
        const result = await budgetService.assignBudgetUser(req.body);
        if (result.status === true) {
            return res.status(201).json(getSuccessResponse(result.data));
        } else {
            return res.status(result.code).json(getErrorResponse(result.message));
        }
    } else {
        return res.status(validationResult.code).json(getErrorResponse(validationResult.message));
    }
}

exports.getBudgetsByUserId = async (req, res) => {
    const result = await budgetService.getBudgetsByUserId(req.decodedToken.id);
    if (result.status === true) {
        return res.status(200).json(getSuccessResponse(result.data));
    } else {
        return res.status(result.code).json(getErrorResponse(result.message));
    }
}