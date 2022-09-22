"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid").v4;
/**
 * Generate a unique order id with prepended date & time
 * @returns {String} Unique order id with prepended date & time
 */
function newOrderId() {
    var now = new Date().toISOString();
    // Prepend creation date as YYYY-MM-DD
    var date = now.substring(0, 10);
    // Time as HHMM
    var time = now.substring(11, 13) + now.substring(14, 16);
    // Append unique identifier
    var uniqueId = uuid();
    return "".concat(date, "-").concat(time, "-").concat(uniqueId);
}
exports.default = newOrderId;
