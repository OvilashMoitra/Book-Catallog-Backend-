import { Role } from "@prisma/client";
import { z } from "zod";

const userCreation = z.object({
    name: z.string({
        required_error: 'Name is required'
    }),
    email: z.string({
        required_error: "Email is required"
    }).email(),
    role: z.enum([Role.admin, Role.customer], {
        required_error: "Role is required"
    }),
    password: z.string({
        required_error: "Password is required"
    }),
    contactNo: z.string({
        required_error: "Contact no is required"
    }),
    address: z.string({
        required_error: "Address is required"
    }),
    profileImg: z.string({
        required_error: "Profile image is required"
    })
}).strict()

const userUpdate = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional()
}).strict()

const userLogin = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email(),
    password: z.string({
        required_error: "Password is required"
    })
}).strict()

export const userZodSchema = {
    userCreation,
    userUpdate,
    userLogin
}