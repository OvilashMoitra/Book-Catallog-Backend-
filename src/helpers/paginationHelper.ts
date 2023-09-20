import { IPaginationOptions } from "../interfaces/pagination";

export const paginationHelper = (payload: IPaginationOptions) => {
    const skipPage = Number(payload.page) - 1
    const skipTotal = skipPage * Number(payload.page)
    return {
        take: Number(payload.limit),
        skip: skipTotal,
    }
}