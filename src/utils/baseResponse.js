const { INTERNAL_SERVER_ERROR } = require("../utils/constant");

exports.getInternalServerErrorServiceModel = (error) => { 
    console.log(error);
    return { status: false, code: 500, message: INTERNAL_SERVER_ERROR };
};

exports.getBadRequestServiceModel = (messages) => { 
    return { status: false, code: 400, message: messages };
};

exports.getSuccessResponseServiceModel = (data = null, message = "") => { 
    return { status: true, data, message: message };
};

exports.getSuccessResponse = (values = null, message = "success") => {
    return { 
        error: false,
        message: message,
        values 
    };
};

exports.getErrorResponse = (message = "something wrong happened!") => {
    return { 
        error: true,
        message: message,
        values: null
    };
};