'use static';
/*
 * INCLUDES
 */
var pageName='home';
var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();
var config = require('../runcfg.json');
var file_cfg = __dirname+'/../runcfg.json';
var logger = require('log4js').getLogger(pageName);
logger.setLevel(process.env.LOG_LEVEL || config.LOG_LEVEL);
var title = config.TITLE;


/*
 * HTTP
 */
router.get('/', function (req, res, next) {
    var objList = {};
    var jsondata = jsonfile.readFileSync(file_cfg);
    objList.tpl_elements = jsondata.REMOTE_POWER;
    objList.tpl_bodytitle = title;
    objList.tpl_url_home = config.URL_BASE;

    logger.trace("[json]", "objList", objList);
    res.render('tpl_home', objList);
});
/*
 *
 */
module.exports = router;