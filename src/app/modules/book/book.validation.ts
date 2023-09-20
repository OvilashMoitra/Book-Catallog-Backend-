import { z } from "zod";

const createBook = z.object({
    title: z.string({
        required_error: 'Book title is required'
    }),
    author: z.string({
        required_error: 'Book author is required'
    }),
    price: z.number({
        required_error: 'Book price is required'
    }),
    genre: z.string({
        required_error: 'Book genre is required'
    }),
    publicationDate: z.string({
        required_error: 'Book publication date is required'
    }),
    categoryId: z.string({
        required_error: 'Book category is required'
    }).uuid(),
})

const updateBook = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    publicationDate: z.date().optional(),
    categoryId: z.string().uuid().optional(),
})

export const bookZodSchema = {
    createBook,
    updateBook
}