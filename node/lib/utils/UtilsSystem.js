'use strict';

/**
 * getEnv
 * @returns {Window.process.env|{}}
 */
exports.getEnv=function() {
    return process.env;
}

/**
 * getCpuSum
 * @returns {number}
 */
exports.getCpuSum=function () {
    return os.cpus().length;
}

/**
 * getCpuModel
 * @returns {*}
 */

exports.getCpuModel=function() {
    var CPU = os.cpus();
    return CPU[0].model;
}