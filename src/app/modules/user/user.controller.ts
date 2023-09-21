import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { ApiError } from '../../../errors/ApiError';
import { JWTHelper } from '../../../helpers/jwtHelper';
import { IJWTPayload } from '../../../interfaces/common';
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
const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.userLogin(req.body)
        const jwtPayload: IJWTPayload = { email: user.email, id: user.id, role: user.role }
        const accessToken = await JWTHelper.generateJWTToken(jwtPayload, config.jwt.secret!, config.jwt.expires_in!)

        res.status(200).json({
            "success": true,
            "statusCode": 200,
            "message": "User signin successfully!",
            "token": accessToken
        })
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
const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo: IJWTPayload = req?.user as IJWTPayload
        const user = await UserService.getUserProfile(userInfo)
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
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedUser = await UserService.updateUser(req.body, req.params.id)
        if (!updatedUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Failed updating user")
        }
        const modifiedUser: Partial<User> = updatedUser
        modifiedUser.password = undefined
        sendResponse(res, 'User updated successfully', modifiedUser)
    } catch (error) {
        next(error)
    }
}



export const UserController = {
    userSignup,
    deletedUser,
    getSingleUser,
    getAllUser,
    updateUser,
    userLogin,
    getUserProfile
}