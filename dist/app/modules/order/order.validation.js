"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodSchema = void 0;
const zod_1 = require("zod");
const orderCreate = zod_1.z.object({
    orderedBooks: zod_1.z.array(zod_1.z.object({
        bookId: zod_1.z.string({
            required_error: "Book id is required"
        }).uuid(),
        quantity: zod_1.z.number({
            required_error: "Book Quantity is required"
        }).min(1)
    }).strict())
}).strict();
exports.orderZodSchema = {
    orderCreate
};
