import { z } from "zod";

const orderCreate = z.object({
    orderedBooks: z.array(
        z.object({
            bookId: z.string({
                required_error: "Book id is required"
            }).uuid(),
            quantity: z.number({
                required_error: "Book Quantity is required"
            }).min(1)
        }).strict()
    )
}).strict()

export const orderZodSchema = {
    orderCreate
}