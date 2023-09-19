import { Role } from "@prisma/client";
import express from "express";
import { authorization } from "../../middlewares/authorization";
import { OrderController } from "./order.controller";


export const OrderRouter = express.Router();

OrderRouter.post('/create-order', authorization(Role.customer), OrderController.createOrder)
OrderRouter.get('/', authorization(Role.admin, Role.customer), OrderController.getAllOrder)
OrderRouter.get('/:orderId', authorization(Role.admin, Role.customer), OrderController.getOrderById)
