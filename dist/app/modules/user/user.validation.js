"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const userCreation = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required'
    }),
    email: zod_1.z.string({
        required_error: "Email is required"
    }).email(),
    role: zod_1.z.enum([client_1.Role.admin, client_1.Role.customer], {
        required_error: "Role is required"
    }),
    password: zod_1.z.string({
        required_error: "Password is required"
    }),
    contactNo: zod_1.z.string({
        required_error: "Contact no is required"
    }),
    address: zod_1.z.string({
        required_error: "Address is required"
    }),
    profileImg: zod_1.z.string({
        required_error: "Profile image is required"
    })
}).strict();
const userUpdate = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().optional(),
    contactNo: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    profileImg: zod_1.z.string().optional()
}).strict();
const userLogin = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required"
    }).email(),
    password: zod_1.z.string({
        required_error: "Password is required"
    })
}).strict();
exports.userZodSchema = {
    userCreation,
    userUpdate,
    userLogin
};
