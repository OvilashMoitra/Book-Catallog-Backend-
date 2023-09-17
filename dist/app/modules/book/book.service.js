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
exports.BookService = void 0;
const app_1 = require("../../../app");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield app_1.prisma.book.create({
        data: payload
    });
    return book;
});
const deleteBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBook = yield app_1.prisma.book.delete({
        where: {
            id: payload
        }
    });
    return deletedBook;
});
const getSingleBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const getBook = yield app_1.prisma.book.findUnique({
        where: {
            id: payload
        },
        include: {
            category: true
        }
    });
    return getBook;
});
const getAllBook = (searchFilter, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    // const {"searchTerm",...filter}=searchFilter
    const getAllBook = yield app_1.prisma.book.findMany({
        where: {},
        include: { category: true },
        skip: 3,
        take: 4,
    });
    const meta = {
        "page": 3,
        "size": 10,
        "total": app_1.prisma.book.count,
        "totalPage": 7
    };
    return getAllBook;
});
const updateBook = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield app_1.prisma.book.update({
        where: {
            id
        },
        data: payload,
        include: {
            category: true
        }
    });
    return updatedBook;
});
exports.BookService = {
    getAllBook,
    deleteBook,
    updateBook,
    getSingleBook,
    createBook
};
