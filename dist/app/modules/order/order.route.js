"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middlewares/authorization");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
exports.OrderRouter = express_1.default.Router();
exports.OrderRouter.post('/create-order', (0, validateRequest_1.default)(order_validation_1.orderZodSchema.orderCreate), (0, authorization_1.authorization)(client_1.Role.customer), order_controller_1.OrderController.createOrder);
exports.OrderRouter.get('/', (0, authorization_1.authorization)(client_1.Role.admin, client_1.Role.customer), order_controller_1.OrderController.getAllOrder);
exports.OrderRouter.get('/:orderId', (0, authorization_1.authorization)(client_1.Role.admin, client_1.Role.customer), order_controller_1.OrderController.getOrderById);
