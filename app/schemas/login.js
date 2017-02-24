'use strict';

const Joi = require('joi');

const login = Joi.object().keys({
    login: Joi.string().alphanum().required(),
    password: Joi.string().required(),
});

module.exports = login;