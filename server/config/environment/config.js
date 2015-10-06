'use strict';

// Development specific configuration
// ==================================
module.exports = {
    env: "dev", // dev, rel o pro
    log : {
        app : {
            name : 'Log App',
            streams : [
                {
                    level : 'info',
                    type : 'file',
                    // Sistemas definirá la ruta
                    path : __dirname+'/../../../logs/app_requests.log'
                },
                {
                    level : 'error',
                    type : 'file',
                    // Sistemas definirá la ruta
                    path : __dirname+'/../../../logs/app_errors.log'
                }
            ]
        }
    },
    test : {
        user : 'teseUser'
    },
    mongo: {
        uri: 'mongodb://localhost/d3charts-dev'
    },
    aws : {
        credentials : require(__dirname+'/aws_credentials.json'),
        region : "" ,
        bucket : "",
        deploy : false
    }
};
