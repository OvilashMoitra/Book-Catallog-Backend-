"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.post('/signup', user_controller_1.UserController.userSignup);
exports.UserRouter.delete('/:id', user_controller_1.UserController.deletedUser);
exports.UserRouter.get('/:id', user_controller_1.UserController.getSingleUser);
exports.UserRouter.get('/', user_controller_1.UserController.getAllUser);
exports.UserRouter.patch('/:id', user_controller_1.UserController.updateUser);
