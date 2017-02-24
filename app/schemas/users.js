'use strict';

const Joi = require('joi');

const users = Joi.object().keys({
    login: Joi.string().alphanum().required(),
    password: Joi.string().min(8).required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    company: Joi.string(),
    function: Joi.string(),
    nir: Joi.string().regex(/^[12][0-9]{2}[0-1][0-9](2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}[0-9]{2}$/)
});

module.exports = users;