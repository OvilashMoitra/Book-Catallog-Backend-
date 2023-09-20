import { Book, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { ApiError } from "../../../errors/ApiError";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { searchFields } from "./book.constant";
import { IBookFilter } from "./book.interface";

const createBook = async (payload: Book) => {
    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId
        }
    })
    if (!category) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Category not found")
    }
    const book = await prisma.book.create({
        data: payload
    })
    return book
}

const deleteBook = async (payload: string) => {
    const deletedBook = await prisma.book.delete({
        where: {
            id: payload
        }
    })
    return deletedBook
}

const getSingleBook = async (payload: string) => {
    const getBook = await prisma.book.findUnique({
        where: {
            id: payload
        },
        include: {
            category: true
        }
    })
    return getBook
}
const getBookByCategory = async (payload: string) => {
    const category = await prisma.category.findUnique({
        where: { id: payload }
    })
    if (!category) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Category not found")
    }
    const bookByCategory = await prisma.book.findMany({
        where: {
            categoryId: payload
        },
        include: {
            category: true
        }
    })
    return bookByCategory
}

const getAllBook = async (filter: Partial<IBookFilter>, pagination: IPaginationOptions) => {

    const { searchTerm, ...filterFeilds } = filter
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: searchFields.map((field) => {
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
                    }
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
                            equals: (filterFeilds as any)[key]
                        }
                    };
                }
            })
        });
    }

    const whereConditions: Prisma.BookWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};
    console.log(whereConditions);
    console.dir(whereConditions);
    const allBooks = await prisma.book.findMany({
        include: { category: true },
        where: whereConditions,
        skip: paginationHelper(pagination).skip || 0,
        take: paginationHelper(pagination).take || 10,
        orderBy: pagination.sortBy && pagination.sortOrder
            ? { [pagination.sortBy]: pagination.sortOrder }
            : {
                createdAt: 'desc'
        },

    })
    const meta = {
        "page": pagination.page || 1,
        "size": pagination.limit || 10,
        "total": await prisma.book.count,
    }
    return { meta, allBooks, whereConditions }
}

const updateBook = async (payload: Partial<Book>, id: string) => {
    if (payload.categoryId) {
        const category = await prisma.category.findUnique({
            where: {
                id: payload.categoryId
            }
        })
        if (!category) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Category not found")
        }
    }
    const updatedBook = await prisma.book.update({
        where: {
            id
        },
        data: payload,
        include: {
            category: true
        }
    })

    return updatedBook
}

export const BookService = {
    getAllBook,
    deleteBook,
    updateBook,
    getSingleBook,
    createBook,
    getBookByCategory
}


