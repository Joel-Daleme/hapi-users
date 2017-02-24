'use strict';
const jsonToMongoose = require('json-mongoose');
const mongoose = require('k7-mongoose').mongoose();
const async             = require('async');
const crypto            = require('crypto');

module.exports = jsonToMongoose({
    mongoose    : mongoose,
    collection  : 'users',
    schema      : require('../schemas/users'),
    autoinc     : {
        field : '_id'
    },
    schemaUpdate : (schema) => {
        schema.email.unique  = true;

        return schema;
    },
    pre         : {
        save : (doc, next) => {
            async.parallel({
                password : done => {
                    doc.password = crypto.createHmac('sha1', 'jojo').update(doc.password).digest('hex');
                    done();
                }
            }, next);
        }
    },
    options : {

    }
});