import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { ApiError } from "../../errors/ApiError";
import { JWTHelper } from '../../helpers/jwtHelper';

export const authorization = (...roles: Role[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            throw new ApiError(StatusCodes.FORBIDDEN, "You are not authorized")
        }
        const jwtData: JwtPayload = await JWTHelper.decodeJWTToken(token, config.jwt.secret!) as JwtPayload
        if (!jwtData) {
            throw new ApiError(StatusCodes.FORBIDDEN, "You have no access")
        }
        if (!roles.includes(jwtData?.data?.role)) {
            throw new ApiError(StatusCodes.FORBIDDEN, "You have no access")
        }
        req.user = jwtData?.data
        next()
    } catch (error) {
        next(error)
    }
}