import express from "express";
import { BookController } from "./book.controller";

export const BookRouter = express.Router();

BookRouter.post('/create-book', BookController.createBook)
BookRouter.delete('/:id', BookController.deleteBook)
BookRouter.get('/:id', BookController.getSingleBook)
BookRouter.get('/', BookController.getAllBook)
BookRouter.patch('/:id', BookController.updateBook)
BookRouter.patch('/:categoryId/category', BookController.updateBook)