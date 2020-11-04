'use strict';

var config = require('../runcfg.json');
var file_cfg = './runcfg.json';
//Logger
var logger = require('log4js').getLogger('SwitchFactory');
var loglevel = process.env.LOG_LEVEL || config.LOG_LEVEL;
logger.setLevel(loglevel);
var dev_mode = config.DEV_MODE || false;
var sys = require('util');
var exec = require('child_process').exec;
var child;

/*
 * Sensor433
 */
exports.setSender433=function(dosen_id, dosen_mode) {
    logger.info("STATUS 433:", dosen_mode);
    var dosen_runmode = 0;
    if (dosen_mode == true)
        dosen_runmode = 1;

    if (dev_mode == false) {
        logger.trace(config.SENDER433_BIN, config.SENDER_HOMECODE, dosen_id, dosen_runmode);
        child = exec(config.SENDER433_BIN + " " + config.SENDER_HOMECODE + " " + dosen_id + " " + dosen_runmode + " -s", function (error) {
            if (error !== null) {
                logger.error('exec error: ' + error);
            }
        });
    }
    else {
        logger.info("DEV_MODE", "BIN:" + config.SENDER433_BIN, "CODE:" + config.SENDER_HOMECODE, "DOSE:" + dosen_id, "MODE:" + dosen_runmode);
    }
}
/**
 * USB
 * @param dosen_id
 * @param dosen_mode
 */
exports.setUsbChannel=function(usb_id, usb_mode) {
    logger.info("STATUS USB:", usb_mode);
    var usb_runmode = "-f";
    if (usb_mode == true)
        usb_runmode = "-o";

    if (dev_mode == false) {
        logger.trace(config.SENDERUSB_BIN, usb_id, usb_runmode);
        child = exec(config.SENDERUSB_BIN + " " + usb_runmode + " " + usb_id, function (error) {
            if (error !== null) {
                logger.error('exec error: ' + error);
            }
        });
    }
    else {
        logger.info("DEV_MODE", "BIN:" + config.SENDERUSB_BIN, "MODE:" + usb_runmode, "USB_ID:" + usb_id);
    }
}