"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
exports.CategoryRouter = express_1.default.Router();
exports.CategoryRouter.post('/create-category', category_controller_1.CategoryController.createCategory);
exports.CategoryRouter.delete('/:id', category_controller_1.CategoryController.deleteCategory);
exports.CategoryRouter.get('/:id', category_controller_1.CategoryController.getSingleCategory);
exports.CategoryRouter.get('/', category_controller_1.CategoryController.getAllCategory);
exports.CategoryRouter.patch('/:id', category_controller_1.CategoryController.updateCategory);
