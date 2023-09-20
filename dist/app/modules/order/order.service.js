"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = require("../../../errors/ApiError");
const createOrder = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payload from order body', payload);
    console.log({ userInfo });
    const orderTransaction = yield app_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const orderData = {
            userId: userInfo.id,
        };
        const order = yield tx.order.create({
            data: orderData
        });
        console.log({ order });
        let bookToOrderPromises;
        bookToOrderPromises = payload.orderedBooks.map((book) => __awaiter(void 0, void 0, void 0, function* () {
            const isExist = yield tx.book.findUnique({
                where: {
                    id: book.bookId
                }
            });
            if (isExist) {
                return Object.assign({ orderId: order.id }, book);
            }
            else {
                throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Book Not found");
            }
        }));
        const bookToOrder = yield Promise.all(bookToOrderPromises);
        console.log({ bookToOrder });
        if (bookToOrder.length > 0) {
            yield tx.orderedBook.createMany({
                data: bookToOrder,
                skipDuplicates: true
            });
        }
        const orderInfo = yield tx.order.findUnique({
            where: {
                id: order.id
            },
            include: {
                orderedBooks: true
            }
        });
        return orderInfo;
    }));
    return orderTransaction;
});
const getAllOrder = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    if (userInfo.role === client_1.Role.admin) {
        return yield app_1.prisma.order.findMany({
            include: {
                orderedBooks: true
            }
        });
    }
    else {
        return yield app_1.prisma.order.findMany({
            where: {
                id: userInfo.id
            },
            include: {
                orderedBooks: true
            }
        });
    }
});
const getOrderById = (payload, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield app_1.prisma.order.findUnique({
        where: {
            id: payload
        },
        include: {
            orderedBooks: true
        }
    });
    if ((order === null || order === void 0 ? void 0 : order.userId) !== userInfo.id && userInfo.role !== client_1.Role.admin) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.FORBIDDEN, "You do not have permission to see this");
    }
    return order;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
    getOrderById
};
