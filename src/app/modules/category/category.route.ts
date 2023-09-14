import express from "express";
import { CategoryController } from "./category.controller";


export const CategoryRouter = express.Router();

CategoryRouter.post('/create-category', CategoryController.createCategory)
CategoryRouter.delete('/:id', CategoryController.deleteCategory)
CategoryRouter.get('/:id', CategoryController.getSingleCategory)
CategoryRouter.get('/', CategoryController.getAllCategory)
CategoryRouter.patch('/:id', CategoryController.updateCategory)