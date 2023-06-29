const fundSourceService = require('../services/fundSourceService');
const { getErrorResponse, getSuccessResponse } = require('../utils/baseResponse');

exports.createFundSource = async (req, res) => {
    const validationResult = fundSourceService.validateFundSourceData(req.body, req.decodedToken.id);
    if (validationResult.status === true) {
        const result = await fundSourceService.createFundSource(req.body, req.decodedToken.id);
        if (result.status === true) {
            return res.status(201).json(getSuccessResponse(result.data));
        } else {
            return res.status(result.code).json(getErrorResponse(result.message));
        }
    } else {
        return res.status(validationResult.code).json(getErrorResponse(validationResult.message));
    }
}

exports.getFundSourcesByBudgetId = async (req, res) => {
    const budgetId = req.params.budgetId;
    const result = await fundSourceService.getFundSourcesByBudgetId(budgetId);
    if (result.status === true) {
        return res.status(201).json(getSuccessResponse(result.data));
    } else {
        return res.status(result.code).json(getErrorResponse(result.message));
    }
}