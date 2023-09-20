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
exports.authorization = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = require("../../errors/ApiError");
const jwtHelper_1 = require("../../helpers/jwtHelper");
const authorization = (...roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized");
        }
        const jwtData = yield jwtHelper_1.JWTHelper.decodeJWTToken(token, config_1.default.jwt.secret);
        if (!jwtData) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.FORBIDDEN, "You have no access");
        }
        if (!roles.includes((_a = jwtData === null || jwtData === void 0 ? void 0 : jwtData.data) === null || _a === void 0 ? void 0 : _a.role)) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.FORBIDDEN, "You have no access");
        }
        req.user = jwtData === null || jwtData === void 0 ? void 0 : jwtData.data;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.authorization = authorization;
