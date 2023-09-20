"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookZodSchema = void 0;
const zod_1 = require("zod");
const createBook = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Book title is required'
    }),
    author: zod_1.z.string({
        required_error: 'Book author is required'
    }),
    price: zod_1.z.number({
        required_error: 'Book price is required'
    }),
    genre: zod_1.z.string({
        required_error: 'Book genre is required'
    }),
    publicationDate: zod_1.z.string({
        required_error: 'Book publication date is required'
    }),
    categoryId: zod_1.z.string({
        required_error: 'Book category is required'
    }).uuid(),
});
const updateBook = zod_1.z.object({
    title: zod_1.z.string().optional(),
    author: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    genre: zod_1.z.string().optional(),
    publicationDate: zod_1.z.date().optional(),
    categoryId: zod_1.z.string().uuid().optional(),
});
exports.bookZodSchema = {
    createBook,
    updateBook
};
