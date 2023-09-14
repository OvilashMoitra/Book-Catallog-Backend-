import { User } from "@prisma/client";
import { prisma } from "../../../app";
import { hashPassword } from "../../../helpers/passwordHashing";

const userSignup = async (payload: User) => {
    payload.password = await hashPassword(payload.password)
    const user = await prisma.user.create(
        {
            data: payload
        }
    )
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

export const UserService = {
    userSignup,
    getSingleUser,
    deleteUser,
    getAllUser
}