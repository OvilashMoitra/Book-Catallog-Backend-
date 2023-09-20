"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middlewares/authorization");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
exports.BookRouter = express_1.default.Router();
exports.BookRouter.post('/create-book', (0, validateRequest_1.default)(book_validation_1.bookZodSchema.createBook), (0, authorization_1.authorization)(client_1.Role.admin), book_controller_1.BookController.createBook);
exports.BookRouter.delete('/:id', (0, authorization_1.authorization)(client_1.Role.admin), book_controller_1.BookController.deleteBook);
exports.BookRouter.get('/:id', book_controller_1.BookController.getSingleBook);
exports.BookRouter.get('/', book_controller_1.BookController.getAllBook);
exports.BookRouter.patch('/:id', (0, validateRequest_1.default)(book_validation_1.bookZodSchema.updateBook), (0, authorization_1.authorization)(client_1.Role.admin), book_controller_1.BookController.updateBook);
exports.BookRouter.get('/:categoryId/category', (0, authorization_1.authorization)(client_1.Role.admin), book_controller_1.BookController.getBookByCategory);
