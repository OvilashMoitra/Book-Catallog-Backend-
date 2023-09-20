import { z } from "zod";

const category = z.object({
    title: z.string({
        required_error: 'Title is required'
    })
})

export const categoryZodSchema = {
    category
}