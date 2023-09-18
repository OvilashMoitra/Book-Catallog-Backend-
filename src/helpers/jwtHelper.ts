import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../errors/ApiError';
import { IJWTPayload } from '../interfaces/common';

const generateJWTToken = async (payload: IJWTPayload, secret: string, expiresIn: string) => {
    try {
        return await jwt.sign({
            data: payload
        }, secret, { expiresIn: expiresIn });
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error encoding JWT Token")
    }
}

const decodeJWTToken = async (token: string, secretKey: string): Promise<JwtPayload | string> => {
    try {
        return await jwt.verify(token, secretKey);
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Error decoding JWT Token")
    }
}

export const JWTHelper = {
    generateJWTToken,
    decodeJWTToken
}