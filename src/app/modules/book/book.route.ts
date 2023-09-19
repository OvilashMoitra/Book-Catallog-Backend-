import { Role } from "@prisma/client";
import express from "express";
import { authorization } from "../../middlewares/authorization";
import { BookController } from "./book.controller";

export const BookRouter = express.Router();

BookRouter.post('/create-book', authorization(Role.admin), BookController.createBook)
BookRouter.delete('/:id', authorization(Role.admin), BookController.deleteBook)
BookRouter.get('/:id', BookController.getSingleBook)
BookRouter.get('/', BookController.getAllBook)
BookRouter.patch('/:id', authorization(Role.admin), BookController.updateBook)
BookRouter.patch('/:categoryId/category', authorization(Role.admin), BookController.updateBook)