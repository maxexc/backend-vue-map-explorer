const Joi = require('joi');
const { nameRegexp, emailRegexp, passwordRegexp } = require('../constants/userConstants.js');


const registerSchema = Joi.object({
    name: Joi.string().pattern(new RegExp(nameRegexp)).messages({
        'string.pattern.base': 'At least 1 character in the name is required'
    }).required(),
    email: Joi.string().pattern(new RegExp(emailRegexp)).messages({
        'string.pattern.base': 'Email is not valid. Example: name@domain.com'
    }).required(),
    password: Joi.string().pattern(new RegExp(passwordRegexp)).messages({
        'string.pattern.base': 'Password must be 5-64 chars, only allowed characters. Example: p@ssW0rd!',
        'any.required': 'Password is required!'
    }).required(),
    //  or
    // name: Joi.string().min(1).max(50).required(),
    // email: Joi.string().email().required(),
    // password: Joi.string().min(6).max(64).required(),
});


const loginSchema = Joi.object({
    email: Joi.string().pattern(new RegExp(emailRegexp)).message({
        'string.pattern.base': 'Email is not valid. Example: name@domain.com'
    }).required(),
    password: Joi.string().pattern(new RegExp(passwordRegexp)).messages({
        'string.pattern.base': 'Password must be 5-64 chars, only allowed characters. Example: p@ssW0rd!',
        'any.required': 'Password is required!'
    }).required(),
    //  or
    // email: Joi.string().email().required(),
    // password: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema,
};