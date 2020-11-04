'use strict';

var udate = require('./UtilsDate.js');
var unet = require('./UtilsNet.js');
var ustring = require('./UtilsString.js');
var usystem = require('./UtilsSystem.js');

class UtilsTools {

    constructor() {
    }

    /**
     * Gesichertes Schneiden
     * @param strIn
     * @param intStart
     * @param intEnd
     */
    strCut(strIn, intStart, intEnd) {
        return ustring.strCut(strIn, intStart, intEnd);
    }

    /**
     *
     */
    getDateFormated() {
        return udate.getDateFormated();
    }

    getTime() { return udate.getTime();}
    getTime(isSeconds) { return udate.getTime(isSeconds);}
    getDate() { return udate.getDate()}
    getDate(isYear) { return udate.getDate(isYear);}

}

module.exports = new UtilsTools();