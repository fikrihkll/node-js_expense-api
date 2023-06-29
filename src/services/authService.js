const User = require("../models/user");
const { getBadRequestServiceModel, getSuccessResponseServiceModel, getInternalServerErrorServiceModel } = require("../utils/baseResponse");
const { fieldIsRequired } = require("../utils/constant");
const { generateNewToken } = require("../utils/tokenUtils");
const bcrypt = require('bcrypt');

const loginUser = async (email, password, fcmToken) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return getBadRequestServiceModel("email atau password salah");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return getBadRequestServiceModel("email atau password salah");
        }

        let { newToken } = await generateNewToken(user);

        if (fcmToken) {
            await User.update({
                fcm_token: fcmToken
            }, {
                where: {
                    id: user.id
                }   
            });
        }

        const finalJson = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: newToken,
            fcm_token: fcmToken
        }
        return { status: true, data: finalJson };
    } catch (error) {
        return { status: false, message: error };
    }
}

exports.validate = async (body) => {
    const { name, email, password } = body;

    let validationMessages = [];
    if (!name) {
        validationMessages.push(fieldIsRequired('name'));
    }
    if (!email) {
        validationMessages.push(fieldIsRequired('email'));
    }
    if (!password) {
        validationMessages.push(fieldIsRequired('password'));
    }
    if (password.length < 8) {
        validationMessages.push("password harus lebih dari 8 karakter");
    }

    if (validationMessages.length === 0) {
        return getSuccessResponseServiceModel();
    } else {
        return getBadRequestServiceModel(validationMessages);
    }
}

exports.register = async (body) => {
    let isRegisterSuccess = false;
    try {
        const { name, email, password } = body;

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return getBadRequestServiceModel("email sudah digunakan pada akun lain");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        isRegisterSuccess = true;
        const finalJson = await loginUser(email, password);
        if (finalJson.status === true) {
            return getSuccessResponseServiceModel(finalJson.data, "berhasil login!");
        } else {
            return getBadRequestServiceModel(finalJson.message);
        }
    } catch (error) {
        if (isRegisterSuccess === true) {
            return getBadRequestServiceModel("Akun berhasil didaftarkan, coba untuk login");
        } else {
            return getInternalServerErrorServiceModel(error);
        }
    }
};


exports.login = async (req) => {
    try {
        const { email, password, fcm_token } = req.body;

        const finalJson = await loginUser(email, password, fcm_token);
        if (finalJson.status === true) {
            return getSuccessResponseServiceModel(finalJson.data, "berhasil login!");
        } else {
            return getBadRequestServiceModel(finalJson.message);
        }

    } catch (error) {
        return getInternalServerErrorServiceModel(error);
    }
};

exports.loginSSO = async (req) => {
    try {
        const { sso_auth_token, email, fcm_token } = req.body;

        const finalJson = await loginUser(email, password, fcm_token);
        if (finalJson.status === true) {
            return getSuccessResponseServiceModel(finalJson.data, "berhasil login!");
        } else {
            return getBadRequestServiceModel(finalJson.message);
        }

    } catch (error) {
        return getInternalServerErrorServiceModel(error);
    }
};