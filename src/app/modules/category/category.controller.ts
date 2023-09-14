import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ApiError } from "../../../errors/ApiError"
import { sendResponse } from "../../../shared/sendResponse"
import { CategoryService } from "./category.service"

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedCategory = await CategoryService.updateCategory(req.body, req.params.id)
        if (!updatedCategory) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed updating category")
        }

        sendResponse(res, 'Category updated successfully', updatedCategory)
    } catch (error) {
        next(error)
    }
}

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await CategoryService.createCategory(req.body)
        if (!category) {
            throw new ApiError(404, "Error creating category")
        }

        sendResponse(res, 'Successfully category created', category)

    } catch (error) {
        next(error)
    }
}

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const deletedCategory = await CategoryService.deleteCategory(id)
        sendResponse(res, 'Category deleted', deletedCategory)
    } catch (error) {
        next(error)
    }
}

const getSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const category = await CategoryService.getSingleCategory(id)
        if (!category) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed getting category")
        }
        sendResponse(res, 'User retrieved successfully', category)
    } catch (error) {
        next(error)
    }
}

const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allCategories = await CategoryService.getAllCategory()
        if (!allCategories) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed getting category")
        }

        sendResponse(res, 'User retrieved successfully', allCategories)
    } catch (error) {
        next(error)
    }
}




export const CategoryController = {
    createCategory,
    deleteCategory,
    getAllCategory,
    updateCategory,
    getSingleCategory
}