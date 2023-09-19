import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { ApiError } from "../../../errors/ApiError"
import { IJWTPayload } from "../../../interfaces/common"
import { sendResponse } from "../../../shared/sendResponse"
import { OrderService } from "./order.service"

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo: IJWTPayload = req?.user?.data
        const order = await OrderService.createOrder(userInfo, req.body)
        if (!order) {
            throw new ApiError(404, "Error initialing order")
        }
        sendResponse(res, 'Successfully order created', order)

    } catch (error) {
        next(error)
    }
}
const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo: IJWTPayload = req?.user?.data
        const allOrder = await OrderService.getAllOrder(userInfo)
        if (!allOrder) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Error getting the orders")
        }
        sendResponse(res, 'Successfully retrieved the orders', allOrder)

    } catch (error) {
        next(error)
    }
}

const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req?.params?.orderId
        const userInfo: IJWTPayload = req?.user?.data
        const orderById = await OrderService.getOrderById(userId, userInfo)
        if (!orderById) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Error getting the orders")
        }
        sendResponse(res, 'Successfully retrieved the orders', orderById)
    } catch (error) {
        next(error)
    }
}



export const OrderController = {
    createOrder,
    getAllOrder,
    getOrderById
}