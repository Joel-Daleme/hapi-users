'use strict';

const boom = require('boom');
const User = require('../models/users');
const crypto = require('crypto');

module.exports.index = (request, response) => {
    User.find({}, function (err, users) {
        if (err) {
            response('Une erreur est survenue').code(500);
            throw err;
        }
        response(users).code(200);
    });
};

module.exports.create = (request, response) => {
    let newUser = new User(request.payload);
    newUser.save(function (err) {
        if (err) {
            response('Une erreur est survenue lors de la création de l\'utilisateur').code(500);
            throw err;
        }

        request.server.ioClient.emit('user-register', { user : newUser });

        response('Utilisateur créé').code(201);
    });
};

module.exports.edit = (request, response) => {
    User.update({_id: request.params.user}, request.payload, function (err, user) {
        if (err) {
            response('Une erreur est survenue lors de l\'édition de l\'utilisateur').code(500);
            throw err;
        }
        response('Utilisateur modifié').code(201);
    });
};

module.exports.delete = (request, response) => {
    User.findOneAndRemove({_id: request.params.user}, function (user, err) {
        if(!user){
            response('Utilisateur introuvable').code(404);
        }
        if (err) {
            response('Une erreur est survenue lors de la suppression de l\'utilisateur').code(500);
            throw err;
        }

        response('Utilisateur supprimé').code(204);
    });
};

module.exports.login = (request, response) => {
    let password = crypto.createHmac('sha1', 'jojo').update(request.payload.password).digest('hex');
    User.find({login: request.payload.login, password: password}, function (err, user) {
        if(user.length === 0) {
            response({msg: 'ko'}).code(401);
        }else {
            response({msg: 'ok'}).code(200);
        }
    });
};

module.exports.reset = (request, response) => {
    let pass = crypto.randomBytes(4).toString('hex');
    let password =  crypto.createHmac('sha1', 'jojo').update(pass).digest('hex');
    User.update({_id: request.params.user}, {password: password}, function(err, user){
        if(!user){
            response('Utilisateur introuvable').code(404);
        }
        if (err) {
            response('Une erreur est survenue').code(500);
            throw err;
        }

        User.findOne({_id: request.params.user}, function(err, usr){
            request.server.ioClient.emit('user-reset-pass', { user : usr, pass: pass });
            response(null).code(200);
        });
    });
};
