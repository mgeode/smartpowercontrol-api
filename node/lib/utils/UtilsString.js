'use strict';

exports.strCut= function (strIn, intStart,intEnd) {
    if (strIn.length >= intEnd)
        return strIn.substr(intStart,intEnd);

    return strIn;
}


/**
 * getElementsToString
 *
 * @param objList
 * @returns {string}
 */
exports.getElementsToString=function(objList) {
    var strRc="";
    for (var obel in objList) {
        var oel = objList[obel];
        strRc+=oel+" ";
    }
    return strRc.substr(0,strRc.length-1);
}

/**
 * getCpuTimeList
 * @param no
 * @returns {Array}
 */
exports.getCpuTimeList=function(no) {
    var rc_cpu = [];
    var CPUS = os.cpus();
    for (var i =0; i<CPUS.length;i++) {
        rc_cpu.push(CPUS[i].times);
    }
    return rc_cpu;
}