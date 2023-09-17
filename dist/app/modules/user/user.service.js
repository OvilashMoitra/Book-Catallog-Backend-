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
exports.UserService = void 0;
const app_1 = require("../../../app");
const passwordHashing_1 = require("../../../helpers/passwordHashing");
const userSignup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield (0, passwordHashing_1.hashPassword)(payload.password);
    const user = yield app_1.prisma.user.create({
        data: payload
    });
    return user;
});
const getSingleUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_1.prisma.user.findUnique({
        where: {
            id: payload
        }
    });
    return user;
});
const deleteUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield app_1.prisma.user.delete({
        where: {
            id: payload
        }
    });
    return deletedUser;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield app_1.prisma.user.findMany();
    return allUser;
});
const updateUser = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield app_1.prisma.user.update({
        where: {
            id: id
        },
        data: payload
    });
    return updatedUser;
});
exports.UserService = {
    userSignup,
    getSingleUser,
    deleteUser,
    getAllUser,
    updateUser
};
