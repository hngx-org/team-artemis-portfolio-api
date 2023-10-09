"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
var success = function (res, data, message) {
    if (message === void 0) { message = "Success"; }
    return res.status(200).json({ successful: true, message: message, data: data });
};
exports.success = success;
var error = function (res, message, statusCode) {
    if (message === void 0) { message = "Error"; }
    if (statusCode === void 0) { statusCode = 500; }
    return res
        .status(statusCode)
        .json({ successful: false, message: message, data: null });
};
exports.error = error;
//# sourceMappingURL=response.util.js.map