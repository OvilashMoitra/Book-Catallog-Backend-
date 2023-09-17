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
exports.CategoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = require("../../../errors/ApiError");
const sendResponse_1 = require("../../../shared/sendResponse");
const category_service_1 = require("./category.service");
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCategory = yield category_service_1.CategoryService.updateCategory(req.body, req.params.id);
        if (!updatedCategory) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed updating category");
        }
        (0, sendResponse_1.sendResponse)(res, 'Category updated successfully', updatedCategory);
    }
    catch (error) {
        next(error);
    }
});
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_service_1.CategoryService.createCategory(req.body);
        if (!category) {
            throw new ApiError_1.ApiError(404, "Error creating category");
        }
        (0, sendResponse_1.sendResponse)(res, 'Successfully category created', category);
    }
    catch (error) {
        next(error);
    }
});
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedCategory = yield category_service_1.CategoryService.deleteCategory(id);
        (0, sendResponse_1.sendResponse)(res, 'Category deleted', deletedCategory);
    }
    catch (error) {
        next(error);
    }
});
const getSingleCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield category_service_1.CategoryService.getSingleCategory(id);
        if (!category) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed getting category");
        }
        (0, sendResponse_1.sendResponse)(res, 'User retrieved successfully', category);
    }
    catch (error) {
        next(error);
    }
});
const getAllCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCategories = yield category_service_1.CategoryService.getAllCategory();
        if (!allCategories) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed getting category");
        }
        (0, sendResponse_1.sendResponse)(res, 'User retrieved successfully', allCategories);
    }
    catch (error) {
        next(error);
    }
});
exports.CategoryController = {
    createCategory,
    deleteCategory,
    getAllCategory,
    updateCategory,
    getSingleCategory
};
