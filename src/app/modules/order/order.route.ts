import { Role } from "@prisma/client";
import express from "express";
import { authorization } from "../../middlewares/authorization";
import validateRequest from "../../middlewares/validateRequest";
import { OrderController } from "./order.controller";
import { orderZodSchema } from "./order.validation";


export const OrderRouter = express.Router();

OrderRouter.post('/create-order', validateRequest(orderZodSchema.orderCreate), authorization(Role.customer), OrderController.createOrder)
OrderRouter.get('/', authorization(Role.admin, Role.customer), OrderController.getAllOrder)
OrderRouter.get('/:orderId', authorization(Role.admin, Role.customer), OrderController.getOrderById)
