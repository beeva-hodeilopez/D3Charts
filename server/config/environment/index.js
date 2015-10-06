'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var envConfig=__dirname+'/config.js';
var customConfig={};
var systemConfig;

// All configurations will extend these options
// ============================================
var config = {

    // Nombre del proyecto
    project : 'd3-charts',
    // Módulo
    module : "front",

    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 8080,

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'd3-charts-secret'
    },

    // List of user roles
    userRoles: ['guest', 'user', 'admin'],

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    },

};

systemConfig='/var/properties/'+config.project+'/'+config.module+'/config.js';

// Carga de configuraciones personalizadas por entorno
// Si hay parámetro CONFIG al lanzar NODE se carga esa config
// Si no se intenta cargar de la ruta indicada por SISTEMAS
// Si no carga config.js del proyecto
// ==============================================

if(process.env.CONFIG && fs.existsSync(process.env.CONFIG)){
    console.log('Cargada la configuración manual de la ruta: '+process.env.CONFIG);
    customConfig=require(process.env.CONFIG);
}else if(fs.existsSync(systemConfig)){
    console.log('Cargada la configuración estándar SISTEMAS de la ruta: '+systemConfig);
    customConfig=require(systemConfig);
}else if(fs.existsSync(envConfig)){
    console.log('Cargada la configuración local');
    customConfig=require(envConfig);
}
config=_.merge(
    config,
    customConfig
);

module.exports = config;