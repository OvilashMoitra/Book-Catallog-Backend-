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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = require("../../../errors/ApiError");
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const sendResponse_1 = require("../../../shared/sendResponse");
const user_service_1 = require("./user.service");
const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserService.userSignup(req.body);
        if (!user) {
            throw new ApiError_1.ApiError(404, "Error creating user");
        }
        const modifiedUser = user;
        modifiedUser.password = undefined;
        (0, sendResponse_1.sendResponse)(res, 'Successfully user created', modifiedUser);
    }
    catch (error) {
        next(error);
    }
});
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserService.userLogin(req.body);
        const jwtPayload = { email: user.email, id: user.id, role: user.role };
        const accessToken = yield jwtHelper_1.JWTHelper.generateJWTToken(jwtPayload, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        res.status(200).json({
            "success": true,
            "statusCode": 200,
            "message": "User signin successfully!",
            "token": accessToken
        });
    }
    catch (error) {
        next(error);
    }
});
const deletedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedUser = yield user_service_1.UserService.deleteUser(id);
        (0, sendResponse_1.sendResponse)(res, 'User deleted', deletedUser);
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_service_1.UserService.getSingleUser(id);
        if (!user) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed getting user");
        }
        const modifiedUser = user;
        modifiedUser.password = undefined;
        (0, sendResponse_1.sendResponse)(res, 'User retrieved successfully', modifiedUser);
    }
    catch (error) {
        next(error);
    }
});
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req === null || req === void 0 ? void 0 : req.user;
        const user = yield user_service_1.UserService.getUserProfile(userInfo);
        if (!user) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed getting user");
        }
        const modifiedUser = user;
        modifiedUser.password = undefined;
        (0, sendResponse_1.sendResponse)(res, 'User retrieved successfully', modifiedUser);
    }
    catch (error) {
        next(error);
    }
});
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.UserService.getAllUser();
        if (!users) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed getting users");
        }
        let modifiedUser = users.filter(user => user.id === user.id);
        modifiedUser.forEach((user) => user.password = undefined);
        (0, sendResponse_1.sendResponse)(res, 'User retrieved successfully', modifiedUser);
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_service_1.UserService.updateUser(req.body, req.params.id);
        if (!updatedUser) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed updating user");
        }
        const modifiedUser = updatedUser;
        modifiedUser.password = undefined;
        (0, sendResponse_1.sendResponse)(res, 'User updated successfully', modifiedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    userSignup,
    deletedUser,
    getSingleUser,
    getAllUser,
    updateUser,
    userLogin,
    getUserProfile
};
