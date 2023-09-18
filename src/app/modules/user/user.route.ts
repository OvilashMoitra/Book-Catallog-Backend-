import express from "express";
import { UserController } from "./user.controller";

export const UserRouter = express.Router();

UserRouter.post('/login', UserController.userLogin)
UserRouter.post('/signup', UserController.userSignup)
UserRouter.delete('/:id', UserController.deletedUser)
UserRouter.get('/:id', UserController.getSingleUser)
UserRouter.get('/', UserController.getAllUser)
UserRouter.patch('/:id', UserController.updateUser)