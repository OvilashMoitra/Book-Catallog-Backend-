import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { ApiError } from "../../../errors/ApiError";
import { IJWTPayload } from "../../../interfaces/common";
import { IOrderCreatePayload } from "./order.interface";

const createOrder = async (userInfo: IJWTPayload, payload: IOrderCreatePayload) => {
    const orderTransaction = await prisma.$transaction(async (tx) => {
        const orderData = {
            userId: userInfo.id,
        }
        const order = await tx.order.create({
            data: orderData
        })
        let bookToOrderPromises;
        bookToOrderPromises = payload.orderedBooks.map(async (book) => {
            const isExist = await tx.book.findUnique({
                where: {
                    id: book.bookId
                }
            })
            if (isExist) {
                return { orderId: order.id, ...book }
            } else {
                throw new ApiError(StatusCodes.NOT_FOUND, "Book Not found")
            }
        })
        const bookToOrder = await Promise.all(bookToOrderPromises);
        if (bookToOrder.length > 0) {
            await tx.orderedBook.createMany({
                data: bookToOrder,
                skipDuplicates: true
            })
        }

        const orderInfo = await tx.order.findUnique({
            where: {
                id: order.id
            },
            include: {
                orderedBooks: true
            }
        })
        return orderInfo
    })
    return orderTransaction
}
const getAllOrder = async (userInfo: IJWTPayload) => {
    if (userInfo.role === Role.admin) {
        return await prisma.order.findMany({})
    } else {
        return await prisma.order.findUnique({
            where: {
                id: userInfo.id
            }
        })
    }

}

const getOrderById = async (payload: string, userInfo: IJWTPayload) => {
    if (userInfo.id !== payload) {
        throw new ApiError(StatusCodes.FORBIDDEN, "You do not have permission to see this")
    }
    const order = await prisma.order.findMany({
        where: {
            userId: payload
        },
        include: {
            orderedBooks: true
        }
    })
    return order
}


export const CategoryService = {
    createOrder,
    getAllOrder,
    getOrderById
}


