import { Book, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { ApiError } from "../../../errors/ApiError";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IBookFilter } from "./book.interface";

const createBook = async (payload: Book) => {
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
    console.log(filter);
    // if (searchTerm) {
    //     andConditions.push({
    //         OR: searchFilterFeilds.map((field) => ({
    //             [field]: {
    //                 contains: searchTerm,
    //                 mode: 'insensitive'
    //             }
    //         }))
    //     });
    // }

    if (Object.keys(filterFeilds).length > 0) {
        andConditions.push({
            AND: Object.keys(filterFeilds).map((key) => {
                if (key === "categoryId") {
                    return {
                        "categoryId": {
                            id: (filterFeilds as any)[key]
                        }
                    };
                } else {
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

    console.dir(whereConditions);
    const allBooks = await prisma.book.findMany({
        where: {
            category: {
                title: 'fff'
            }
        },
        include: { category: true }
    })
    const meta = {
        "page": 3,
        "size": 10,
        "total": prisma.book.count,
        "totalPage": 7
    }
    return allBooks
}

const updateBook = async (payload: Partial<Book>, id: string) => {
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


