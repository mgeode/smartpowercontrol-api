'use static';
/*
 * INCLUDES
 */
var pageName = "rest";
var express = require('express');
var jsonfile = require('jsonfile');
var router = express.Router();
var config = require('../runcfg.json');
var file_cfg = __dirname+'/../runcfg.json';

//Logger
var logger = require('log4js').getLogger(pageName);
var loglevel = process.env.LOG_LEVEL || config.LOG_LEVEL;
logger.setLevel(loglevel);
var tools = require('../lib/utils/UtilsTools.js');
var sfact = require('../lib/hw/SwitchFactory.js');

router.get('/', function (req, res, next) {
	var json = JSON.stringify(config);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.end(json);
});

// router.get('/:id', function (req, res, next) {
//     //Update json
//     if (req.params.id != null) {
//         var data = [];
//         var valid_id=false;
//         for (var i in config.REMOTE_POWER) {
//             var t = config.REMOTE_POWER[i];
//             if (t.id == req.params.id) {
//                 valid_id=true;
//                 logger.info("Changing state: ", t.name);
//                 if (t.state == true) {
//                     t.state = false;
//                 }
//                 else {
//                     t.state = true;
//                 }
//
//                 t.date = tools.getDateFormated() + ' ' + tools.getTime(true);
//                 if (t.type == "usb")
//                     sfact.setUsbChannel(t.rack, t.state);
//                 else
//                     sfact.setSender433(t.rack, t.state);
//             }
//             data.push(t)
//         }
//         config.REMOTE_POWER = data;
//         jsonfile.writeFileSync(file_cfg, config);
//
//         var jsondata = jsonfile.readFileSync(file_cfg);
//         logger.trace("[REST]", "jsondata", jsondata);
//         if (valid_id) {
//             res.sendStatus(200);
//         }
//         else {
//             res.sendStatus(400);
//         }
//     }
// });
/*
 *
 */
module.exports = router;
