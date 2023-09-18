import { NextFunction, Request, Response } from "express"
import { paginationFields } from "../../../constants/pagination"
import { ApiError } from "../../../errors/ApiError"
import { pick } from "../../../helpers/pick"
import { sendResponse } from "../../../shared/sendResponse"
import { searchFilterFeilds } from "./book.constant"
import { BookService } from "./book.service"

const getAllBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const searchFilterQuery = pick(req.query, searchFilterFeilds)
        const paginationQuery = pick(req.query, paginationFields)
        // console.log(searchFilterQuery);
        // console.log(paginationQuery);
        const books = await BookService.getAllBook(searchFilterQuery, paginationQuery)
        console.log({ books });
        if (!books) {
            throw new ApiError(404, "Error getting books")
        }

        sendResponse(res, 'Successfully all books retrieved', books)

    } catch (error) {
        next(error)
    }
}
const getBookByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await BookService.getBookByCategory(req.params.categoryId as string)

        if (!books) {
            throw new ApiError(404, "No book found in this Category")
        }

        sendResponse(res, 'Successfully retrieved all books by Category', books)

    } catch (error) {
        next(error)
    }
}
const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await BookService.getSingleBook(req.params.id)

        if (!book) {
            throw new ApiError(404, "No book found")
        }

        sendResponse(res, 'Successfully  retrieved the book', book)

    } catch (error) {
        next(error)
    }
}
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await BookService.deleteBook(req.params.id)

        if (!book) {
            throw new ApiError(404, "No book found")
        }

        sendResponse(res, 'Successfully  deleted the book', book)

    } catch (error) {
        next(error)
    }
}
const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await BookService.createBook(req.body)

        if (!book) {
            throw new ApiError(404, "Error creating book")
        }

        sendResponse(res, 'Successfully  created the book', book)

    } catch (error) {
        next(error)
    }
}

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await BookService.updateBook(req.body, req.params.id)

        if (!book) {
            throw new ApiError(404, "Error creating book")
        }

        sendResponse(res, 'Successfully  created the book', book)

    } catch (error) {
        next(error)
    }
}


export const BookController = {
    getAllBook,
    getBookByCategory,
    deleteBook,
    getSingleBook,
    createBook,
    updateBook
}