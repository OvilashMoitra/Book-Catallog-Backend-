import { Role } from "@prisma/client";
import express from "express";
import { authorization } from "../../middlewares/authorization";
import { CategoryController } from "./category.controller";


export const CategoryRouter = express.Router();

CategoryRouter.post('/create-category', authorization(Role.admin), CategoryController.createCategory)
CategoryRouter.delete('/:id', authorization(Role.admin), CategoryController.deleteCategory)
CategoryRouter.get('/:id', CategoryController.getSingleCategory)
CategoryRouter.get('/', CategoryController.getAllCategory)
CategoryRouter.patch('/:id', authorization(Role.admin), CategoryController.updateCategory)