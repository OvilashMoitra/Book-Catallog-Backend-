import { Role } from "@prisma/client";
import express from "express";
import { authorization } from "../../middlewares/authorization";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { userZodSchema } from "./user.validation";

export const UserRouter = express.Router();
export const AuthRouter = express.Router()
export const ProfileRouter = express.Router()

AuthRouter.post('/signin', validateRequest(userZodSchema.userLogin), UserController.userLogin)
AuthRouter.post('/signup', validateRequest(userZodSchema.userCreation), UserController.userSignup)
UserRouter.delete('/:id', authorization(Role.admin), UserController.deletedUser)
UserRouter.get('/:id', authorization(Role.admin), UserController.getSingleUser)
ProfileRouter.get('/', authorization(Role.admin, Role.customer), UserController.getUserProfile)
UserRouter.get('/', authorization(Role.admin), UserController.getAllUser)
UserRouter.patch('/:id', validateRequest(userZodSchema.userUpdate), authorization(Role.admin), UserController.updateUser)