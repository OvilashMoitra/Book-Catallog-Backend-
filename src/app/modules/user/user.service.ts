import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { ApiError } from "../../../errors/ApiError";
import { hashPassword, matchPassword } from "../../../helpers/passwordHashing";
import { IJWTPayload } from "../../../interfaces/common";
import { IUserCredential } from "./user.interface";

const userSignup = async (payload: User) => {
    payload.password = await hashPassword(payload.password)
    const user = await prisma.user.create(
        {
            data: payload
        }
    )
    return user
}
const userLogin = async (payload: IUserCredential) => {

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        },
        select: {
            email: true,
            id: true,
            role: true,
            password: true
        }
    })
    if (!user) {
        throw new ApiError(StatusCodes.FORBIDDEN, "User not found")
    }
    let isMatched;
    isMatched = await matchPassword(payload.password, user.password)
    if (isMatched === false) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Password does not match")
    }

    return user
}

const getSingleUser = async (payload: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: payload
        }
    })
    return user
}
const getUserProfile = async (payload: IJWTPayload) => {
    const user = await prisma.user.findUnique({
        where: {
            id: payload.id
        }
    })
    return user
}

const deleteUser = async (payload: string) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: payload
        }
    })

    return deletedUser
}

const getAllUser = async () => {
    const allUser = await prisma.user.findMany()
    return allUser
}

const updateUser = async (payload: Partial<User>, id: string): Promise<Partial<User>> => {
    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: payload
    })
    return updatedUser
}

export const UserService = {
    userSignup,
    getSingleUser,
    deleteUser,
    getAllUser,
    updateUser,
    userLogin,
    getUserProfile
}