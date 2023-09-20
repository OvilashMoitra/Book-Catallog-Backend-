"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_route_1 = require("../modules/book/book.route");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/order/order.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: user_route_1.UserRouter
    },
    {
        path: '/categories',
        routes: category_route_1.CategoryRouter
    },
    {
        path: '/books',
        routes: book_route_1.BookRouter
    },
    {
        path: '/orders',
        routes: order_route_1.OrderRouter
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
