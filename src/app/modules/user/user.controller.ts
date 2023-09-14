import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { UserService } from './user.service';
const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.userSignup(req.body)
        if (!user) {
            throw new ApiError(404, "Error creating user")
        }
        const modifiedUser: Partial<User> = user
        modifiedUser.password = undefined
        sendResponse(res, 'Successfully user created', modifiedUser)

    } catch (error) {
        next(error)
    }
}

const deletedUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const deletedUser = await UserService.deleteUser(id)
        sendResponse(res, 'User deleted', deletedUser)
    } catch (error) {
        next(error)
    }
}

const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const user = await UserService.getSingleUser(id)
        if (!user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed getting user")
        }
        const modifiedUser: Partial<User> = user
        modifiedUser.password = undefined
        sendResponse(res, 'User retrieved successfully', modifiedUser)
    } catch (error) {
        next(error)
    }
}

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getAllUser()
        if (!users) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed getting users")
        }
        let modifiedUser: Partial<User>[] = users.filter(user => user.id === user.id)
        modifiedUser.forEach((user) => user.password = undefined);
        sendResponse(res, 'User retrieved successfully', modifiedUser)
    } catch (error) {
        next(error)
    }
}



export const UserController = {
    userSignup,
    deletedUser,
    getSingleUser,
    getAllUser
}