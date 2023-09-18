import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { ApiError } from '../errors/ApiError';
export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, Number(config.bycrypt_salt_rounds));
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error salting password')
    }
}
export const matchPassword = async (givenPassword: string, password: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(givenPassword, password);
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error matching password')
    }
}