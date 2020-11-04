'use strict';
var pageName='app';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var config = require('./runcfg.json');
var logger = require('log4js').getLogger(pageName);
logger.setLevel(process.env.LOG_LEVEL||config.LOG_LEVEL);

/*
 * SETTINGS
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


/*
 *  ROUTE-MODULE
 */
//var switcher = require('./routes/switcher.js');
var details = require('./routes/details.js');
var restapi = require('./routes/restapi.js');
var home = require('./routes/home.js');

/*
 * ROUTING
 */
app.use('/', home);
app.use('/api', restapi);
app.use('/details', details);
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    logger.warn('Error on Rendering', err);
    res.render('tpl_error', {
        //message: err.message,
        error: {
            stack: err
        }
    });
});

module.exports = app;
