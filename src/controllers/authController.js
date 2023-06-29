const { validate, register, login } = require("../services/authService");
const { getErrorResponse, getSuccessResponse } = require("../utils/baseResponse");


exports.registerUser = async (req, res) => {
    const validationResult = await validate(req.body);
    if (validationResult.status === true) {
        const result = await register(req.body);
        if (result.status === true) {
            return res.status(201).json(getSuccessResponse(result.data));
        } else {
            return res.status(result.code).json(getErrorResponse(result.message));    
        }
        
    } else {
        return res.status(validationResult.code).json(getErrorResponse(validationResult.message));
    }
}

exports.loginUser = async (req, res) => {
    const result = await login(req);
    if (result.status === true) {
        return res.status(201).json(getSuccessResponse(result.data));
    } else {
        return res.status(validationResult.code).json(getErrorResponse(validationResult.message));
    }
}