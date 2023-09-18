import { Role } from "@prisma/client";
import express from "express";
import { authorization } from "../../middlewares/authorization";
import { UserController } from "./user.controller";

export const UserRouter = express.Router();

UserRouter.post('/login', UserController.userLogin)
UserRouter.post('/signup', UserController.userSignup)
UserRouter.delete('/:id', authorization(Role.admin), UserController.deletedUser)
UserRouter.get('/:id', UserController.getSingleUser)
UserRouter.get('/', UserController.getAllUser)
UserRouter.patch('/:id', UserController.updateUser)