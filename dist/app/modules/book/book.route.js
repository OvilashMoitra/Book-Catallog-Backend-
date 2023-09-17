"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
exports.BookRouter = express_1.default.Router();
// BookRouter.post('/signup', UserController.userSignup)
// BookRouter.delete('/:id', UserController.deletedUser)
// BookRouter.get('/:id', UserController.getSingleUser)
exports.BookRouter.get('/', book_controller_1.BookController.getAllBook);
// BookRouter.patch('/:id', UserController.updateUser)
