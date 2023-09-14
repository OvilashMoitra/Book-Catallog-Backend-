import { Response } from "express";

export const sendResponse = <T>(res: Response, message: string, data: T) => {
    res.status(200).json({
        "success": true,
        "statusCode": 200,
        message,
        data: data
    })
}