import { Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../app";
import { ApiError } from "../../../errors/ApiError";
import { IJWTPayload } from "../../../interfaces/common";
import { IOrderCreatePayload } from "./order.interface";

const createOrder = async (userInfo: IJWTPayload, payload: IOrderCreatePayload) => {
    console.log('payload from order body', payload);
    console.log({ userInfo });
    const orderTransaction = await prisma.$transaction(async (tx) => {
        const orderData = {
            userId: userInfo.id,
        }
        const order = await tx.order.create({
            data: orderData
        })
        console.log({ order });
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
        console.log({ bookToOrder });
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
        return await prisma.order.findMany({
            include: {
                orderedBooks: true
            }
        })
    } else {
        return await prisma.order.findMany({
            where: {
                id: userInfo.id
            },
            include: {
                orderedBooks: true
            }
        })
    }

}

const getOrderById = async (payload: string, userInfo: IJWTPayload) => {

    const order = await prisma.order.findUnique({
        where: {
            id: payload
        },
        include: {
            orderedBooks: true
        }
    })
    if (order?.userId !== userInfo.id && userInfo.role !== Role.admin) {
        throw new ApiError(StatusCodes.FORBIDDEN, "You do not have permission to see this")
    }
    return order
}


export const OrderService = {
    createOrder,
    getAllOrder,
    getOrderById
}


