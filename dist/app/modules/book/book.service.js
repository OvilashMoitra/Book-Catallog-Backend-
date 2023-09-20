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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = require("../../../errors/ApiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const book_constant_1 = require("./book.constant");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield app_1.prisma.category.findUnique({
        where: {
            id: payload.categoryId
        }
    });
    if (!category) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
    }
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
const getBookByCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield app_1.prisma.category.findUnique({
        where: { id: payload }
    });
    if (!category) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
    }
    const bookByCategory = yield app_1.prisma.book.findMany({
        where: {
            categoryId: payload
        },
        include: {
            category: true
        }
    });
    return bookByCategory;
});
const getAllBook = (filter, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filter, filterFeilds = __rest(filter, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: book_constant_1.searchFields.map((field) => {
                if (field === "category") {
                    return {
                        "category": {
                            "title": {
                                contains: searchTerm,
                                mode: 'insensitive'
                            }
                        }
                    };
                }
                if (field !== "category") {
                    return {
                        [field]: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    };
                }
            })
        });
    }
    if (Object.keys(filterFeilds).length > 0) {
        andConditions.push({
            AND: Object.keys(filterFeilds).map((key) => {
                {
                    return {
                        [key]: {
                            equals: filterFeilds[key]
                        }
                    };
                }
            })
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    console.log(whereConditions);
    console.dir(whereConditions);
    const allBooks = yield app_1.prisma.book.findMany({
        include: { category: true },
        where: whereConditions,
        skip: (0, paginationHelper_1.paginationHelper)(pagination).skip || 0,
        take: (0, paginationHelper_1.paginationHelper)(pagination).take || 10,
        orderBy: pagination.sortBy && pagination.sortOrder
            ? { [pagination.sortBy]: pagination.sortOrder }
            : {
                createdAt: 'desc'
            },
    });
    const meta = {
        "page": pagination.page || 1,
        "size": pagination.limit || 10,
        "total": yield app_1.prisma.book.count,
    };
    return { meta, allBooks, whereConditions };
});
const updateBook = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.categoryId) {
        const category = yield app_1.prisma.category.findUnique({
            where: {
                id: payload.categoryId
            }
        });
        if (!category) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Category not found");
        }
    }
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
    createBook,
    getBookByCategory
};
