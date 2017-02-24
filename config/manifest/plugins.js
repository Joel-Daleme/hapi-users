'use strict';

const async     = require('async');
const envConfig = require('../environments/all');

module.exports.init = server => {
    return new Promise((resolve, reject) => {
        async.series({
            good(done) {
                server.register({
                    register : require('good')
                }, done);
            },
            blipp(done) {
                server.register({
                    register : require('blipp'),
                    options  : {
                        showStart : envConfig.log.showRouteAtStart,
                        showAuth  : true
                    }
                }, done);
            },
            boom(done) {
                server.register({
                    register : require('hapi-boom-decorators')
                }, done);
            },
            happiSwagger(done) {
                server.register({
                    register : require('hapi-swagger'),
                    options: {
                        info: {
                            'title': 'Test API Documentation',
                        }
                    }
                }, done);
            },
            inert(done) {
                server.register({
                    register : require('inert')
                }, done);
            },
            vision(done) {
                server.register({
                    register : require('vision')
                }, done);
            },
            ioClient(done) {
                server.register({
                    register : require('../../app/plugins/client-io'),
                    options : {
                        server : 'http://127.0.0.1:8081'
                    }
                }, done);
            },
            happiIo(done){
                server.register({
                    register : require('hapi-io')
                }, done);
            }
        }, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};