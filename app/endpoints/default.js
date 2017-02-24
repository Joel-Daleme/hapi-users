'use strict';

const userHandler = require('../handlers/users');
const userSchema = require('../schemas/users');
const loginSchema = require('../schemas/login');

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'GET',
            path: '/user/index',
            config: {
                description: 'Liste des utilisateurs',
                notes: 'Liste des utilisateurs',
                tags: ['api'],
                handler: userHandler.index
            }
        },
        {
            method: 'POST',
            path: '/user/create',
            config: {
                description: 'Créer un utilisateur',
                notes: 'Route de création d\'un utilisateur',
                tags: ['api'],
                handler: userHandler.create,
                validate: {
                    payload: userSchema
                },
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'forms'
                    }
                }
            }
        },
        {
            method: 'PUT',
            path: '/user/edit/{user}',
            config: {
                description: 'Editer un utilisateur',
                notes: 'Route d\'édition d\'un utilisateur',
                tags: ['api'],
                handler: userHandler.edit,
                validate: {
                    payload: userSchema
                },
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'forms'
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/user/delete/{user}',
            config: {
                description: 'Supprimer un utilisateur',
                notes: 'Route de suppression d\'un utilisateur',
                tags: ['api'],
                handler: userHandler.delete,
            }
        },
        {
            method: 'POST',
            path: '/user/authent',
            config: {
                description: 'Login',
                notes: 'Authentification',
                tags: ['api'],
                handler: userHandler.login,
                validate: {
                    payload: loginSchema
                },
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'forms'
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/user/reset/{user}',
            config: {
                description: 'Login',
                notes: 'Authentification',
                tags: ['api'],
                handler: userHandler.reset,
            }
        }
    ]);
    next();
};

exports.register.attributes = {
    name: 'default-routes'
};