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