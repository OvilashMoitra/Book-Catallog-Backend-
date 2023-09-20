"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middlewares/authorization");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
exports.CategoryRouter = express_1.default.Router();
exports.CategoryRouter.post('/create-category', (0, validateRequest_1.default)(category_validation_1.categoryZodSchema.category), (0, authorization_1.authorization)(client_1.Role.admin), category_controller_1.CategoryController.createCategory);
exports.CategoryRouter.delete('/:id', (0, authorization_1.authorization)(client_1.Role.admin), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRouter.get('/:id', category_controller_1.CategoryController.getSingleCategory);
exports.CategoryRouter.get('/', category_controller_1.CategoryController.getAllCategory);
exports.CategoryRouter.patch('/:id', (0, validateRequest_1.default)(category_validation_1.categoryZodSchema.category), (0, authorization_1.authorization)(client_1.Role.admin), category_controller_1.CategoryController.updateCategory);
