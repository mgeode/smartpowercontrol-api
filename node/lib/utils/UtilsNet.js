'use strict';

/**
 * getHostname
 *
 * @returns {*}
 */
exports.getHostname = function () {
    if (process.env.HOSTNAME != null)
        return process.env.HOSTNAME;

    return os.hostname();
}