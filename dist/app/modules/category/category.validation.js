"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryZodSchema = void 0;
const zod_1 = require("zod");
const category = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Title is required'
    })
});
exports.categoryZodSchema = {
    category
};