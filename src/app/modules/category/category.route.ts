import { Role } from "@prisma/client";
import express from "express";
import { authorization } from "../../middlewares/authorization";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryController } from "./category.controller";
import { categoryZodSchema } from "./category.validation";


export const CategoryRouter = express.Router();

CategoryRouter.post('/create-category', validateRequest(categoryZodSchema.category), authorization(Role.admin), CategoryController.createCategory)
CategoryRouter.delete('/:id', authorization(Role.admin), CategoryController.deleteCategory)
CategoryRouter.get('/:id', CategoryController.getSingleCategory)
CategoryRouter.get('/', CategoryController.getAllCategory)
CategoryRouter.patch('/:id', validateRequest(categoryZodSchema.category), authorization(Role.admin), CategoryController.updateCategory)