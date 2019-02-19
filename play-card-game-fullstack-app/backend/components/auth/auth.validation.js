var Joi = require('joi');
var AuthValidation = {
    login: {
        body: {
            login: Joi.string().required(),
            password: Joi.string().required(),
        }
    },
    signup: {
        body: {
            name: Joi.string().regex(/^[0-9a-zA-Z ]{2,24}$/).required(),
            email: Joi.string().email().required(),
            mobile: Joi.required(),
            password: Joi.string().required().min(2).max(50),
        }
    }
};
module.exports = AuthValidation;