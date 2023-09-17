import { Book } from "@prisma/client";
import { prisma } from "../../../app";

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

const getAllBook = async (searchFilter: Record<string, any>, pagination: Record<string, any>) => {

    // const {"searchTerm",...filter}=searchFilter


    const getAllBook = await prisma.book.findMany({
        where: {},
        include: { category: true },
        skip: 3,
        take: 4,

    })
    const meta = {
        "page": 3,
        "size": 10,
        "total": prisma.book.count,
        "totalPage": 7
    }
    return getAllBook
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
    createBook
}


