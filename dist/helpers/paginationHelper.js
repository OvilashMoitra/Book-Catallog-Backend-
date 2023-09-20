"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (payload) => {
    const skipPage = Number(payload.page) - 1;
    const skipTotal = skipPage * Number(payload.page);
    return {
        take: Number(payload.limit),
        skip: skipTotal,
    };
};
exports.paginationHelper = paginationHelper;
