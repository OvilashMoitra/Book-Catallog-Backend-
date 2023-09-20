"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = require("../../../errors/ApiError");
const sendResponse_1 = require("../../../shared/sendResponse");
const order_service_1 = require("./order.service");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req === null || req === void 0 ? void 0 : req.user;
        const order = yield order_service_1.OrderService.createOrder(userInfo, req.body);
        if (!order) {
            throw new ApiError_1.ApiError(404, "Error initialing order");
        }
        (0, sendResponse_1.sendResponse)(res, 'Successfully order created', order);
    }
    catch (error) {
        next(error);
    }
});
const getAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req === null || req === void 0 ? void 0 : req.user;
        const allOrder = yield order_service_1.OrderService.getAllOrder(userInfo);
        if (!allOrder) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Error getting the orders");
        }
        (0, sendResponse_1.sendResponse)(res, 'Successfully retrieved the orders', allOrder);
    }
    catch (error) {
        next(error);
    }
});
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orderId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.orderId;
        const userInfo = req === null || req === void 0 ? void 0 : req.user;
        const orderById = yield order_service_1.OrderService.getOrderById(orderId, userInfo);
        if (!orderById) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Error getting the orders");
        }
        (0, sendResponse_1.sendResponse)(res, 'Successfully retrieved the orders', orderById);
    }
    catch (error) {
        next(error);
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
    getOrderById
};
