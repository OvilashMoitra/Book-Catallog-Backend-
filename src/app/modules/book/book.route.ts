import express from "express";
import { BookController } from "./book.controller";

export const BookRouter = express.Router();

// BookRouter.post('/signup', UserController.userSignup)
// BookRouter.delete('/:id', UserController.deletedUser)
// BookRouter.get('/:id', UserController.getSingleUser)
BookRouter.get('/', BookController.getAllBook)
// BookRouter.patch('/:id', UserController.updateUser)