"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, message, data) => {
    res.status(200).json({
        "success": true,
        "statusCode": 200,
        message,
        data: data
    });
};
exports.sendResponse = sendResponse;
