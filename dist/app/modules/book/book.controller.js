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
exports.BookController = void 0;
const pagination_1 = require("../../../constants/pagination");
const ApiError_1 = require("../../../errors/ApiError");
const pick_1 = require("../../../helpers/pick");
const sendResponse_1 = require("../../../shared/sendResponse");
const book_constant_1 = require("./book.constant");
const book_service_1 = require("./book.service");
const getAllBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchFilterQuery = (0, pick_1.pick)(req.query, book_constant_1.searchFilterFeilds);
        const paginationQuery = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
        console.log(searchFilterQuery);
        console.log(paginationQuery);
        const books = yield book_service_1.BookService.getAllBook(searchFilterQuery, paginationQuery);
        console.log({ books });
        if (!books) {
            throw new ApiError_1.ApiError(404, "Error getting books");
        }
        (0, sendResponse_1.sendResponse)(res, 'Successfully all books retrieved', books);
    }
    catch (error) {
        next(error);
    }
});
exports.BookController = {
    getAllBook
};
