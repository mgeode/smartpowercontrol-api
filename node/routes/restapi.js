'use static';
/*
 * INCLUDES
 */
var pageUrl = '/switch';
var pageName = pageUrl.substr(1);
var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();
var config = require('../runcfg.json');
var file_cfg = __dirname+'/../runcfg.json';

//Logger
var logger = require('log4js').getLogger(pageName);
var loglevel = process.env.LOG_LEVEL || config.LOG_LEVEL;
logger.setLevel(loglevel);
var title = config.TITLE + ' ' + pageName;
var tools = require('../lib/utils/UtilsTools.js');
var sfact = require('../lib/hw/SwitchFactory.js');

router.post('/:id', function (req, res, next) {
	action (req, res, next);
});

router.get('/:id', function (req, res, next) {
    action (req, res, next);
});

router.get('/', function (req, res, next) {
    //var json = JSON.stringify(config);
    var jsondata = [];
    for (var i in config.REMOTE_POWER) {
        var item = config.REMOTE_POWER[i];

        var obj={};
        obj.text=item.name;
        obj.id=item.id;
        obj.checked=item.state;
        obj.rackid=item.rack;
        jsondata.push(obj)
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.end(JSON.stringify(jsondata));

});





function action (req,res,next){
	//Update json
    if (req.params.id != null) {
        var data = [];
        for (var i in config.REMOTE_POWER) {
            var t = config.REMOTE_POWER[i];
            if (t.id == req.params.id) {
                logger.info("Changing state: ", t.name);
                if (t.state == true) {
                    t.state = false;
                }
                else {
                    t.state = true;
                }

                t.date = tools.getDateFormated() + ' ' + tools.getTime(true);
                if (t.type == "usb")
                    sfact.setUsbChannel(t.rack, t.state);
                else
                    sfact.setSender433(t.rack, t.state);
            }
            data.push(t)
        }
        config.REMOTE_POWER = data;
        jsonfile.writeFileSync(file_cfg, config);

    }

    var objList = {};
    var jsondata = jsonfile.readFileSync(file_cfg);
    objList.tpl_elements = jsondata.REMOTE_POWER;
    objList.tpl_bodytitle = title;
    objList.tpl_url_home = config.URL_BASE
    objList.tpl_redirurl = config.HTTP_HOST + ':' + config.HTTP_PORT

    logger.trace("[json]", "objList", objList);
    res.render('tpl_switcher', objList);
}
/*
 *
 */
module.exports = router;