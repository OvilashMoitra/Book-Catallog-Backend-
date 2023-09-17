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
exports.CategoryService = void 0;
const app_1 = require("../../../app");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield app_1.prisma.category.create({
        data: payload
    });
    return category;
});
const deleteCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCategory = yield app_1.prisma.category.delete({
        where: {
            id: payload
        }
    });
    return deletedCategory;
});
const getSingleCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const getCategory = yield app_1.prisma.category.findUnique({
        where: {
            id: payload
        }
    });
    return getCategory;
});
const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllCategory = yield app_1.prisma.category.findMany();
    return getAllCategory;
});
const updateCategory = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllCategory = yield app_1.prisma.category.update({
        where: {
            id
        },
        data: payload
    });
    return getAllCategory;
});
exports.CategoryService = {
    getAllCategory,
    deleteCategory,
    updateCategory,
    getSingleCategory,
    createCategory
};
