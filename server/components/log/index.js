var bunyan      = require('bunyan');
var config      = require(__dirname+'/../../config/environment');
var logger = new bunyan(config.log.app);
module.exports = logger;