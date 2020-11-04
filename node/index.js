#!/usr/bin/env node
var config = require('./runcfg.json');
const listenPort = process.env.HTTP_PORT || config.HTTP_PORT;
var app = require('./app');
var http = require('http');
var logger = require('log4js').getLogger('index');
logger.setLevel(process.env.LOG_LEVEL||config.LOG_LEVEL);


var server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);


server.listen(listenPort);


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    logger.error('start HTTP-server had errors ', error);
    process.exit(1);
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    logger.info("INIT", "Listening on port " + bind);
}
