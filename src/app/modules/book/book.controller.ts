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
        console.log(searchFilterQuery);
        console.log(paginationQuery);
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

export const BookController = {
    getAllBook
}